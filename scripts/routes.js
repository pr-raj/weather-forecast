// ROUTES

weatherApp.config(function ($routeProvider,$locationProvider) {
	$routeProvider
		.when("/home", {
			templateUrl: "pages/home.htm",
			controller: "homeController",
		})
		.when("/forecast", {
			templateUrl: "pages/forecast.htm",
			controller: "forecastController",
		})
		.when("/forecast/:days", {
			templateUrl: "pages/forecast.htm",
			controller: "forecastController",
		})
		.when("/login", {
			templateUrl: "pages/login.htm",
			controller: "loginController",
		})
		.otherwise({
			redirectTo : "/login"
		});

	// $locationProvider.html5Mode(true);
});
