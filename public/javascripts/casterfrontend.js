
function error() {
  console.log('Unable to connect to ' + webSocketURI);
  if(connection.stats.numberOfConnectedUsers == 0) {
    console.log(connection.stats)
      //chrome.runtime.reload();
  }
}

var connection;

function setupRTCMultiConnection(stream) {
  connection = new RTCMultiConnection();
  
  connection.channel = connection.token();
  
  connection.autoReDialOnFailure = true;

  connection.bandwidth = {
      video: 300 
  };

  connection.session = {
      video: true,
      oneway: true
  };

  connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: false,
      OfferToReceiveVideo: false
  };

  connection.openSignalingChannel = openSignalingChannel;

  connection.dontAttachStream = true;

  connection.attachStreams.push(stream);

  var sessionDescription = connection.open({
      dontTransmit: true
  });

  var hash = Math.random().toString(36).substr(2);
  var domain = 'http://www.caster.link';
  var resultingURL = domain+'/stream/'+hash+'?userid=' + connection.userid + '&sessionid=' + connection.channel;
  $("#smsLink").attr("href", resultingURL)
}

//'wss://wsnodejs.nodejitsu.com:443'
var webSocketURI = 'ws://brocast-signalingserver.herokuapp.com';

function openSignalingChannel(config) {
    config.channel = config.channel || this.channel;
    var websocket = new WebSocket(webSocketURI);
    websocket.onopen = function() {
        websocket.push(JSON.stringify({
            open: true,
            channel: config.channel
        }));
        if (config.callback) config.callback(websocket);
        console.log('WebSocket connection is opened!');
        streaming = true;
    };
    websocket.onerror = function() {
        console.error('Unable to connect to ' + webSocketURI);
        if(connection.stats.numberOfConnectedUsers == 0) {
            chrome.runtime.reload();
        }
    };
    websocket.onmessage = function(event) {
        config.onmessage(JSON.parse(event.data));
        console.log(event);
        
    };
    websocket.push = websocket.send;

    websocket.send = function(data) {
        websocket.push(JSON.stringify({
            data: data,
            channel: config.channel
        }));
    };
    //websocket.close();   
}

var isFirefox = !!navigator.mozGetUserMedia;
var isChrome = !!navigator.webkitGetUserMedia;
function gotStream(stream) {
  console.log("Received local stream");
  console.log(stream);


  var video = document.querySelector('video');
  video.id = 'self';
  video[isFirefox ? 'mozSrcObject' : 'src'] = isFirefox ? stream : window.webkitURL.createObjectURL(stream);
  video.play();
  

  setupRTCMultiConnection(stream);
}

function getUserMediaError() {
  console.log("getUserMedia() failed.");
}

function onAccessApproved(id) {
  if (!id) {
    console.log("Access rejected.");
    return;
  }

  //navigator

  var socket = io();
  var channel = location.href.replace( /\/|:|#|%|\.|\[|\]/g , '');
  var sender = Math.round(Math.random() * 999999999) + 999999999;
}

var socket = io();
var channel = location.href.replace( /\/|:|#|%|\.|\[|\]/g , '');
var sender = Math.round(Math.random() * 999999999) + 999999999;


function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);

}

navigator.getUserMedia = (navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia || 
                            navigator.msGetUserMedia);
   
    if (hasGetUserMedia()) {
           
      if (typeof MediaStreamTrack === 'undefined'){
        alert('This browser does not support MediaStreamTrack.\n\nTry Chrome Canary.');
      } else {
        MediaStreamTrack.getSources(function(sourceInfos) {
          var Audio = [];
          var Video;

          for (var i = 0; i !== sourceInfos.length; ++i) {
            var sourceInfo = sourceInfos[i];
            console.log(sourceInfo)
            if (sourceInfo.kind === 'audio') {
              Audio.push(sourceInfo.id);
            } else if (sourceInfo.kind === 'video') {
              if(sourceInfo.facing == "environment"){
                Video = sourceInfo.id;
              }
            } else {
              alert("Another type of source "+sourceInfo.kind);
            }
            
          }

          var constraints = {
            audio: {
              optional: [{sourceId: Audio[0]}]
            },
            video: {
              optional: [{sourceId: Video}]
            }
          }; 
          navigator.getUserMedia(
            // Constraints
            constraints,

            // Success Callback
            gotStream,

            // Error Callback
            getUserMediaError
          );

        });
      }

      
    } else {
      alert('getUserMedia() is not supported in your browser');
    }