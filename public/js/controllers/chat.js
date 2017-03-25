(function() {
    var app = angular.module('docbot');

    app.controller('ChatController', ['$scope','$http','$window',function($scope,$http,$window) {
        $scope.state = "launch";

        $(document).click(function() {
          if ($scope.state == "launch") {
            $(".chat-in").focus();
            $('#btn-action').toggleClass("hide");
            $('.logo').css({
              "position": "absolute",
              "top": "2vh",
              "left": "2vh",
              "margin": "0",
              "width": "10%"
            });
            $("#chat-dialog").toggleClass("openDialog");
            $scope.state = "active";
          }
        })
    }]);
}());
