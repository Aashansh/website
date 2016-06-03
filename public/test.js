var Controls = angular.module('Controls',[]);

Controls.controller('Login',['$scope','$window','$http',function($scope,$window,$http){

  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiYWRtaW4iOiJpbml0IiwiX192IjoiaW5pdCIsInVzZXJuYW1lIjoiaW5pdCIsImhhc2giOiJpbml0Iiwic2FsdCI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsImFkbWluIjp0cnVlLCJ1c2VybmFtZSI6dHJ1ZSwiaGFzaCI6dHJ1ZSwic2FsdCI6dHJ1ZSwiX2lkIjp0cnVlfSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6e319LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfSwiZW1pdHRlciI6eyJkb21haW4iOm51bGwsIl9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7ImFkbWluIjpmYWxzZSwiX192IjowLCJ1c2VybmFtZSI6IlZhc3UiLCJoYXNoIjoiOTEyNDk5M2I4NGNlMzRjMjg4NjgyYjYyMjIyMzI0MjA4ZGRlYmJkMTljNjcwZmZhN2NlM2QzYzUxMTI2MzdkMGUyYTg5MDI1NTYwODNhM2U1YjIyYWE0MjM5Nzc5OGQwNTI0YTY2NWY4YjZhYzE5M2VlMDYxYjYzZjEzZGY2ZDNmODk4M2MyNDdhMzRkNTVlZDg3YmJmMmNiZGRlN2ZjZjY1YzMzODA4MjU5ZTEzMjlmZmQxNGNiODgwMTIyNTk2N2Y1Njg5ZTE3NTMzMjA2ZTM0M2Q5MWIxYmUwZmM2MDE4NGM5ODg5ZTE0NTgzODFjZmZlMzA5NmU1NzE1NGYzNzRjZGEzNzk5YjhjMDU2ZmRhYTM4YWRhMWM5ODcwOTIyOTQyOTU0ZjljZWU4YWE5MjNhYTE3MTMyYTc2MzI1NWIzZGM4NzkzYWI3YzgyYmYzYzQzMzVlN2I2NzBhN2I5ZTU3M2QyNmZhYjk3YWI0OTdiMDRkOGZjYWQxNzJiNTQwZDliMGM4NGI2ZjhiZWVmOWQ2MWY1NzRiMzhjOTcwODlmZGJjY2Q4ZGFiYTlkOWMwZDg2MGRmYWYxYzM3NDRlZmM2NjBiOWVmMjBmMDYwNWU3OTJiOGNhODEyNDA5NzUyOWJmMmM3MmE3ZDc0ODYwMjkyYTY2YWNlMWNkZWU0ZmQ5Y2EyZWNmOTg2NWQ3ZDc0ZTAzYjcyYjc3YmNiOWRiMWYxZTYwMDA5MmQ2Nzc4YmM1ZDkxNGFhNjg0ZjViZmI4MzhlY2UxODQ5MDU4NDdlMzE5OTU3Nzk0MWQ5MDIyYzZjMWQyOTY1MDA5N2I5YWNmNDJkNzE4MTUzMGRiZDI5MGI2ZTZiMGRkNDM1MzVlOTIyNzlkNjQ4Zjc0ZjRhZTUzZjI4YzdiMGE5NDkwMzY3N2NhYThlOWNkYzNiMWM5NGFlN2M5YWQ4OWZlYzIyNmNkZWY2MzdjMzFmZTc3OGQyMDI3YmJkODAwMzVmYTRkNTFkNGIyZmM4MmNlOGRiOTNhNTM0ZGJmODU5YWViODBjYWExZDVjZjMzZTJjZGRlZjRlZjM3NDk2YjE1ZTJkNmUzNGQ4ZDcwN2Q1MjNmZTlhMjc1Y2YyMjEyN2VlNzAyOWM2MTI1MzUxN2FmOTcwOGY2NDQ1OTVkNzViMmQ1YzZhMzg0MTA1ZDE3NThiNDZmYzdkNGEyMTgyZGI0ODgwNTVmMWY4MzE3N2E4N2UzZWQxZmFhMDk5MTNlMDVjMzI1NzQ3ODYxNTZmOWE1OTliMmZlNDM1MmRlNDk1ZmE3YzU5N2YzNzkwN2JlMmM5MGI0OTMyZDVhYTZmNDFmNTk2YmFkOGUwODI3ZjIwNzdhYzcwZCIsInNhbHQiOiJmODFkMTExOTg5ODE2OTllNjA0ZWNlOTQ2MGVhOGI5MWYyNWEwYWEzODllNTE4YTg1YjFkOWFkYWNiNjQ4ZGViIiwiX2lkIjoiNTc0NmU0MGNmMTAxZTdjZjEyOGU5ZjBhIn0sIl9wcmVzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltudWxsLG51bGwsbnVsbF19LCJfcG9zdHMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W119LCJpYXQiOjE0NjQ5MzMzNTYsImV4cCI6MTQ2NDkzNjk1Nn0.tYNC9Hpi5q7R9kTIFe2C_F7HNGW6fqcOt7nhd7AsEGw";
	if (token) {
  $.ajaxSetup({
    headers: {
      'x-access-token': token
    }
  });
}

  $http({
  	method: 'POST',
  	url: 'http://localhost:3000/profiles',
    // data:{
    //   "name" : "VasuV",
    //   "image" : "/home/vasu/Desktop/yolo.png",
    //   "course": "vasu122@gmail.com",
    //   "skills":"tdrk",
    //   "lookingfor":"tfjkj"
    // }
	}).then(function successCallback(response) {
    	console.log(response);
    // this callback will be called asynchronously
    // when the response is available
  	}, function errorCallback(response) {
  		console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  	});

}]);
