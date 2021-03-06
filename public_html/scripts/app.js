var uri = "../../public";
var gl_resultado = {};
var app;
(function(){
    app = angular.module("timeIt", ['ngRoute','ui.keypress']);
    
    app.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider){
            
            
            $routeProvider
                    .when("/home",{
                        templateUrl: 'home.html'
                    })
                    .when("/listadoSolicitudes",{
                        templateUrl: 'permisos/listadoDeSolicitudes.html'
                    })
                    .when("/nuevoPermiso",{
                        templateUrl: 'permisos/nuevoPermiso.html'
                    })
                    
                    .when("/funcionarios",{
                        templateUrl: 'funcionarios.html'
                    })
                     
                    .when("/configuracionHoraria",{
                        templateUrl: 'configuracionHoraria.html'
                    })
                    .when("/reporteESarea",{
                        templateUrl: 'reportes/reporteESarea.html'
                    })
                    .when("/ausencias",{
                        templateUrl: 'reportes/ausencias.html'
                    })
                     .when("/retrasos",{
                        templateUrl: 'reportes/retrasos.html'
                    })
                    .otherwise({
                        redirectTo:"/home"
                    });
                    
            
    }]);

    app.directive('ngEnter', function () {
        return function (scope, elements, attrs) {
            elements.bind('keydown keypress', function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    });
    
    app.filter('ifEmpty', function() {
        return function(input, defaultValue) {
            if (angular.isUndefined(input) || input === null || input === '') {
                return defaultValue;
            }

            return input;
        };
    });
    
    
    
    app.directive('uploaderModel',['$parse',function($parse){
        return{
            restrict: 'A',
            link: function(scope,iElement,iAttrs){
                iElement.on('change',function(e)
                {
                    $parse(iAttrs.uploaderModel).assign(scope,iElement[0].files[0]);
                });
            }
        };

    }]);

   

})();


