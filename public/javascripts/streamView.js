var sessionID = "#{sessionID}";
var userID = "#{userID}";

console.log("Begin RTC Connection")
console.log(sessionID + " " + userID)
var connection = new RTCMultiConnection(sessionID);
connection.bandwidth = {};
connection.openSignalingChannel = openSignalingChannel;
var videoStream = document.getElementById('video-channel');

connection.onstream = function (e) {
	console.log("onstream"+e)
	videoStream.appendChild(e.mediaElement);
};

var seshInfo = {
	userid: userID,
	sessionid: sessionID,
	session: {
		video: true,
		oneway: true
	}
};
if (userID && sessionID) {
	connection.join(seshInfo);
}
function openSignalingChannel(config) {
	config.channel = config.channel || this.channel;
	var websocket = new WebSocket('ws://brocast-signalingserver.herokuapp.com');
	websocket.onopen = function () {
		setTimeout(function(){
			$("video").on("click", function(e){
				var parentOffset = $(this).parent().offset(); 
				var width = $(this).width();
				var height = $(this).height();
				var relX = e.pageX - parentOffset.left;
				var relY = e.pageY - parentOffset.top;
				console.log(relX+" "+relY);
				websocket.push(JSON.stringify({
					data: {x: relX, y: relY, vX: width, vY: height},
					channel: config.channel
				}));
			});
		}, 5000)
			
		
		websocket.push(JSON.stringify({
			open: true,
			channel: config.channel
		}));
		if (config.callback) config.callback(websocket);
	};
	websocket.onerror = function(err) {
		alert(JSON.stringify(err));

		alert('Unable to connect to ws://brocast-signalingserver.herokuapp.com');
	};
	websocket.onmessage = function (event) {
		config.onmessage(JSON.parse(event.data));
	};
	websocket.push = websocket.send;
	websocket.send = function (data) {
		console.log(JSON.stringify(data))
		websocket.push(JSON.stringify({
			data: data,
			channel: config.channel
		}));
	};
}