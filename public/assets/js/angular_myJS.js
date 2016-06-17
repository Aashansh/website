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


    $scope.searchkey;
    $scope.searchvalue;
    $scope.search = "";
    $scope.key = "";
    $scope.setsearch = function(){
        $scope.searchkey = $scope.key;
        $scope.searchvalue = $scope.search;
    }

    $scope.searchtrue = function(profile){
        if($scope.searchkey==="name"){
            console.log(profile.name);
            return (profile.name).toLowerCase().startsWith($scope.searchvalue.toLowerCase());
        }
        if($scope.searchkey==="skill"){
            return profile.skills.toLowerCase().startsWith($scope.searchvalue.toLowerCase());
        }
        return true;

    }

    $scope.Profiles = {}
    $scope.admin = false;
        $http({
        method: 'GET',
        url: 'http://localhost:3000/users'
        }).then(function successCallback(response) {
            for(i=0;i<response.data.length;i++){
                if(response.data[i].username==$scope.username && response.data[i].admin==true){
                    $scope.admin = true;
                }
            }
        }, function errorCallback(response) {
            
        });

        $http({
        method: 'GET',
        url: 'http://localhost:3000/courses'
        }).then(function successCallback(response) {
            $scope.courses = response.data;
            for(var i=0;i<$scope.courses.length;i++){
                $scope.courses[i].from = $scope.courses[i].from.split("T")[0];
                $scope.courses[i].to = $scope.courses[i].to.split("T")[0];
                console.log(response.data[i]);
            }

        }, function errorCallback(response) {
            
        }); 

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

        $scope.getcoursebyname = function(id){
            for (var i = $scope.courses.length - 1; i >= 0; i--){
                if($scope.courses[i]._id===id){
                    return $scope.courses[i].name;
                }
            }
        }

}]);

