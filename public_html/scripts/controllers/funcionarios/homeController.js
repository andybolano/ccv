app.controller('homeController', function($scope,empleadoService,permisosService) {
$scope.tamPermisos = 0;
$scope.tamSolicitudes = 0;

$scope.entradas ={};
$scope.retrasos ={};
$scope.nuevasSolicitudes ={};
    loadPermisos();
     var retrasos = new Array();
    function loadPermisos(){
      var item="";
      var list="";
      var horaSalida;
      var horaEntrada;
      var f=new Date();
    retrasoDia();
      var hoy = (f.getFullYear()+"-0"+parseInt(f.getMonth()+1)+"-"+f.getDate());
      var vistoJefe =  "";
      var vistoAutoriza = "";
      $scope.Jefe = "";

  var usuario = JSON.parse(sessionStorage.getItem('session'));
  $scope.Jefe = sessionStorage.getItem('jefe');

     var promisePost = empleadoService.getPermisos(usuario[0].id); 
        promisePost.then(function (pl) {
            
          
              localStorage.setItem("permisos",JSON.stringify(pl.data));
                for(i=0; i<pl.data.length; i++){

                    if( Date.parse(pl.data[i].fechaEntrada) >= Date.parse(hoy) ){
                                if(pl.data[i].vistoAutoriza == 1){
                                  vistoAutoriza = '../images/done.png';
                                }else if(pl.data[i].vistoAutoriza == 0){
                                  vistoAutoriza = '../images/report.png';
                                }else{
                                      vistoAutoriza = '../images/close.png'; 
                                }

                                if(pl.data[i].vistoJefe == 1){
                                    vistoJefe = '../images/done.png';
                                }else if(pl.data[i].vistoJefe == 0){
                                 vistoJefe = '../images/report.png';
                                }else{
                                  vistoJefe= '../images/close.png';
                                }

                                horaSalida = prepararHora(pl.data[i].horaSalida.toString());
                                horaEntrada = prepararHora(pl.data[i].horaEntrada.toString());


                            item = '<br><div class="item" ng-repeat="item in PermisosActivos">'+
                                      '<h2 style="font-size:14px;font-weight:900">'+pl.data[i].nombrePermiso+'</h2>'+
                                      '<p style="font-size:12px;">Desde: '+pl.data[i].fechaSalida+' a las: '+horaSalida+', </br> Hasta: '+pl.data[i].fechaEntrada+' a las: '+horaEntrada+'</p>'+
                           '<div class="chip">'+
                            '<img src="'+vistoAutoriza+'" alt="Contact Person">'+
                            'Autorizacion de Empresa'+
                         ' </div>'+
                      '</br></br>'+
                      '<div class="chip">'+
                            '<img src="'+vistoJefe+'" alt="Contact Person">'+
                            'Autorizacion de Jefe de Area'+
                         ' </div>'+
                                    '</div>';
                         
                          $scope.tamPermisos += 1;
                          list = item+list;
                          
                          

                    }

                }


                   if(list == ""){
                    document.getElementById("permisosActivos").innerHTML = "<center><p style='font-size:11px'>No existen permisos activos</p></center>";
                     }else{
                      document.getElementById("permisosActivos").innerHTML = list;
                    }

                list = "";
                item = "";
                
                if($scope.Jefe =='true'){
                    loadSolicitudes();
                  }

            },
            function (errorPl) {
                console.log('Error Al consultar los datos', errorPl);
            });

}


function loadSolicitudes(){
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
                          $('#solicitudesPermiso').html("<center><p style='font-size:11px'>No existen solicitudes de permisos</p></center>");
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
                    $scope.nuvasSolicitudes =  JSON.parse(localStorage.getItem('solicitudespermisos'));
                    
                    console.log($scope.nuvasSolicitudes);
                     
                  }
                  },
                  function (errorPl) {
                      console.log('Error Al consultar los datos', errorPl);
                  });
}
    function retrasoDia(){
        
      var f=new Date();
      var hoy = (f.getFullYear()+"-0"+parseInt(f.getMonth()+1)+"-"+f.getDate());
         var usuario = JSON.parse(sessionStorage.getItem('session'));
         
      var object = {
          empleado:usuario[0].id,
          fecha:hoy
      };
 
      var promisePost = empleadoService.getRetrasoDia(object); 
        promisePost.then(function (pl) {
           
       if(pl.data == 0){
               
               
            }else{
                horaLlegadaManana = prepararHora(pl.data[0].hora);
               tiempoRetrasoManana= substractTimes(horaLlegadaManana,'08:00');
               $scope.entradas.manana =horaLlegadaManana;
               
               if(pl.data.length > 1){
                horaLlegadaTarde = prepararHora(pl.data[1].hora);
                $scope.entradas.tarde =horaLlegadaTarde;
                tiempoRetrasoTarde= substractTimes(horaLlegadaTarde,'14:00');
                 retrasos.push(tiempoRetrasoTarde);
                }
               retrasos.push(tiempoRetrasoManana);
              
              $scope.retrasos.totalDia = calcularTotalRetrasos(retrasos);
            }
        });
    }

});


