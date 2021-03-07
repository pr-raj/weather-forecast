// SERVICES
weatherApp.service("cityService", function () {
	this.city = "London";
});

weatherApp.service("apiService", function ($http) {
	this.apiDataPromise = $http({
		method: "GET",
		url: "data/apiData.json"
	});
});