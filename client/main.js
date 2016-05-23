var storeApp = angular.module('storeApp', ['ngRoute', 'ngCookies']);

storeApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/store.html',
            controller: 'storeController',
            access: {restricted: true,
                adminpage:false}


        })
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'loginController',
            access: {restricted: false,
                adminpage:false}

        })
        .when('/logout', {
            controller: 'logoutController',
            access: {restricted: true,
                adminpage:false}
        })
        .when('/register', {
            templateUrl: 'partials/register.html',
            controller: 'registerController',
            access: {restricted: false,
                adminpage:false}

        })
        .when('/adminpage', {
            templateUrl: 'partials/admin.html',
            controller: 'loginController',
            access: {
                restricted: false,
                adminpage: true
            }
        })
        .when('/cart', {
            templateUrl: 'partials/shoppingCart.html',
            controller: 'storeController',
            access: {restricted: true,
                adminpage:false,
                adminpage:false}


        })
        .when('/restrictedpage', {
            templateUrl: 'partials/restrictedpage.html',
            controller: 'loginController',
            access: {restricted: true,
                adminpage:false}


        })
        .otherwise({
            redirectTo: '/'
        });
});

storeApp.run(function ($rootScope, $location, $route, AuthService, $cookies) {
    $rootScope.location = $location
     $rootScope.$on('$routeChangeStart',
        function (event, next, current) {
            AuthService.getUserStatus()
                .then(function () {
                    //var profile = $rootScope.profile;
                    var profile = $cookies.get("profile");
                    if (profile === "Restricted_User" && next.access.adminpage) {
                        $location.path('/restrictedpage');
                        $route.reload();
                    }
                    else if (next.access.restricted && !AuthService.isLoggedIn()) {
                        $location.path('/login');
                        $route.reload();
                    }
                });
        });
});

/*storeApp.run(function ($rootScope) {
 $rootScope.profile = "NA";
 });*/


// create a data service that provides a store and a shopping cart that
// will be shared by all views (instead of creating fresh ones for each view).
storeApp.factory("DataService", function ($cookies) {

    var username = $cookies.get('username');
    // create store
    //var myStore = new store();

    // create shopping cart
    var myCart = new shoppingCart("AngularStore", username);

    // enable PayPal checkout
    // note: the second parameter identifies the merchant; in order to use the
    // shopping cart with PayPal, you have to create a merchant account with
    // PayPal. You can do that here:
    // https://www.paypal.com/webapps/mpp/merchant
    myCart.addCheckoutParameters("PayPal", "buzzi321@gmail.com");

    // enable Google Wallet checkout
    // note: the second parameter identifies the merchant; in order to use the
    // shopping cart with Google Wallet, you have to create a merchant account with
    // Google. You can do that here:
    // https://developers.google.com/commerce/wallet/digital/training/getting-started/merchant-setup
    myCart.addCheckoutParameters("Google", "500640663394527",
        {
            ship_method_name_1: "UPS Next Day Air",
            ship_method_price_1: "20.00",
            ship_method_currency_1: "USD",
            ship_method_name_2: "UPS Ground",
            ship_method_price_2: "15.00",
            ship_method_currency_2: "USD"
        }
    );

    // return data object with store and cart
    return {
        //store: myStore,
        cart: myCart
    };


});


storeApp.factory("refreshedDataService", function ($cookies) {


    function getstoreandcart() {
        var username = $cookies.get('username');
        //var myStore = new store();
        var myCart = new shoppingCart("Store", username);
        //return {myStore:myStore, myCart:myCart}
        return {myCart: myCart}
    }

    return {
        getData: function () {
            var storeandcart = getstoreandcart();
            return storeandcart;
        }


    }

});