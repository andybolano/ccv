app.controller('usuarioController', function($scope,usuarioService) {
    $scope.usuario = {};
    $scope.User= {};
    $scope.cedula = "";
    $scope.init = function(){
         var usuario = JSON.parse(sessionStorage.getItem('session'));
         $scope.cedula = usuario[0].noDocumento;
         var promisePost = usuarioService.getUsuario(usuario[0].id); 
            promisePost.then(function (pl) {
                $scope.User = pl.data;
                $scope.usuario.usuario = $scope.User[0].correo;
                $('#idUser').val(usuario[0].id);
                $('#usuario').val($scope.User[0].correo);
            },
            function (errorPl) {
                console.log('Error Al consultar datos', errorPl);
            });
    };
    
    $scope.actualizar = function(){
      if($scope.usuario.password != undefined){  
        if($scope.usuario.password != $scope.usuario.passwordConfirmada){
            Materialize.toast("Las contraseñadas ingresadas no coinciden",5000,"rounded");
        }else{
            
            var usuario = JSON.parse(sessionStorage.getItem('session'));
            var id = usuario[0].id;
            
            var object = {
                id:id,
                usuario:$scope.usuario.usuario,
                clave:$scope.usuario.password
            }
           
         var promisePost = usuarioService.postUsuario(object); 
            promisePost.then(function (pl) {
              $scope.init();
              swal("Buen trabajo!", "Datos de acceso actualizados con éxito!", "success")
            },
            function (errorPl) {
                console.log('Error Al consultar datos', errorPl);
            });
        }
    }else{
        Materialize.toast("Es necesario que ingrese su contraseña",5000,"rounded");
    }
}
    
    
    $scope.buzon = function(){
        var mensaje = $('#mensaje').val();
        var usuario = JSON.parse(sessionStorage.getItem('session'));
        var id = usuario[0].id;
        
         var object = {
                id:id,
                mensaje:mensaje
            }
            var promisePost = usuarioService.postBuzon(object); 
            promisePost.then(function (pl) {
              swal("Gracias por tu mensaje!", "Pronto lo revisaremos!", "success");
              $('#mensaje').val("");
            },
            function (errorPl) {
                console.log('Error Al consultar datos', errorPl);
            });
    }
 
    
   
});



