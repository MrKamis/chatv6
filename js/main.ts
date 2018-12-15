(() => {
    angular.module('chat', ['ngRoute'])
        .controller('nav', ($scope: any, $rootScope: any, $route: any) => {
            $scope.goPage = page => {
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
            $rootScope.$on('changePage', (event, data) => {
                $scope.page = data;
            });

            $scope.user = {
                loged: false,
                nickName: '',
                password: '',
                login: () => {
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
                        .then(r => {
                            console.log(r.data)
                    });
                },
                guest: () => {

                }
            };

        });
})();