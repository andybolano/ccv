app.controller('homeController', function($scope,empleadoService) {
$scope.tamPermisos = 0;
$scope.tamSolicitudes = 0;

$scope.Jefe = "";

    loadPermisos();
    
    function loadPermisos(){
      var item="";
      var list="";
      var horaSalida;
      var horaEntrada;
      var f=new Date();
      var hoy = (f.getFullYear()+"-"+f.getMonth()+1+"-"+f.getDate());
      var vistoJefe =  "";
      var vistoAutoriza = "";
      
      
  var usuario = JSON.parse(sessionStorage.getItem('session'));
     var promisePost = empleadoService.getPermisos(usuario[0].id); 
        promisePost.then(function (pl) {
              localStorage.setItem("permisos",JSON.stringify(pl.data));
                for(i=0; i<pl.data.length; i++){
                    if(pl.data[i].fechaEntrada >= hoy ){
                                if(pl.data[i].vistoAutoriza == 1){
                                    vistoAutoriza = '../images/done.png>';
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

            },
            function (errorPl) {
                console.log('Error Al consultar los datos', errorPl);
            });

}

});


