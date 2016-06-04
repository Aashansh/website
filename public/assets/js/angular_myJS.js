var Forms = angular.module('Forms',[]);

Forms.service('authService', ['$window',function ($window) {
        var service = {
            store: store,
            retrieve: retrieve,
            clear: clear,
            clearAll: clearAll
        };

        return service;


        function store(key, value) {
            $window.sessionStorage.setItem(key, angular.toJson(value, false));
        }

        function retrieve(key) {
            return angular.fromJson($window.sessionStorage.getItem(key));
        }

        function clear(key) {
            $window.sessionStorage.removeItem(key);
        }

        function clearAll() {
            $window.sessionStorage.clear();
        }


    }]);

Forms.controller('Login',['$scope','$window','$http', 'authService',function($scope,$window,$http,authService){
	
	var login_uname="";
	var login_pword="";
	var flag_uname=0;
	var flag_pword=0;
	var error_uname = "";
	var error_pword = "";
    $scope.error_msg = "";
    $scope.link = "";
	$scope.$watch('username', function(val) {
        if (val) {
        	console.log($scope.link);
            login_uname = val;
        }

    });

    $scope.$watch('password',function(val){ 
    	if (val){
    		login_pword = val;
    	}
    	

    });

    $scope.PostMethod = function(){
        $http({
        method: 'POST',
        url: 'http://localhost:3000/users/login',
        data: {
        "username" : login_uname,
        "password" : login_pword
        }
        }).then(function successCallback(response) {
            window.location = "Profile.html";
            authService.store(0,response.data.token);
            authService.store(1,login_uname);
            console.log(response.data.token);
        }, function errorCallback(response) {
            $scope.error_msg = "Login Failed";
            $scope.link = "";
        });    
    }
    

    

}]);

Forms.controller('Signup',['$scope','$window','$http',function($scope,$window,$http){
	
	var signup_uname="";
	var signup_pword="";
	var signup_email="";
	var flag_uname=false;
	var flag_pword=false;;
	var flag_email=false;
    var error = "";
    $scope.flag=0;
	var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

	$scope.link = "signup.html";
	$scope.$watch('username', function(val) {
        if (val) {
        	console.log($scope.link);
            signup_uname = val;
        }

        

    });

    $scope.$watch('password',function(val){ 
    	if (val){
    		signup_pword = val;
    	}
    	

    });

    $scope.$watch('email',function(val){ 
    	if (val){
    		signup_email = val;
    	}

    	

    });

    $scope.validate = function(){
        if (signup_uname.length > 4) {
            if(flag_pword===true && flag_email===true){
                $scope.flag=1;
            }
            $scope.error_uname = "";
            flag_uname = true;
        }else{
            $scope.error_uname = "Username Must be more than 4 characters";
            $scope.flag=0;
            flag_uname = false;
        }

        if (signup_pword.length > 6) {
            if(flag_uname===true && flag_email===true){
                $scope.flag=1;
            }
            $scope.error_pword = "";
            flag_pword = true;
        }else{
            $scope.error_pword = "Password Must be more than 6 characters";
            $scope.flag=0;
            flag_pword = false;
        }

        var isMatchRegex = EMAIL_REGEXP.test(signup_email);
        if (isMatchRegex) {
            if(flag_uname===true && flag_pword===true){
                $scope.flag=1;
            }
            $scope.error_email = "";
            flag_email = true;
        }else{
            $scope.error_email = "Invalid Email";
            $scope.flag=0;
            flag_email = false;
        }

        if($scope.flag===1){
            $scope.uname = signup_uname;
            $scope.pword = signup_pword;
            $scope.email = signup_email;  

          $http({
            method: 'POST',
            url: 'http://localhost:3000/users/register',
            data:{
                "username" : $scope.uname,
                "password" : $scope.pword,
                "email" : $scope.email
            }
            }).then(function successCallback(response) {
                window.location = "login.html"
            }, function errorCallback(response) {
                if(response.data.err.name==="UserExistsError"){
                    $scope.error_uname = response.data.err.message;
                }
            });
        }


    }

    

}]);

Forms.controller('Profiles', [ '$scope','authService','$http','authService', function($scope, authService,$http,authService) {
     $scope.loggedin=false;
    $scope.id = authService.retrieve(0);
    $scope.username = authService.retrieve(1);
    $scope.profilesubmitted = false;
    if($scope.username){
        $scope.loggedin = true;
    }

        $http({
        method: 'GET',
        url: 'http://localhost:3000/profiles'
        }).then(function successCallback(response) {
            console.log(response.data.length);
            for(i=0;i<response.data.length;i++){
                if(response.data[i].name==$scope.username){
                    $scope.profilesubmitted = true;
                    $scope.user = response.data[i];
                }
            }
        }, function errorCallback(response) {
            
        });   

     $http({
        method: 'GET',
        url: 'http://localhost:3000/profiles',
        }).then(function successCallback(response) {
            $scope.profiles = response.data;
        }, function errorCallback(response) {
            
        });
}]);

Forms.controller('profile', [ '$scope','authService','$http', function($scope, authService,$http) {
    $scope.loggedin=false;
    $scope.id = authService.retrieve(0);
    $scope.username = authService.retrieve(1);
    $scope.profilesubmitted = false;
    $scope.imgurl;
    $scope.lookingfor;
    $scope.skills;
    $scope.course;
    if($scope.username){
        $scope.loggedin = true;
    }
    if(window.location.pathname==="/Profile.html" && $scope.loggedin==false){
        window.location="login.html";
    }
    $scope.signout = function(){
        authService.clearAll();
        window.location = window.location;
    }
    $scope.Submit = function(){
        console.log($scope.username);
      $http({
        method: 'POST',
        url: 'http://localhost:3000/profiles',
        headers: {
              'x-access-token': $scope.id
            },
        data:{
          "name" : $scope.username,
          "image" : $scope.imgurl,
          "course": $scope.course,
          "skills":$scope.skills,
          "lookingfor":$scope.lookingfor
        }
        }).then(function successCallback(response) {
            window.location = "Profile.html";
        }, function errorCallback(response) {
            
        });
    }

    $scope.getImg = function(){
        console.log($scope.imgurl);
    }

    $http({
        method: 'GET',
        url: 'http://localhost:3000/profiles'
        }).then(function successCallback(response) {
            console.log(response.data.length);
            for(i=0;i<response.data.length;i++){
                if(response.data[i].name==$scope.username){
                    $scope.profilesubmitted = true;
                    $scope.user = response.data[i];
                }
            }
        }, function errorCallback(response) {
            
        });    
}]);

