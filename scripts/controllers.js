// CONTROLLERS
weatherApp.controller("loginController", function ($scope, $location) {
	$scope.username = "admin";
	$scope.password = "admin";
		
	$scope.submit = function () {	
		if ($scope.username === "admin" && $scope.password == "admin") {
			$location.path("/home");
		} else {
			alert("Invalid Login!!!");
		}
	}
});

weatherApp.controller("homeController",
	function ($scope, cityService) {
		$scope.city = cityService.city;

		$scope.icon = "10d";

		$scope.$watch("city", function () {
			cityService.city = $scope.city;
		});
	},
);

weatherApp.controller("forecastController", 
	function ($scope, $resource, $routeParams, cityService, apiService) {
		$scope.city = cityService.city;

		$scope.days = $routeParams.days || "2";

		$scope.weatherAPI = $resource(
			"https://api.openweathermap.org/data/2.5/onecall?lat=:lat&lon=:lon&exclude=:exclude&appid=:appid"
		);

		apiService.apiDataPromise.success(function (data) {
			$resource("https://api.openweathermap.org/data/2.5/weather?q=:q&appid=:appid")
			.get({
					q: $scope.city,
					appid: data.appId,
				},
				function (value) {
					$scope.weatherResult = $scope.weatherAPI.get({
						lat: value.coord.lat,
						lon: value.coord.lon,
						exclude: "current,minutely,hourly",
						appid: data.appId,
					});
				}
			);
		});

		$scope.convertToFahrenheit = function (degK) {
			return Math.round(degK - 273.15);
		};

		$scope.convertToDate = function (dt) {
			return new Date(dt * 1000);
		};
	},
);
