var app = angular.module('app', []);
app.factory('factoryService',function($http) {
	var factoryService = {};
	//$http.defaults.headers.post["Content-Type"] = "application/json";

	factoryService.getPosts = function() {
		 return $http.get("https://jsonplaceholder.typicode.com/posts");
	}
	factoryService.savePost = function(Post) {
		return $http.post("https://jsonplaceholder.typicode.com/posts", Post);
	}
	factoryService.getPost = function(Post) {
		return $http.get("https://jsonplaceholder.typicode.com/posts/"+Post);
	}
	factoryService.updatePost = function(Post) {
		return $http.put("https://jsonplaceholder.typicode.com/posts/"+Post.id, Post);
	}
	factoryService.deletePost = function(Post) {
		return $http.delete("https://jsonplaceholder.typicode.com/posts/"+Post);
	}
	return factoryService;

});


app.controller('postController', function($scope,$http,$q,factoryService) {

	$scope.allPosts=[];
	$scope.srMsg=false;
	$scope.srMsgDanger=false;
	$scope.srBtnSave = true;
	$scope.srBtnClose = false;
    $scope.varShowForm = false;

	factoryService.getPosts().then(function(data) {
		$scope.allPosts = data.data
	});

	$scope.savePost= function(Post) {
		factoryService.savePost(Post).then(function(data) {
			$scope.varShowForm=false;
			$scope.srMsg=true;
			$scope.Post= {};
		});
	}
	$scope.getPost = function(Post) {
		$scope.srMsg=false;
		$scope.srMsgDanger=false;
		$scope.srBtnSave= false;
		$scope.srBtnClose = true;
		factoryService.getPost(Post).then(function(data) {
			$scope.varShowForm = true;
			$scope.Post= data.data;

		});
	}
	$scope.updatePost = function(Post) {
		factoryService.updatePost(Post).then(function(data) {
			$scope.varShowForm=false;
			$scope.srMsg=true;
			$scope.srMsgDanger=false;
			$scope.srBtnSave= true;
			$scope.Post= {};
		});
	}
	$scope.deletePost = function(Post) {
		//console.log("https://jsonplaceholder.typicode.com/posts/"+Post);
		factoryService.deletePost(Post).then(function(data) {
			$scope.srMsgDanger=true;
		});
	}
	$scope.srShowForm = function(param) {
		$scope.srBtnClose = true;
		$scope.srMsg=false;
		$scope.srMsgDanger=false;
        $scope.varShowForm = param;
        $scope.srBtnSave= true;
        $scope.Post= {};
    }

    $scope.srBtnCloseForm = function(param) {
    	$scope.varShowForm = false;
    	$scope.srMsg=false;
    	$scope.srMsgDanger=false;
    	$scope.srBtnClose = param;
    }
});