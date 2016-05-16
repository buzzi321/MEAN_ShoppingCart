angular.module('storeApp').controller('loginController',
  ['$scope', '$location', 'AuthService','$rootScope',
  function ($scope, $location, AuthService, $rootScope) {

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)

        // handle success
     .then(function () {
          $scope.profile= $rootScope.profile;
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
          console.log('logged in');
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

}]);



angular.module('storeApp').controller('logoutController',
    ['$scope', '$location', 'AuthService',
        function ($scope, $location, AuthService) {

            $scope.logout = function () {

                // call logout from service
                AuthService.logout()
                    .then(function () {
                        $location.path('/login');
                    });

            };

        }]);

angular.module('storeApp').controller('storeController',['$scope', '$routeParams', 'DataService','$rootScope',
function ($scope, $routeParams, DataService, $rootScope) {

  // get store and cart from service
  $scope.store = DataService.store;
  $scope.cart = DataService.cart;
    $scope.profile=$rootScope.profile;



}])




angular.module('storeApp').controller('registerController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password, $scope.registerForm.profile)
        // handle success
        .then(function () {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);