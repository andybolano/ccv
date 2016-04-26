app.controller('indexController', function($scope,empleadoService,$http) {
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
    $scope.responsableProceso = false;   

cargarCargos_init();
        getAllSubprocesos();
        getAllprocesos();
        getAlldocumentos();
        
        
 function getAllSubprocesos() {
            $http.get('http://localhost/sgc/public/api/subprocesos').success(function(respuesta) {
                localStorage.setItem("subprocesos", JSON.stringify(respuesta));
            });
        }

        function getAllprocesos() {
            $http.get('http://localhost/sgc/public/api/procesos').success(function(respuesta) {
                localStorage.setItem("procesos", JSON.stringify(respuesta));
            });
        }

        function getAlldocumentos() {
            $http.get('http://localhost/sgc/public/api/documentos').success(function(respuesta) {
                localStorage.setItem("documentos", JSON.stringify(respuesta));
            });
        }

        function cargarCargos_init() {
            $http.get('http://localhost/camaradecomercio/public/api/cargos').success(function(respuesta) {
                localStorage.setItem("cargos", JSON.stringify(respuesta));
            });
        }
        
        
$scope.usuarioAdmin = function (){
   var usuario = JSON.parse(sessionStorage.getItem('sessionAdmin'));
   $scope.usuario = usuario[0];
}

$scope.usuario = function (){
   var usuario = JSON.parse(sessionStorage.getItem('session'));
   $scope.usuario = usuario[0];
   $scope.Jefe = sessionStorage.getItem('jefe');
 
   puntajeTotal();
   $scope.getMisProcesos();

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
$scope.getMisProcesos = function(){
     var procesos = JSON.parse(localStorage.getItem("procesos"));
  var subprocesos = JSON.parse(localStorage.getItem("procesos"));
  var usuario = JSON.parse(sessionStorage.getItem('session'));

   for (i = 0; i < procesos.length; i++) {
          if (usuario[0].idCargo == procesos[i].responsable.id){
                $scope.responsableProceso = true;  
             }
      }
      
      for (i = 0; i < subprocesos.length; i++) {
      
          if (usuario[0].idCargo == subprocesos[i].responsable.id){
                 $scope.responsableProceso = true;         
             }
             
      }
      
 
      
}


});


