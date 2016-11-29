var app = angular.module('myTweetsApp', ['ngRoute']); //this is where you are creating your angular module

app.controller('welcomeController', ['$scope', '$rootScope', '$location', //this is the controller for the welcome html and the dependencies of the controller
    function ($scope, $rootScope, $location) {

        $rootScope.name = { //if this is set to $rootScope, the object is accessable anywhere. like a global variable. If it's just $scope, it's only accessible in this controller.
            firstname: '',
            lastname: '',
        };

        $scope.printMyName = function () {
            console.log($rootScope.name);
        };

        $scope.tweet = {
            username: '',
            message: '',
        }
    }]);

app.controller('tweetsController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    console.log('tweets controller working');

    // console.log($rootScope.name);
    //ajax and rest stuff in here for the tweets you can use the same get and post from the last lab. 

    $scope.postTweet = function postData() {
        console.log("postTweet function accessed");
        /*This function should create a post request using jquery. When posted it should:
            1) Add tweets to the 'database'
            2) After posted prepend message to list of messages and clear input box */
        var tweetList = $('#tweets')
        var newTweet = {
            userName: $rootScope.name,
            text: $('#createTweet').val(),
        };
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/api/tweets',
            contentType: 'application/json',
            data: JSON.stringify(newTweet),
        }).then(function (success) {
            tweetList.prepend("<li>" + (newTweet.text) + "</li>");
            // getData();
        })
    }
    $scope.getTweets = function getTweets() {
        console.log("getTweets function accessed")
        /*This function should make a get request from 'database', parse the data and prepend each to the page*/
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/api/tweets',
            contentType: 'application/json',
        }).then(function (success) {
            console.log(success);
            var tweets = $('#tweets')

            for (i = 0; i < success.length; i++) {
                tweets.append("<li>" + (success[i].text) + "</li>");
            }
        })
    }
    $scope.getTweets();
}]);


app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/welcome', { //when we navigate to localhost:3000/#/welcome....
                templateUrl: 'views/welcome.html', //this is what file you're getting'
                controller: 'welcomeController' //this is what it's going to do'
            })

            .when('/tweets', {
                templateUrl: 'views/tweets.html',
                controller: 'tweetsController'
            })
            .otherwise({ //anything else takes me to the welcome page
                redirectTo: '/welcome'
            })


    }])

