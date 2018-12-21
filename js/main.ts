(() => {
    angular.module('chat', ['ngRoute'])
        .controller('nav', ($scope: any, $rootScope: any, $route: any) => {
            $scope.goPage = (page: any) => {
                $rootScope.$broadcast('changePage', page);
                $('.nav-link').removeClass('active');
                $('#' + page).addClass('active');
            };
        })
        .controller('main', ($scope:any, $rootScope: any, $http: any, $timeout: any, $window: any, $location: any) => {
            $scope.page = $location.$$url.slice(1);
            if($scope.page == ''){
                $scope.page = 'home';
            }
            $rootScope.$on('changePage', (event: any, data: any) => {
                $scope.page = data;
            });

            $scope.loginForm = {
                block: false,
                keyPress: (e: any) => {
                    if(e.key == 'Enter'){
                        $scope.user.login();
                    }
                }
            };

            $scope.user = {
                loged: false,
                nickName: '',
                password: '',
                login: () => {
                    $scope.loginForm.block = true;
                    if($scope.user.nickName == ''){
                        $('#login').addClass('is-invalid');
                        return $timeout(() => {
                            $('#login').removeClass('is-invalid');
                        }, 2000);
                    }
                    if($scope.user.password == ''){
                        $('#password').addClass('is-invalid');
                        return $timeout(() => {
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
                        .then((r: any) => {
                            if(r.data == 5){
                                $('#login').addClass('is-invalid');
                                return $timeout(() => {
                                    $('#login').removeClass('is-invalid');
                                }, 2000);
                            }else if(r.data == 10){
                                $('#password').addClass('is-invalid');
                                return $timeout(() => {
                                    $('#password').removeClass('is-invalid');
                                }, 2000);
                            }else{
                                $scope.page = 'home';
                                $scope.user.loged = true;
                            }
                            $scope.loginForm.block = false;
                    });
                },
                guest: () => {
                    $scope.loginForm.block = true;
                    $http({
                        method: 'POST',
                        url: 'php/guest.php',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: $.param({
                            num: Math.random() * 10 + 5
                        })
                    })
                        .then((r: any) => {
                            $scope.user.loged = true;
                            $scope.user.nickName = r.data;
                            $scope.user.guestLogin = true;
                            $scope.loginForm.block = false;
                    });
                },
                guestLogin: false
            };

        });
})();