app.controller('permisosController', function($scope, permisosService) {
    
 loadTipoPermisos();
$scope.tipoPermisos ={};
$scope.permiso = {};


  function loadTipoPermisos(){
  
    var promisePost = permisosService.getAll(); 
        promisePost.then(function (pl) {
             $scope.tipoPermisos=pl.data;
            },
            function (errorPl) {
                console.log('Error Al consultar los datos', errorPl);
            });
  }
  
  $scope.nuevo = function(){

      if($scope.permiso.fechaSalida == undefined || $scope.permiso.fechaRetorno == undefined || $scope.permiso.tipoPermiso == undefined || $scope.permiso.horaSalida == undefined || $scope.permiso.horaRetorno ==  undefined){
          Materialize.toast("Falta campos importantes por digilenciar",3000,'rounded')
      }else{
     
       var minutos;
       var horas;
       var h;
       var m;
           var fecha = new Date($scope.permiso.fechaSalida);
           var fechaSalida= fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
  
           var fecha = new Date($scope.permiso.fechaRetorno);
           var fechaRetorno= fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
  

            hora  = new Date($scope.permiso.horaRetorno);
     
            h = (hora.getHours().toString().length)
            m = (hora.getMinutes().toString().length)

          

           if(h == 1){
              horas = "0"+hora.getHours();
           }else{
            horas = hora.getHours();
           }

           if(m == 1){
              minutos = "0"+hora.getMinutes();
           }else{
            minutos = hora.getMinutes();
           }

           var horaRetorno = horas +""+minutos;

           

            hora  = new Date($scope.permiso.horaSalida);
     
            h = (hora.getHours().toString().length)
            m = (hora.getMinutes().toString().length)

          

           if(h == 1){
              horas = "0"+hora.getHours();
           }else{
            horas = hora.getHours();
           }

           if(m == 1){
              minutos = "0"+hora.getMinutes();
           }else{
            minutos = hora.getMinutes();
           }

           var horaSalida = horas +""+minutos;

         


           var remuneracion = "";

          if($scope.permiso.remuneracion == false){
            remuneracion = "NO";
           }else{
            remuneracion = "SI";
           }
           
           
            var usuario = JSON.parse(sessionStorage.getItem('session'));
    
         var object = {
           
          
            fechaSalida: fechaSalida,
            fechaEntrada:fechaRetorno,
            horaSalida:horaSalida,
            horaEntrada:horaRetorno,
            motivoPermiso:parseInt($scope.permiso.tipoPermiso),
            funcionario: usuario[0].id,
            otroMotivo:$scope.permiso.descripcion,
            remuneracion:remuneracion,
            vistoAutoriza:false,
            vistoJefe:false
          
        }; 

      
  document.getElementById("loading_solicitud").style.display="block";
  document.getElementById("btnEnviarSolicitud").disabled = true; 

  

           var promisePost = permisosService.post(object); 
           promisePost.then(function (pl) {
    

     document.getElementById("loading_solicitud").style.display="none";
      document.getElementById("btnEnviarSolicitud").disabled = false; 


       swal("Solicitud de permiso!", pl.data.message, "success")


            $scope.permiso = "";
            },
            function (errorPl) {
                console.log('Error Al solicitar permisos', errorPl);
            });
    
    }
  }
    
});

