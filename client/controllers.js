angular.module('storeApp').controller('loginController',
    ['$scope', '$location', 'AuthService', '$rootScope', '$cookies',
        function ($scope, $location, AuthService, $rootScope, $cookies) {

            $scope.login = function () {

                // initial values
                $scope.error = false;
                $scope.disabled = true;

                // call login from service
                AuthService.login($scope.loginForm.username, $scope.loginForm.password)

                    .then(function () {
                        //$scope.profile= $rootScope.profile;
                        //$cookies.put("username", $scope.loginForm.username);
                        //$cookies.put("profile", $rootScope.profile);

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

angular.module('storeApp').controller('storeController', ['$scope', '$routeParams', 'DataService', '$cookies', 'refreshedDataService', '$http', '$templateCache',
    function ($scope, $routeParams, DataService, $cookies, refreshedDataService, $http, $templateCache) {

        $scope.profile = $cookies.get('profile');
        $scope.username = $cookies.get('username');

        // get store and cart from service
        //$scope.store = DataService.store;
        //$scope.cart = DataService.cart;

        /*$scope.$watch('$routeChangeSuccess', function() {
         //refreshedDataService.getData(true);
         //});*/
        //$scope.storerefresh = refreshedDataService.getData()
        $scope.method = 'GET';
        $scope.url = 'https://api.myjson.com/bins/2h60g';

        $http({method: $scope.method, url: $scope.url, cache: $templateCache})
            .then(function (response) {
                    $scope.status = response.status;
                    $scope.store = response.data;
                },
                function (response) {
                    $scope.data = response.data || "Request failed";
                    $scope.status = response.status;

                });

        var storeandcart = refreshedDataService.getData();
        $scope.cart = storeandcart.myCart;
        //$scope.store = storeandcart.myStore;


    }]);


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