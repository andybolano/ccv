app.controller('ESareaController', function($scope,areaService,reportesService,horariosService) {
  $scope.Areas = [];
  $scope.Horarios= [];
  $scope.empleado= "";
  $scope.puntajeTotal= "";
  $scope.title="";
  $scope.nombreJefe="";
  $scope.imagenJefe="";
   $scope.fechaConsulta="";
   $scope.nombreArea="";
  loadAreas();
  loadHorarios();
 /* var fecha = new Date();
  var fechaEnviar =fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + (fecha.getDate()+1);
  */

function loadHorarios(){
      var promiseGet = horariosService.getAll(); 
        promiseGet.then(function (pl) {
            $scope.Horarios = pl.data;
        },
              function (errorPl) {
                  console.log('falla Cargando las Areas', errorPl);
              });
}

 setInputDate("#fechaConsulta");

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


 
   function loadAreas(){
     
       var promiseGet = areaService.getAll(); 
        promiseGet.then(function (pl) {
            $scope.Areas = pl.data;
            
            $scope.Areas.seleccionada = pl.data[0].id;
            $scope.getJefe();
            $scope.getEmpleados();
        },
              function (errorPl) {
                  console.log('falla Cargando las Areas', errorPl);
              });
        
    }
    
    $scope.getJefe = function (){
       
        $scope.imagenJefe="http://localhost/camaradecomercio/public_html/images/1.jpg";
     var promiseGet = areaService.getJefe($scope.Areas.seleccionada); 
        promiseGet.then(function (pl) {

          if(pl.data === "0"){
            $scope.nombreJefe = "No hay jefe asignado"; 
        }else{
                 
                    $scope.nombreJefe =  pl.data[0].nombres+" "+pl.data[0].apellidos;
                    $scope.imagenJefe = 'blob.php?id='+pl.data[0].noDocumento+'';
 
        }
        },
              function (errorPl) {
                  console.log('falla Cargando el Jefe', errorPl);
              });
    };
    
    $scope.getEmpleados = function (){
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
         
         $('#ES').html("");
         var clase="";
        var image="";
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
         document.getElementById("loading").style.display="block";
         $scope.fechaConsulta = $('#fechaConsulta').val();
         
         for(var a=0; a<$scope.Areas.length; a++){
           
             if($scope.Areas[a].id == $scope.Areas.seleccionada){
                 $scope.nombreArea = $scope.Areas[a].nombre;
                 break;
             }
         }
         
        var promiseGet = reportesService.getByArea($scope.Areas.seleccionada, $('#fechaConsulta').val());
        promiseGet.then(function (pl) {
             if(pl.data === "0"){
             Materialize.toast("No existen funcionarios en esta area.", 3000, 'rounded'); 
               document.getElementById("loading").style.display="none";
        }else{
              document.getElementById("loading").style.display="none";
             for(i=0;i<pl.data.length; i++){
           
                 retraso_man="";
                 retraso_tar="";
                 icon_1 = "";
                 icon_2 = "";
                  icon_1_impreso = "";
                 icon_2_impreso = "";
            image = 'blob.php?id='+pl.data[i].noDocumento+'';
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
                     
                         hora_debio_man= prepararHora($scope.Horarios[y].horaInicio);
                       
                         retraso_man=substractTimes(hora_llegada_man,hora_debio_man);
                
                     
                                 
                                 
                                 icon_1 = '<i class="material-icons">timer_off</i>';
                                 icon_1_impreso = "<img src='../images/timer-off.png' width='16px'>";
                                 if(retraso_man < 0){
                                     retraso_man = "";
                                     icon_1 = "";
                                     icon_1_impreso="";
                                 }else{
                                     
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
                         hora_debio_tar= prepararHora($scope.Horarios[y].horaInicio);
                         retraso_tar=substractTimes(hora_llegada_tar,hora_debio_tar);
                
                      
                                 icon_2 = '<i class="material-icons">timer_off</i>';
                                 icon_2_impreso = "<img src='../images/timer-off.png' width='16px'>";
                                 if(retraso_tar <= 0){
                                     retraso_tar = "";
                                     icon_2 = '';
                                     icon_2_impreso="";
                                 }else{
                                    
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
                        "<td><img src='"+image+"' alt='Contact Person' class='profile'></td>"+
                        "<td>"+pl.data[i].noDocumento+"</td>"+
                        "<td>"+pl.data[i].nombres+" "+pl.data[i].apellidos+"</td>"+
                        "<td>"+pl.data[i].cargo+"</td>"+
                        "<td class="+clase1+">"+hora_llegada_man+"<div class='retraso'>"+icon_1+" "+retraso_man+"</div></td>"+
                        "<td class="+clase2+">"+hora_salida_man+"</td>"+
                        "<td class="+clase3+">"+hora_llegada_tar+"<div class='retraso'>"+icon_2+" "+retraso_tar+"</div></td>"+
                        "<td class="+clase4+">"+hora_salida_tar+"</td>"+
                        "<td></td>"+
                        "</tr>";
                
                 item_impreso =  "<tr>"+
                    
                        "<td>"+pl.data[i].noDocumento+"</td>"+
                        "<td>"+pl.data[i].nombres+" "+pl.data[i].apellidos+"</td>"+
                        "<td>"+pl.data[i].cargo+"</td>"+
                        "<td class="+clase1+"  align=center>"+hora_llegada_man+"<div style='display:inline; margin-left:3px;font-weigth:900; color:red;'>"+icon_1_impreso+" "+retraso_man+"</div></td>"+
                        "<td class="+clase2+" align=center>"+hora_salida_man+"</td>"+
                        "<td class="+clase3+"  align=center>"+hora_llegada_tar+"<div style='display:inline; margin-left:3px;font-weigth:900; color:red;'>"+icon_2_impreso+" "+retraso_tar+"</div></td>"+
                        "<td class="+clase4+"  align=center>"+hora_salida_tar+"</td>"+
                        "<td></td>"+
                        "</tr>";
                horaLlegada="";
                retraso="";
                tiempoRetraso="";
                $('#ES').append(item);
                $('#ESimpresa').append(item_impreso);
            }
       
        }

        },
              function (errorPl) {
                  console.log('falla Cargando empleados', errorPl);
              });
    };
    /*$scope.showEmpleandoIndividual = function(empleado){
       $scope.fechaConsulta.value = "";
       $scope.empleado = empleado;  
       $('#modalFuncionarioDetalles').openModal();
       $scope.getEntradaSalida(empleado.id);
       $scope.getTotalPuntaje(empleado.id);
    };
    $scope.getEntradaSalida = function(empleado_id){
        $('#ES').html("");
        var item;
        var tiempoRetraso;
        var totalRetraso=0;
        var horaLlegada;
        var retraso;
        var clase="alertText";
        var promiseGet = empleadoService.getEntradaSalida(empleado_id,$scope.fechaConsulta.value);
        promiseGet.then(function (pl) { 
           
            for(i=0;i<pl.data.length; i++){

                    horaLlegada = $scope.prepararHora(pl.data[i].hora);
                if(pl.data[i].estado == "Entrada mañana"){
                    tiempoRetraso = pl.data[i].hora - 800;
                        if(tiempoRetraso<=0){
                           clase="successText";  
                          retraso = "00:00";      
                        }else{
                            clase="alertText";
                            retraso = $scope.prepararHora(tiempoRetraso.toString());
                        }
                }else if(pl.data[i].estado == "Entrada tarde"){
                    tiempoRetraso = pl.data[i].hora - 1400;
                        if(tiempoRetraso<=0){
                             clase="successText";
                             retraso = "00:00";      
                        }else{
                            clase="alertText";
                            retraso = $scope.prepararHora(tiempoRetraso.toString());
                        }
                }else{
                    clase="successText";
                    retraso = "00:00";
                }
                item =  "<tr>"+
                        "<td>"+pl.data[i].fecha+"</td>"+
                        "<td>"+pl.data[i].estado+"</td>"+
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
    
  */



});

