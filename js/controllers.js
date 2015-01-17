angular.module('starter.controllers', [])
  .controller('homeCtrl', function($scope) {
    $scope.$root.settingsPage = false;
    $scope.hideBackButton = true;

  })

  .controller('streamCtrl', function($scope) {
    $scope.streamShare = true;
  })

  .controller('streamViewCtrl', function($scope, $stateParams) {
    var streamId = "id";
  })

  .controller('settingsCtrl', function($scope, $ionicPlatform) {

    $scope.$root.settingsPage = true;

    $scope.$on("$stateChangeStart", function() {
      $scope.$root.settingsPage = false;
    });

    $scope.settings = {
      enableSMS: true
    };
    
  });
