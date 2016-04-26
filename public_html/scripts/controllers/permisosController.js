app.controller('permisosController', function($scope, permisosService, empleadoService) {

$scope.identificacion = "";
$scope.imagenFuncionario="http://localhost/camaradecomercio/public_html/images/1.jpg";
$scope.funcionario = [];
$scope.Permisos = {};
$scope.Permiso = {};
$scope.listaPermisos = [];
$scope.motivos=[];
$scope.permisos = {};
$scope.funcionarioDetails = {};
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
   
  $scope.listaPermisos.length = 0;
      var promiseGet = permisosService.listadoPermisos(); 
        promiseGet.then(function (pl) {
            for(i=0; i<pl.data.length; i++){
                horaLlegada = prepararHora(pl.data[i].horaEntrada);
                horaSalida = prepararHora(pl.data[i].horaSalida);
              
                $scope.listaPermisos.push({"d":pl.data[i],"horaLlegada":horaLlegada,"horaSalida":horaSalida});
            }
      
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
     
            h = (hora.getHours().toString().length);
            m = (hora.getMinutes().toString().length);

          

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

    $scope.verMotivo = function(motivo,id,nombre){
        swal({   
            title: "<small>Motivo del Permiso</small>!",   
            text: '<img src="http://www.appccvalledupar.co/timeit/view/blob.php?id='+id+'" alt="Contact Person" width = "100px" height="100px" style = "border-radius:50%;"><br><br>'+nombre+"<br><br>"+motivo,   
            html: true 
        });
    }
    
    $scope.verHistoria = function(datos,funcionario){
        $scope.funcionarioDetails = datos;
        console.log($scope.funcionarioDetails)
        $('#modalPermisosDetalles').openModal();
        $scope.getPermisos(funcionario);
    }
    
    $scope.getPermisos = function(empleado){
        $scope.numPermisos = 0;
        $scope.Permisos="";
     document.getElementById("loading_2").style.display="block";
        var promiseGet = empleadoService.getPermisos(empleado);
        promiseGet.then(function (pl) { 
        document.getElementById("loading_2").style.display="none";
        $scope.Permisos = pl.data;
        console.log($scope.Permisos);
       $scope.numPermisos = $scope.Permisos.length;
        },
              function (errorPl) {
                  console.log('falla Cargando empleados', errorPl);
                    document.getElementById("loading_2").style.display="none";
              });
    };

});


