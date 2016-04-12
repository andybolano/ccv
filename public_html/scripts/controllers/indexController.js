app.controller('indexController', function($scope,empleadoService) {
    hoy();
    function hoy() {
        var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
        var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        var f = new Date();
        var hoy = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
        $scope.hoy = hoy;
    }
    
    $scope.usuario = {};
    $scope.puntaje = 0;
$scope.Jefe = "";


$scope.usuarioAdmin = function (){
   var usuario = JSON.parse(sessionStorage.getItem('sessionAdmin'));
   $scope.usuario = usuario[0];
}

$scope.usuario = function (){
   var usuario = JSON.parse(sessionStorage.getItem('session'));
   $scope.usuario = usuario[0];
   $scope.Jefe = sessionStorage.getItem('jefe');
   puntajeTotal();
}
$scope.usuarioAuditor = function (){
   var usuario = JSON.parse(sessionStorage.getItem('session'));
   $scope.usuario = usuario[0];
}
function puntajeTotal(){
    var promisePost = empleadoService.getTotalPuntaje($scope.usuario.id); 
        promisePost.then(function (pl) {
            if(pl.data[0].total == null){
                $scope.puntaje=0;
            }else{
              $scope.puntaje=pl.data[0].total;
          }
            },
            function (errorPl) {
                console.log('Error Al registrar datos', errorPl);
            });
}

});


