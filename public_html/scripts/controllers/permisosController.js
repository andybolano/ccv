app.controller('permisosController', function($scope, permisosService, empleadoService) {

$scope.identificacion = "";
$scope.imagenFuncionario="http://localhost/camaradecomercio/public_html/images/1.jpg";
$scope.funcionario = [];
$scope.Permisos = {};
$scope.Permiso = {};
$scope.listaPermisos = {};
$scope.motivos=[];

loadMotivos();
loadPermisos();



$scope.actualizarPermiso = function (id){
    
        var object = {
            id:id,
            autoriza:"empresa",
            estado:"1"
        }
        
  var promiseGet = permisosService.update(object); 
        promiseGet.then(function (pl) {
           Materialize.toast(pl.data.message,"rounded","5000");
           loadPermisos();
        },
              function (errorPl) {
                  console.log('falla Cargando Funcionario', errorPl);
              });
}


function loadMotivos(){
     var promiseGet = permisosService.getAll(); 
        promiseGet.then(function (pl) {
           $scope.Permisos=pl.data;
        },
              function (errorPl) {
                  console.log('falla Cargando Permisos', errorPl);
              });
}  
  
function loadPermisos(){
      var promiseGet = permisosService.listadoPermisos(); 
        promiseGet.then(function (pl) {
           $scope.listaPermisos=pl.data;
          
        },
              function (errorPl) {
                  console.log('falla Cargando listado de Permisos', errorPl);
              });
}

$scope.consultarFuncionario = function (){
   var promiseGet = empleadoService.getById($scope.identificacion); 
        promiseGet.then(function (pl) {
           $scope.funcionario=pl.data[0];
            $scope.imagenFuncionario = 'blob.php?id='+pl.data[0].noDocumento+'';
        },
              function (errorPl) {
                  console.log('falla Cargando Funcionario', errorPl);
              });
}

$scope.nuevo= function (){
    var tipoPermiso;
    var remuneracion;
      var minutos;
       var horas;
       var h;
       var m;
       var hora;
    var ctrl = document.frmtipoPermiso.permisos;
    for(i=0;i<ctrl.length;i++){
        if(ctrl[i].checked){
            tipoPermiso = ctrl[i].id;
            break;
            }
        }
        
    var ctrl = document.frmremunerado.remuneracion;
    for(i=0;i<ctrl.length;i++){
        if(ctrl[i].checked){
            remuneracion = ctrl[i].id;
            break;
            }
        }   
           var fecha = new Date($scope.Permiso.fechaInicio);
           var fechaSalida= fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
  
           var fecha = new Date($scope.Permiso.fechaFin);
           var fechaEntrada= fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
  
  
  
           hora  = new Date($scope.Permiso.horaEntrada);
     
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

           var horaEntrada = horas +""+minutos;




            hora  = new Date($scope.Permiso.horaSalida);
     
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
           
          var object = {
            funcionario: $scope.funcionario.id,
            horaSalida:horaSalida,
            horaEntrada:horaEntrada,
            fechaSalida: fechaSalida,
            fechaEntrada:fechaEntrada,
            motivoPermiso:tipoPermiso,
            otroMotivo:$scope.Permiso.otroMotivo,
            remuneracion:remuneracion,
            vistoJefe:$scope.Permiso.vistoJefe,
            vistoAutoriza:$scope.Permiso.vistoAutoriza
        }; 
      
        var promiseGet = permisosService.post(object); 
        promiseGet.then(function (pl) {
           Materialize.toast(pl.data.message, "rounded","5000");
           $scope.Permiso = "";
        },
        function (errorPl) {
            console.log('Error Al registrar datos', errorPl);
        });
     
}

});


