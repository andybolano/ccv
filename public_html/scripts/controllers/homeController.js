app.controller('homeController', function($scope, empleadoService, horariosService, permisosService, ausenciaService) {

$scope.Funcionarios ="";
$scope.top ="";
$scope.noTop ="";
$scope.numFuncionarios;
 $scope.Horarios= [];
 $scope.nuevasSolitidudes ={};
  $scope.nuevasAusencias ={};
 $scope.numNuevasSolicitudes =0;
  $scope.numNuevasAusencias =0;
 $scope.mesConsulta;
loadFuncionarios();
loadHorarios();
nuevasSolicitudes();
nuevasAusencias();
loadTop();
loadNoTop();
var retrasos = new Array();
 /* var fecha = new Date();
  var fechaEnviar =fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + (fecha.getDate()+1);
  */
 
 function loadTop(){
       var promiseGet = empleadoService.getTop(); 
        promiseGet.then(function (pl) {
          
            $scope.top = pl.data;
          
        },
              function (errorPl) {
                   document.getElementById("loading").style.display="none";
                  console.log('falla Cargando los funcionarios', errorPl);
              });
        
    
}
 function loadNoTop(){
       var promiseGet = empleadoService.getNoTop(); 
        promiseGet.then(function (pl) {
          
            $scope.noTop = pl.data;
          
        },
              function (errorPl) {
                   document.getElementById("loading").style.display="none";
                  console.log('falla Cargando los funcionarios', errorPl);
              });
        
    
}


 function nuevasSolicitudes(){
    
        var promiseGet = permisosService.getNuevasSolicitudes(); 
        promiseGet.then(function (pl) {
            $scope.nuevasSolicitudes = pl.data;
            $scope.numNuevasSolicitudes = pl.data.length;
        },
              function (errorPl) {
                  console.log('falla Cargando las Areas', errorPl);
              });
  }
  function nuevasAusencias(){
    
        var promiseGet = ausenciaService.get(); 
        promiseGet.then(function (pl) {
            $scope.nuevasAusencias = pl.data;
            console.log($scope.nuevasAusencias);
            $scope.numNuevasAusencias = pl.data.length;
        },
              function (errorPl) {
                  console.log('falla Cargando las Areas', errorPl);
              });
  }
   
 
function loadHorarios(){
      var promiseGet = horariosService.getAll(); 
        promiseGet.then(function (pl) {
            $scope.Horarios = pl.data;
        },
              function (errorPl) {
                  console.log('falla Cargando las Areas', errorPl);
              });
} 

 function setInputDate(_id){
    var _dat = document.querySelector(_id);
    var hoy = new Date(),
        d = hoy.getDate(),
        m = hoy.getMonth()+1, 
        y = hoy.getFullYear(),
        data;

    if(d < 10){
        d = "0"+d;
    };
    if(m < 10){
        m = "0"+m;
    };

    data = y+"-"+m+"-"+d;
  
    _dat.value = data;
};

function loadFuncionarios(){
       var promiseGet = empleadoService.getAll(); 
        promiseGet.then(function (pl) {
             document.getElementById("loading").style.display="none";
            $scope.Funcionarios = pl.data;
            $scope.numFuncionarios= $scope.Funcionarios.length;
        },
              function (errorPl) {
                   document.getElementById("loading").style.display="none";
                  console.log('falla Cargando los funcionarios', errorPl);
              });
        
    
}

$scope.showEmpleandoIndividual = function(empleado){
       $scope.empleado = empleado;  
       $('#modalFuncionarioDetalles').openModal();
       $scope.getPorMes(empleado.id);
       $scope.getPermisos(empleado.id);
       $scope.getTotalPuntaje(empleado.id);
       setInputDate("#fechaConsulta");
    };
    $scope.getEntradaSalida = function(empleado_id){
    
     document.getElementById("tablaDia").style.display="block";
     document.getElementById("tablaMes").style.display="none";
        $('#ES').html("");
        var item;
        var tiempoRetraso=0;
        var totalRetraso=0;
        var horaLlegada;
        var horaDeberia;
        var retraso;
        var clase="alertText";
        if($('#fechaConsulta').val() == ""){
             var hoy = new Date(),
                d = hoy.getDate(),
                m = hoy.getMonth()+1, 
                y = hoy.getFullYear(),
                data;
        
                    if(d < 10){
                  d = "0"+d;
              };
              if(m < 10){
                  m = "0"+m;
              };

              data = y+"-"+m+"-"+d;
             $('#fechaConsulta').val(data);
        }
    document.getElementById("loading_1").style.display="block";
        var promiseGet = empleadoService.getEntradaSalida(empleado_id,$('#fechaConsulta').val());
        promiseGet.then(function (pl) { 
       document.getElementById("loading_1").style.display="none";
            for(i=0;i<pl.data.length; i++){

                    horaLlegada = prepararHora(pl.data[i].hora);
                    horaDeberia = prepararHora(pl.data[i].horaFinal);
                  
              
                   if(pl.data[i].nombre=="Entrada Jornada Mañana" || pl.data[i].nombre=="Entrada Jornada Tarde"){
                         tiempoRetraso= substractTimes(horaLlegada, horaDeberia);
                    }
                    
                        if(tiempoRetraso<=0){
                           clase="success";  
                          retraso = "<i class='material-icons'>done</i>";      
                        }else{
                            clase="alert";
                            retraso = tiempoRetraso;
                        }
                item =  "<tr>"+
                       
                        "<td>"+pl.data[i].nombre+"</td>"+
                        "<td>"+horaLlegada+"</td>"+
                        "<td><span class="+clase+">"+retraso+"</span></td>"+
                        "<td>"+pl.data[i].puntaje+"</td>"+
                        "</tr>";
                horaLlegada="";
                retraso="";
                tiempoRetraso="";
                $('#ES').append(item);
            
            }
        },
              function (errorPl) {
                    document.getElementById("loading_1").style.display="none";
                  console.log('falla Cargando empleados', errorPl);
              });
    };
  
    

 
 
   $scope.getTotalPuntaje = function(empleado){
       $scope.puntajeTotal="";
        var promiseGet = empleadoService.getTotalPuntaje(empleado);
        promiseGet.then(function (pl) { 
        $scope.puntajeTotal = pl.data[0].total;
        },
              function (errorPl) {
                  console.log('falla Cargando empleados', errorPl);
              });
    };
    
  $scope.getPermisos = function(empleado){
     document.getElementById("loading_2").style.display="block";
        var promiseGet = empleadoService.getPermisos(empleado);
        promiseGet.then(function (pl) {
            
        document.getElementById("loading_2").style.display="none";

        $scope.Permisos = pl.data;
        
        },
              function (errorPl) {
                  console.log('falla Cargando empleados', errorPl);
                    document.getElementById("loading_2").style.display="none";
              });
    };


 $scope.getPorMes = function(empleado_id){
          var hora_llegada_man;
         var hora_salida_man;
          var hora_llegada_tar;
         var hora_salida_tar;
         var hora_debio_man;
         var hora_debio_tar;
         var retraso_man = "";
         var retraso_tar = "";
         
         
         
         var icon_1 = "";
         var icon_2 = "";
         var icon_1_impreso = "";
         var icon_2_impreso = "";
         
         var item="";
         var item_impreso = "";
         
         $('#ESmes').html("");
         var clase="";
        var image="";
        
     
     if($scope.mesConsulta==undefined){
         var f = new Date();
         var data = (f.getMonth() +1); 
          $('#mes').val(data);
          $scope.mesConsulta = data;
     }   
     document.getElementById("loading_1").style.display="block";
     document.getElementById("tablaDia").style.display="none";
     document.getElementById("tablaMes").style.display="block";
        var promiseGet = empleadoService.getEsByMes(empleado_id,$scope.mesConsulta);
        promiseGet.then(function (pl) { 
             document.getElementById("loading_1").style.display="none";
              
            for(i=0;i<pl.data.length; i++){
          
                 retraso_man="";
                 retraso_tar="";
                 icon_1 = "";
                 icon_2 = "";
                 icon_1_impreso = "";
                 icon_2_impreso = "";

             hora_llegada_man = pl.data[i].hora_entrada_jor_man;
             hora_salida_man = pl.data[i].hora_salida_jor_man;
            hora_llegada_tar = pl.data[i].hora_entrada_jor_tar;
             hora_salida_tar = pl.data[i].hora_salida_jor_tar;
           
            if( hora_llegada_man != null){
                   
                      clase1="success"; 
                     if(pl.data[i].horario_em != null){
                        
                         for(y=0; y<=$scope.Horarios.length; y++){
                             if($scope.Horarios[y].id === pl.data[i].horario_em){
                                 
                       
                         hora_llegada_man = prepararHora(pl.data[i].hora_entrada_jor_man);
                     
                         hora_debio_man= prepararHora($scope.Horarios[y].horaRetraso);
                       

                         retraso_man=substractTimes(hora_llegada_man,hora_debio_man);
                
                       
                                 icon_1 = '<i class="material-icons">timer_off</i>';
                                 icon_1_impreso = "<img src='../images/timer-off.png' width='16px'>";
                                 
                                 
                                 if(parseInt(retraso_man) < 0){
                                     retraso_man = "";
                                     icon_1 = "";
                                     icon_1_impreso="";
                                 }else{
                                     
                                     retrasos.push(retraso_man);
                                 }
                                 break;
                             }
                         }
                         
                     }
               }else{
                   hora_llegada_man = "<img src='../images/report.png' width='16px'>";
                   clase1="warning";
               }
               if(hora_salida_man != null){
                    hora_salida_man = prepararHora(hora_salida_man);
                      clase2="success";
                    
               }else{
                   hora_salida_man = "<img src='../images/report.png' width='16px'>";
                   clase2="warning";
               }
                  if(hora_llegada_tar != null){
    
                      clase3="success"; 
                       if(pl.data[i].horario_et != null){
                         for(y=0; y<=$scope.Horarios.length; y++){
                             if($scope.Horarios[y].id === pl.data[i].horario_et){
                                 
                         hora_llegada_tar = prepararHora(pl.data[i].hora_entrada_jor_tar);
                       
                         hora_debio_tar= prepararHora($scope.Horarios[y].horaRetraso);
                         retraso_tar=substractTimes(hora_llegada_tar,hora_debio_tar);
                
                      
                                 icon_2 = '<i class="material-icons">timer_off</i>';
                                 icon_2_impreso = "<img src='../images/timer-off.png' width='16px'>";
                                 if(parseInt(retraso_tar) < 0){
                                     retraso_tar = "";
                                     icon_2 = '';
                                     icon_2_impreso="";
                                 }else{
                                    retrasos.push(retraso_tar);
                                 }
                                 break;
                             }
                         }
                     }
               }else{
                   hora_llegada_tar = "<img src='../images/report.png' width='16px'>";
                   clase3="warning";
               }
               if(hora_salida_tar != null){
                    hora_salida_tar = prepararHora(hora_salida_tar);
                      clase4="success"; 
               }else{
                   hora_salida_tar = "<img src='../images/report.png' width='16px'>";
                   clase4="warning";
               }
                item =  "<tr>"+
                        "<td>"+pl.data[i].fecha+"</td>"+
                        "<td class="+clase1+">"+hora_llegada_man+"<div class='retraso'>"+icon_1+" "+retraso_man+"</div></td>"+
                        "<td class="+clase2+">"+hora_salida_man+"</td>"+
                        "<td class="+clase3+">"+hora_llegada_tar+"<div class='retraso'>"+icon_2+" "+retraso_tar+"</div></td>"+
                        "<td class="+clase4+">"+hora_salida_tar+"</td>"+
                        "</tr>";
                
               item_impreso =  "<tr>"+
                        "<td>"+pl.data[i].fecha+"</td>"+
                        "<td class="+clase1+"  align=center>"+hora_llegada_man+"<div style='display:inline; margin-left:3px;font-weigth:900; color:red;'>"+icon_1_impreso+" "+retraso_man+"</div></td>"+
                        "<td class="+clase2+" align=center>"+hora_salida_man+"</td>"+
                        "<td class="+clase3+"  align=center>"+hora_llegada_tar+"<div style='display:inline; margin-left:3px;font-weigth:900; color:red;'>"+icon_2_impreso+" "+retraso_tar+"</div></td>"+
                        "<td class="+clase4+"  align=center>"+hora_salida_tar+"</td>"+
                        "<td></td>"+
                        "</tr>";
                horaLlegada="";
                retraso="";
                tiempoRetraso="";
                $('#ESmes').append(item);
                $('#ESimpresa').append(item_impreso);
            }
            
               
                 var TOTAL =calcularTotalRetrasos(retrasos);
  
                   item = "<tr>"+
                           "<td colspan='4'  style='text-align:right;'>TOTAL TIEMPO PERDIDO:</td>"+
                         "<td colspan='1'  style='text-align:left;'><h2 style='font-weight: 900;color:red;font-size:20px;margin-top:6px;'>"+TOTAL+"</h2></td>"+
                         "</tr>";
                  $('#ESmes').append(item);
                  $('#ESimpresa').append(item);
                  TOTAL = "";
                  retrasos.length = 0;
        },
              function (errorPl) {
                  console.log('falla Cargando empleados', errorPl);
                   document.getElementById("loading_1").style.display="none";
              });
    };

});







