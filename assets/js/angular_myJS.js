var Forms = angular.module('Forms',[]);

Forms.controller('Login',['$scope','$window',function($scope,$window){
	
	var login_uname="";
	var login_pword="";
	var flag_uname=0;
	var flag_pword=0;
	var error_uname = "";
	var error_pword = "";

	$scope.link = "login.html";
	$scope.$watch('username', function(val) {
        if (val) {
        	console.log($scope.link);
            login_uname = val;
        }

        if (login_uname.length > 4) {
    		if(flag_pword===1){
    			$scope.link = "index.html";
			}
    		$scope.error_uname = "";
    		flag_uname = 1;
    	}else{
    		$scope.error_uname = "Username Must be more than 4 characters";
    		$scope.link = "login.html";
    		flag_uname = 0;
    	}

    });

    $scope.$watch('password',function(val){ 
    	if (val){
    		login_pword = val;
    	}
    	if (login_pword.length > 6) {
    		if(flag_uname===1){
    			$scope.link = "index.html";
			}
    		$scope.error_pword = "";
    		flag_pword = 1;
    	}else{
    		$scope.error_pword = "Password Must be more than 6 characters";
    		$scope.link = "login.html";
    		flag_pword = 0;
    	}

    });

    

}]);

Forms.controller('Signup',['$scope','$window',function($scope,$window){
	
	var signup_uname="";
	var signup_pword="";
	var signup_email="";
	var flag_uname=false;
	var flag_pword=false;;
	var flag_email=false;
	var error_uname = "";
	var error_pword = "";
	var error_email="";
	var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

	$scope.link = "signup.html";
	$scope.$watch('username', function(val) {
        if (val) {
        	console.log($scope.link);
            signup_uname = val;
        }

        if (signup_uname.length > 4) {
    		if(flag_pword===true && flag_email===true){
    			$scope.link = "login.html";
			}
    		$scope.error_uname = "";
    		flag_uname = true;
    	}else{
    		$scope.error_uname = "Username Must be more than 4 characters";
    		$scope.link = "signup.html";
    		flag_uname = false;
    	}

    });

    $scope.$watch('password',function(val){ 
    	if (val){
    		signup_pword = val;
    	}
    	if (signup_pword.length > 6) {
    		if(flag_uname===true && flag_email===true){
    			$scope.link = "login.html";
			}
    		$scope.error_pword = "";
    		flag_pword = true;
    	}else{
    		$scope.error_pword = "Password Must be more than 6 characters";
    		$scope.link = "signup.html";
    		flag_pword = false;
    	}

    });

    $scope.$watch('email',function(val){ 
    	if (val){
    		signup_email = val;
    	}

    	var isMatchRegex = EMAIL_REGEXP.test(signup_email);
    	if (isMatchRegex) {
    		if(flag_uname===true && flag_pword===true){
    			$scope.link = "login.html";
			}
    		$scope.error_email = "";
    		flag_email = true;
    	}else{
    		$scope.error_email = "Invalid Email";
    		$scope.link = "signup.html";
    		flag_email = false;
    	}

    });

    

}]);