Forms.controller('Users', [ '$scope','authService','$http','authService', function($scope, authService,$http,authService) {
    $scope.loggedin=false;
    $scope.id = authService.retrieve(0);
    $scope.username = authService.retrieve(1);
    $scope.profilesubmitted = false;
    if($scope.username){
        $scope.loggedin = true;
    }

    $scope.coursename;
    $scope.courseimage;
    $scope.category;
    $scope.description;
    $scope.location;

$(function() {

    //for displaying datepicker

    $('#datetimepicker1').datetimepicker({
        viewMode: 'years',
        format: 'DD/MM/YYYY',
    });
    $('#datetimepicker2').datetimepicker({
        viewMode: 'years',
        format: 'DD/MM/YYYY',
    });

    //for getting input value

    $("#datetimepicker1").on("dp.change", function() {

        $scope.From = $("#datetimepicker1").val();

    });
    $("#datetimepicker2").on("dp.change", function() {

        $scope.To = $("#datetimepicker2").val();

    });

 });

    $scope.searchkey;
    $scope.searchvalue;
    $scope.search = "";
    $scope.key = "";
    $scope.setsearch = function(){
        $scope.searchkey = $scope.key;
        $scope.searchvalue = $scope.search;
    }

    $scope.searchtrue = function(course){
        if($scope.searchkey==="name"){
            return course.name.toLowerCase().startsWith($scope.searchvalue.toLowerCase());
        }
        if($scope.searchkey==="category"){
            return course.category.startsWith($scope.searchvalue);
        }
        if($scope.searchkey==="location"){
            return course.location.startsWith($scope.searchvalue);
        }
        return true;

    }
    $scope.RegisterForCourse = function(item){
            console.log("Profile",$scope.profileid);
            $http({
            method: 'PUT',
            url: 'http://localhost:3000/courses/register/' + item,
            headers: {
                  'x-access-token': $scope.id,
                },
            data:{
                "profileId":$scope.profileid,
            }
            }).then(function successCallback(response) {
            }, function errorCallback(response) {
                
            });

            $http({
            method: 'PUT',
            url: 'http://localhost:3000/courses/enroll/' + item,
            headers: {
                  'x-access-token': $scope.id,
                },
            data:{
                "profileId":$scope.profileid,
            }
            }).then(function successCallback(response) {
                window.location = "courses.html";
            }, function errorCallback(response) {
                
            });        
    }

    $scope.LeaveCourse = function(item){
       $http({
            method: 'PUT',
            url: 'http://localhost:3000/courses/leave/' + item,
            headers: {
                  'x-access-token': $scope.id,
                },
            data:{
                "profileId":$scope.profileid,
            }
            }).then(function successCallback(response) {
            }, function errorCallback(response) {
            
        });

        $http({
            method: 'PUT',
            url: 'http://localhost:3000/courses/cancel/' + item,
            headers: {
                  'x-access-token': $scope.id,
                },
            data:{
                "profileId":$scope.profileid,
            }
            }).then(function successCallback(response) {
                window.location = "courses.html";
            }, function errorCallback(response) {
            
        });  

    }
    $scope.AddCourse = function(){
        console.log($scope.From);
        console.log($scope.To);
        var temp = $scope.From.split("/");
        var From = new Date(temp[2],temp[1]-1,temp[0]);
        temp = $scope.To.split("/");
        var To = new Date(temp[2],temp[1]-1,temp[0]); 
        // console.log(From,To);
        $http({
        method: 'POST',
        url: 'http://localhost:3000/courses',
        headers: {
              'x-access-token': $scope.id
            },
        data:{
            "name":$scope.coursename,
            "image":$scope.courseimage,
            "description":$scope.description,
            "category":$scope.category,
            "from":From,
            "to":To,
            "location":$scope.location
        }
        }).then(function successCallback(response) {
            window.location = "courses.html";
        }, function errorCallback(response) {
            
        });
    }

    $scope.signout1 = function(){
        authService.clearAll();
        window.location = window.location;
    }

    

    $scope.admin = false;
        $http({
        method: 'GET',
        url: 'http://localhost:3000/users'
        }).then(function successCallback(response) {
            for(i=0;i<response.data.length;i++){
                if(response.data[i].username==$scope.username && response.data[i].admin==true){
                    $scope.admin = true;
                }
            }
        }, function errorCallback(response) {
            
        });
        $scope.courseidtoenrolledlist = {};
        $http({
        method: 'GET',
        url: 'http://localhost:3000/courses'
        }).then(function successCallback(response) {
            $scope.courses = response.data;
            for(var i=0;i<$scope.courses.length;i++){
                $scope.courses[i].from = $scope.courses[i].from.split("T")[0];
                $scope.courses[i].to = $scope.courses[i].to.split("T")[0];
                console.log(response.data[i]);
            }

        }, function errorCallback(response) {
            
        }); 

        
        $scope.Profile = {};

        $http({
        method: 'GET',
        url: 'http://localhost:3000/profiles'
        }).then(function successCallback(response) {
            $scope.profiles = response.data;
            for (var i = $scope.profiles.length - 1; i >= 0; i--) {
               $scope.Profile[response.data[i]._id] = response.data[i].name
                if($scope.profiles[i].name===$scope.username){
                    $scope.usercourses = $scope.profiles[i].course;
                    $scope.profileid = $scope.profiles[i]._id;
                }
                 
            };
        }, function errorCallback(response) {
            
        }); 

        $http({
        method: 'GET',
        url: 'http://localhost:3000/users'
        }).then(function successCallback(response) {
            $scope.profilefilled = false;
            $scope.users = response.data;
            for(i=0;i<response.data.length;i++){
                if(response.data[i].username==$scope.username){
                    $scope.userid = response.data[i]._id;

                }
                $scope.profilefilled = true;
        }

        }, function errorCallback(response) {
            
        });   

    
    $scope.GetCourseStudents = function(course){
        $scope.studentlist = [];
        for (var i = course.enrolledstudents.length - 1; i >= 0; i--) {
            $scope.studentlist.push($scope.Profile[course.enrolledstudents[i]]);
        };
        console.log($scope.studentlist);
    }
    $scope.registered = function(item){
        if($scope.usercourses.indexOf(item)>-1){
            return true;
        }
        else{
            return false;
        }
    }

    $scope.deleteUser = function(id){
        $http({
        method: 'DELETE',
        url: 'http://localhost:3000/users/' + id,
        headers: {
              'x-access-token': $scope.id
            },
        }).then(function successCallback(response) {
            window.location = "Users.html";
        }, function errorCallback(response) {
            
        });
    }
    $scope.deleteCourse = function(id){
        $http({
        method: 'DELETE',
        url: 'http://localhost:3000/courses/' + id,
        headers: {
              'x-access-token': $scope.id
            },
        }).then(function successCallback(response) {
            window.location = "courses.html";
        }, function errorCallback(response) {
            
        });
    }

    $scope.SetCourseDescription = function(course){
        $scope.CourseHeading = course.name;
        $scope.Description = course.description;
    }

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


    $scope.Profile = {};
    $scope.admin = false;
    $http({
        method: 'GET',
        url: 'http://localhost:3000/users'
        }).then(function successCallback(response) {
            for(i=0;i<response.data.length;i++){
                if(response.data[i].username==$scope.username && response.data[i].admin==true){
                    $scope.admin = true;
                }
            }
        }, function errorCallback(response) {
            
        });
    $scope.course = {};
    $http({
        method: 'GET',
        url: 'http://localhost:3000/courses'
        }).then(function successCallback(response) {
            for(i=0;i<response.data.length;i++){
                $scope.course[response.data[i]._id] = response.data[i].name
            }
        }, function errorCallback(response) {
            
        });
    $http({
        method: 'GET',
        url: 'http://localhost:3000/profiles'
        }).then(function successCallback(response) {
            for(i=0;i<response.data.length;i++){
                $scope.Profile[response.data[i]._id] = response.data[i].name
                if(response.data[i].name==$scope.username){
                    $scope.profilesubmitted = true;
                    $scope.user = response.data[i];
                }
            }
            console.log($scope.user);
            console.log($scope.Profile);
            console.log($scope.course);
        }, function errorCallback(response) {
            
        });  

    $scope.getcoursename = function(id){
        return $scope.course[id];
    }
}]);

