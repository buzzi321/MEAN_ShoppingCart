angular.module('storeApp').factory('AuthService',
    ['$q', '$timeout', '$http', '$cookies',
        function ($q, $timeout, $http, $cookies) {

            // create user variable
            var user = null;
            //var profile = null;

            // return available functions for use in the controllers
            return ({
                isLoggedIn: isLoggedIn,
                getUserStatus: getUserStatus,
                login: login,
                logout: logout,
                register: register
            });

            function isLoggedIn() {
                if (user) {
                    return true;
                } else {
                    return false;
                }
            }

            function getUserStatus() {
                return $http.get('/user/status')
                    // handle success
                    .success(function (data) {
                        if (data.status) {
                            user = true;
                        } else {
                            user = false;
                        }
                    })
                    // handle error
                    .error(function (data) {
                        user = false;
                    });
            }

            function login(username, password) {

                // create a new instance of deferred
                var deferred = $q.defer();


                // send a post request to the server
                $http.post('/user/login',
                    {username: username, password: password})
                    // handle success
                    .success(function (data, status) {
                        if (status === 200 && data.status) {
                            user = true;
                            //profile = data.profile;
                            //$rootScope.profile = data.profile;
                            $cookies.put("profile", data.profile);
                            //$rootScope.username = username;
                            $cookies.put("username", username);
                            deferred.resolve();
                        } else {
                            user = false;
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function (data) {
                        user = false;
                        deferred.reject();
                    });

                // return promise object

                return deferred.promise;


            }


            function logout() {

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a get request to the server
                $http.get('/user/logout')
                    // handle success
                    .success(function (data) {
                        $cookies.remove("username");
                        $cookies.remove("profile");
                        user = false;
                        deferred.resolve();
                    })
                    // handle error
                    .error(function (data) {
                        user = false;
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            }

            function register(username, password, profile) {

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/user/register',
                    {username: username, password: password, profile: profile})
                    // handle success
                    .success(function (data, status) {
                        if (status === 200 && data.status) {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function (data) {
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            }

        }]);