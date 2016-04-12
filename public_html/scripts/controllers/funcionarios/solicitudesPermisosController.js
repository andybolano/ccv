app.controller('solicitudesPermisosController', function($scope, permisosService) {
$scope.SolicitudesPermisos = {};


   $scope.getSolicitudes = function(){
    $scope.listaNew = [];
     var lista = new Array();
                var item="";
                var horaEntrada="";
                var horaSalida="";

var usuario = JSON.parse(sessionStorage.getItem('session'));
var area = usuario[0].idArea;
               var promisePost = permisosService.getSolicitudesByArea(area); 
                  promisePost.then(function (pl) {
                     
                      if(pl.data.length == 0){
                          $('#solicitudesPermiso').html("<center><p style='font-size:11px'>No solicitudes de permisos</p></center>");
                      }else{
                  for(i=0; i<pl.data.length; i++){
                    if(pl.data[i].vistoJefe == 0){
                         $scope.listaNew.push(pl.data[i]);
                          $scope.tamSolicitudes = 1 + $scope.tamSolicitudes;
                    }

                       horaSalida = prepararHora(pl.data[i].horaSalida.toString());
                       horaEntrada = prepararHora(pl.data[i].horaEntrada.toString());

                    item = {"d":pl.data[i],"horaEntrada":horaEntrada,"horaSalida":horaSalida};
                    lista.push(item);
                  }

                  
                     localStorage.setItem("solicitudespermisos",JSON.stringify(lista));
                   $scope.SolicitudesPermisos =  JSON.parse(localStorage.getItem('solicitudespermisos'));
                    
            
                     
                  }
                  },
                  function (errorPl) {
                      console.log('Error Al consultar los datos', errorPl);
                  });
}
   
   
   
   $scope.cambiarEstadoPermiso = function (permiso,estado){
       
        var object = {
          id : permiso,
          estado : estado
        }
        
        var promisePost = permisosService.updateFuncionario(object); 
        promisePost.then(function (pl) {
              $scope.getSolicitudes();
            },
            function (errorPl) {
                console.log('Error Al consultar los datos', errorPl);
            });
   }
  

    
});

