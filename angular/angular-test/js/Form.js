var userInfoModule = angular.module('userInfoModule',[]);
userInfoModule.controller('userInfoCtrl',['$scope',
	function ($scope) {
		$scope.userInfo = {
			email:'1293441598@qq.com',
			password:'111111',
			autoLogin:true
		};
		$scope.getFormdata = function () {
			console.log($scope.userInfo);
		};
		$scope.setFormdata = function () {
			$scope.userInfo = {
				email:'1111111111@qq.com',
				password:'333333',
				autoLogin:false
			};
		};
		
	}
])