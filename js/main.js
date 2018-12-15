"use strict";
(function () {
    angular.module('chat', ['ngRoute'])
        .controller('nav', function ($scope, $rootScope, $route) {
        $scope.goPage = function (page) {
            $rootScope.$broadcast('changePage', page);
            $('.nav-link').removeClass('active');
            $('#' + page).addClass('active');
        };
    })
        .controller('main', function ($scope, $rootScope, $http, $timeout, $window, $location) {
        $scope.page = $location.$$url.slice(1);
        if ($scope.page == '') {
            $scope.page = 'home';
        }
        $rootScope.$on('changePage', function (event, data) {
            $scope.page = data;
        });
        $scope.user = {
            loged: false,
            nickName: '',
            password: '',
            login: function () {
                if ($scope.user.nickName == '') {
                    $('#login').addClass('is-invalid');
                    return $timeout(function () {
                        $('#login').removeClass('is-invalid');
                    }, 2000);
                }
                if ($scope.user.password == '') {
                    $('#password').addClass('is-invalid');
                    return $timeout(function () {
                        $('#password').removeClass('is-invalid');
                    }, 2000);
                }
                $http({
                    method: 'POST',
                    url: 'php/login.php',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param({
                        login: $scope.user.nickName,
                        password: $scope.user.password
                    })
                })
                    .then(function (r) {
                    console.log(r.data);
                });
            },
            guest: function () {
            }
        };
    });
})();
