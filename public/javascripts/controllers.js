angular.module('starter.controllers', [])
  .controller('homeCtrl', function($scope) {
    $scope.$root.settingsPage = false;
    $scope.hideBackButton = true;

  })

