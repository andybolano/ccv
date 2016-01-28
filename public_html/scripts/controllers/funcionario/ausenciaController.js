app.controller('ausenciaController', function($scope,ausenciaService) {
$scope.Ausencia = {}
$scope.listadoAusencias = {}

   $scope.guardar = function(){

 
  if($scope.Ausencia.titulo == undefined || $scope.Ausencia.descripcion == undefined){

    
 Materialize.toast("Digilenciar Campos",3000,'rounded');

      }else{
          
         var usuario = JSON.parse(sessionStorage.getItem('session'));

   
        var formData=new FormData();
        formData.append('imagen',$scope.Ausencia.imagen);
        formData.append('titulo', $scope.Ausencia.titulo);
        formData.append('descripcion', $scope.Ausencia.descripcion);
        formData.append('idEmpleado',usuario[0].id);
        
        document.getElementById("guardar").disabled=true;
        var promisePost = ausenciaService.post_web(formData);
        
        promisePost.then(function (d) {
          swal("Ausencia!", d.data.message, "success")
         $scope.Ausencia="";
         $scope.byEmpleado();
         document.getElementById("guardar").disabled=false;
          document.getElementById("image").innerHTML="";

        }, function (err) {
            
            if(err.status == 401){
                alert(err.data.message);
                console.log(err.data.exception);
            }else{
                 Materialize.toast("Error al procesar la solicitud",3000,'rounded');
            }

            console.log(err);
        });
        
    }
   }
   
   $scope.byEmpleado = function (){
          document.getElementById("guardar").disabled=false;
       var usuario = JSON.parse(sessionStorage.getItem('session'));
       
        var promisePost = ausenciaService.getbyEmpleado(usuario[0].id);
         promisePost.then(function (d) {
         if(d.data==0){
             Materialize.toast("No tiene ausencias registradas",3000,"rounded");
         }else{
          $scope.listadoAusencias = d.data;
        }
        }, function (err) {
            
            if(err.status == 401){
                alert(err.data.message);
                console.log(err.data.exception);
            }else{
                 Materialize.toast("Error al procesar la solicitud",3000,'rounded');
            }

            console.log(err);
        });
   }
    
    
});


