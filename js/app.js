
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

 
$(document).ready(function(){
  var clickHandler = ("ontouchstart" in window ? "touchend" : "click")

  $("#startButton").on(clickHandler, function() {
    //$("#videoCaptureInput").click();
    var tempFacing = $(".cameraSwitch.activated")[0].innerText;

    if (tempFacing == "Front") {
      var cameraFacing = "user";
    } else if (tempFacing == "Back") {
      var cameraFacing  =  "environment";
    } else {
      var cameraFacing = "user";
    }

    /*navigator.getUserMedia = (navigator.getUserMedia ||
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
              if(sourceInfo.facing == cameraFacing){
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
    }*/
  });
  
  if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
   $("#startButton")
   .bind("touchstart", function () {
       console.log("start button")
       $(".start.green").addClass("fake-active");
   })
   .bind("touchend", function() {
       $(".start.green").removeClass("fake-active");
   });

   $(".cameraSwitch")
   .bind("touchstart", function () {
       console.log("start");
       $(".cameraSwitch").removeClass("activated");
       $(this).addClass("preactivated");
   })
   .bind("touchend", function() {
       console.log("end");
       $(this).removeClass("preactivated");
       $(this).addClass("activated");
   });
  } else {
    $(".cameraSwitch").on(clickHandler, function() {
      console.log("adw")
      for (i=0; i<$(".cameraSwitch").length; i++) {
        $(".cameraSwitch").removeClass("activated")
        console.log($(".cameraSwitch")[i])
      }
      $(this).addClass("activated");
    });
  }
});

function startCasting() {
  alert("Caster")
}
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  
  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })
  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});
