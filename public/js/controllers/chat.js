(function() {
    var app = angular.module('docbot');

    app.controller('ChatController', ['$scope','$http','$location',function($scope,$http,$location) {

        var path = $location.path();

        $scope.class = (path == "/") ? "home" : "chat";

        $("#btn-action").click(function() {
          if ($location.path() == "/") {
            $location.path("/chat");
            $scope.$apply();
          }
        });

        $("#navMenu").click(function() {
          $(this).toggleClass("open");
        });

    }]);
}());
