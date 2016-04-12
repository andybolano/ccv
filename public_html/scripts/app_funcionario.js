var uri = "../../public";
var gl_resultado = {};
var app;
(function(){
    app = angular.module("timeIt_funcionario", ['ngRoute','ui.keypress']);
    
    app.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider){
            
            
            $routeProvider
            
            
                    .when("/home",{
                        templateUrl: 'home.html'
                    })
                    .when("/gestionCalidad/archivos",{
                        templateUrl: 'gestionCalidad/archivos.html'
                    })
                    .when("/gestionCalidad/proceso",{
                        templateUrl: 'gestionCalidad/proceso.html'
                    })
                     .when("/gestionCalidad/solicitudes",{
                        templateUrl: 'gestionCalidad/solicitudes.html'
                    })
                    .when("/gestionCalidad/manual",{
                        templateUrl: 'gestionCalidad/manualCalidad.html'
                    })
                    .when("/gestionCalidad/manualProceso",{
                        templateUrl: 'gestionCalidad/manualProceso.html'
                    })
                    .when("/gestionCalidad/listadoInterno",{
                        templateUrl: 'gestionCalidad/listadoMaestroInterno.html'
                    })
                    .when("/gestionCalidad/listadoExterno",{
                        templateUrl: 'gestionCalidad/consultarArchivosExternos.html'
                    })
                    .when("/ausencias",{
                        templateUrl: 'ausencia.html'
                    })
                  
                    .when("/permisos",{
                        templateUrl: 'permisos.html'
                    })
                    .when("/gestionCalidad",{
                        templateUrl: 'gestionCalidad.html'
                    })
                    .when("/configuracion",{
                        templateUrl: 'configuracion.html'
                    })
                    .when("/solicitudesPermisos",{
                        templateUrl: 'solicitudesPermisos.html'
                    })
                    
                   
                    .when("/buzon",{
                        templateUrl: 'buzon.html'
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


