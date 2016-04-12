app.controller('ausenciaController', function($scope,ausenciaService) {


$scope.listaAusencias = {};

  
$scope.getAusencias= function (){
      var promiseGet = ausenciaService.get(); 
        promiseGet.then(function (pl) {
           console.log(pl.data)
           $scope.listaAusencias=pl.data;
          
        },
              function (errorPl) {
                  console.log('falla Cargando listado de Permisos', errorPl);
              });
}




});




