(function() {
    var app = angular.module('docbot', ['ngMessages']);

    app.controller('RegisterController', ['$scope','$http','$window', function($scope, $http, $window) {
        $scope.signup = function() {
            console.log('Registering...');
            $http.post('/register',{
                email: $scope.email,
                name: $scope.name,
                password: $scope.password,
            }).then(function(res) {
                if(res.data.success) {
                    $window.location = '#/home';
                } else {
                    $scope.signupError = true;
                    $scope.signupStatus.internalServerError = true;
                }
            });
        }
        $scope.signupStatus = {
            internalServerError: false
        }
    }]);
}());
