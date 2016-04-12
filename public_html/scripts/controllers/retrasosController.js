app.controller('retrasosController', function($scope, retrasosService,horariosService) {


$scope.listaRetrasos = [];
  $scope.Horarios = {};
  var retrasos = new Array();
 /* var fecha = new Date();
  var fechaEnviar =fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + (fecha.getDate()+1);
  */
 
$scope.getHorarios= function (){
      var promiseGet = horariosService.getAll(); 
        promiseGet.then(function (pl) {
            $scope.Horarios = pl.data;
            $scope.getRetrasos();
        },
              function (errorPl) {
                  console.log('falla Cargando las Areas', errorPl);
              });
} 
  
$scope.getRetrasos= function (){
   $scope.listaRetrasos.length=0;
        if($scope.mesConsulta==undefined){
         var f = new Date();
         var data = (f.getMonth() +1); 
          $('#mes').val(data);
          $scope.mesConsulta = data;
     }  
        
         var hora_llegada_man;
         
          var hora_llegada_tar;
        
         var hora_debio_man;
         var hora_debio_tar;
         var retraso_man = "";
         var retraso_tar = "";
         var cedula = "";
         var nombres = "";
  


    for(i=1; i<=108; i++){
       
      var promiseGet = retrasosService.get(i, $('#mes').val()); 
        promiseGet.then(function (pl) {
           
           
       if(pl.data.length>0){    
          for(i=0;i<pl.data.length; i++){
          
                 retraso_man="";
                 retraso_tar="";
                 

             hora_llegada_man = pl.data[i].hora_entrada_jor_man;
          
            hora_llegada_tar = pl.data[i].hora_entrada_jor_tar;
            
           
            if( hora_llegada_man != null){
                   
                      clase1="success"; 
                     if(pl.data[i].horario_em != null){
                        
                         for(y=0; y<=$scope.Horarios.length; y++){
                             if($scope.Horarios[y].id === pl.data[i].horario_em){
                                 
                       
                         hora_llegada_man = prepararHora(pl.data[i].hora_entrada_jor_man);
                     
                         hora_debio_man= prepararHora($scope.Horarios[y].horaRetraso);
                       
                         retraso_man=substractTimes(hora_llegada_man,hora_debio_man);
                
                     
                                 
                                 
                             
                                 if(parseInt(retraso_man) < 0){
                                     retraso_man = "";
                                 
                                 }else{
                                     retrasos.push(retraso_man);
                                 }
                                 break;
                             }
                         }
                         
                     }
               }else{
                
               }
               
                  if(hora_llegada_tar != null){
    
                      clase3="success"; 
                       if(pl.data[i].horario_et != null){
                         for(y=0; y<=$scope.Horarios.length; y++){
                             if($scope.Horarios[y].id === pl.data[i].horario_et){
                                 
                         hora_llegada_tar = prepararHora(pl.data[i].hora_entrada_jor_tar);
                         hora_debio_tar= prepararHora($scope.Horarios[y].horaRetraso);
                         retraso_tar=substractTimes(hora_llegada_tar,hora_debio_tar);

                                 if(parseInt(retraso_tar) < 0){
                                     retraso_tar = "";
                                   
                                 }else{
                                    retrasos.push(retraso_tar);
                                 }
                                 break;
                             }
                         }
                     }
               }else{
                  
               }
              
           
               cedula = pl.data[i].noDocumento;
               nombres = pl.data[i].nombres+" "+pl.data[i].apellidos;
            }
            
            
           
             var TOTAL =calcularTotalRetrasos(retrasos);
             retrasos.length=0;
             $scope.listaRetrasos.push({cedula:cedula,nombres:nombres,total:TOTAL});
              document.getElementById("loading").style.display = "none";
            
         }
    
        },
              function (errorPl) {
                  console.log('falla Cargando listado de Permisos', errorPl);
              });
}
}




});



