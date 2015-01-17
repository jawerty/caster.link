
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}


$(document).ready(function(){
  var clickHandler = ("ontouchstart" in window ? "touchend" : "click")

  $("#startButton").on(clickHandler, function() {
    //$("#videoCaptureInput").click();
    navigator.getUserMedia = (navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia || 
                            navigator.msGetUserMedia);
    if (hasGetUserMedia()) {
      // Request the camera.
      navigator.getUserMedia(
        // Constraints
        {
          video: true
        },

        // Success Callback
        function(localMediaStream) {

        },

        // Error Callback
        function(err) {
          // Log the error to the console.
          console.log('The following error occurred when trying to use getUserMedia: ' + JSON.stringify(err));
        }
      );
    } else {
      alert('getUserMedia() is not supported in your browser');
    }
  });

  if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
   $("#startButton")
   .bind("touchstart", function () {
       $(".start.green").addClass("fake-active");
   })
   .bind("touchend", function() {
       $(".start.green").removeClass("fake-active");
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
  // Each tab has its own nav history stack:

  .state('stream', {
    url: '/stream',
    templateUrl: 'templates/stream.html',
    controller: 'streamCtrl'
  })

  .state('streamId', {
    url: '/stream/:streamId',
    templateUrl: 'templates/streamView.html',
    controller: 'streamViewCtrl'
  })

  .state('settings', {
    url: '/settings',
    templateUrl: 'templates/settings.html',
    controller: 'settingsCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});
