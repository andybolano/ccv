app.controller('activarController', function($scope,loginService) {

$scope.User={}; 

    $scope.activarCuenta = function() {

      if($scope.User.cedula != undefined){
          
          
             document.getElementById("loading_2").style.display="block";
             document.getElementById("btn-activar").disabled=true;
              var promisePost = loginService.activarCuenta($scope.User.cedula); 
              promisePost.then(function (pl) {
                  $scope.User.cedula = "";
                document.getElementById("btn-activar").disabled=false;  
                  
  document.getElementById("loading_2").style.display="none";
               if(pl.data.message == 'OK'){
                $scope.User.cedula = "";
                  var user = JSON.parse(pl.data.request);
              
              swal({   
    title: "BIENVENIDO(A) <small>"+user[0].nombres+"</small>!",   
    text: '<img src="http://www.appccvalledupar.co/timeit/view/blob.php?id='+user[0].noDocumento+'" alt="Contact Person" width = "100px" height="100px" style = "border-radius:50%;"><br><br>Tu usuario ha sido activado. Ahora podras iniciar sesion con tu numero de identificacion en usuario y contraseña ',   
    html: true });

              }else if(pl.data.message == 'KO'){

sweetAlert("Oops...", "Esta identificación no ha sido encontrada, perece que no estas registrado en nuestro sistema o verifica que el numero ingresado es el correcto.", "error");


              }else if(pl.data.message == 'EXISTE'){
                $scope.User.cedula = "";
        var user = JSON.parse(pl.data.request);


swal({   
    title: "HOLA <small>"+user[0].nombres+"</small>!",   
    text: '<img src="http://www.appccvalledupar.co/timeit/view/blob.php?id='+user[0].noDocumento+'" alt="Contact Person" width = "100px" height="100px" style = "border-radius:50%;"><br><br>Su usuario ya se encuentra activo',   
    html: true });
    }
            

            },
            function (errorPl) {
                   document.getElementById("btn-activar").disabled=false;  
              document.getElementById("loading_2").style.display="none";
                console.log('Error Al registrar datos', errorPl);
            });
      }else{
       Materialize.toast("Es necesario ingresar su cedula",3000,'rounded')
      }
    }


});
