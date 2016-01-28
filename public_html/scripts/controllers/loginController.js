app.controller('loginController', function($scope,loginService) {
    
        $scope.Usuario = {};
        
        initialize();
         function initialize()
         {
        $scope.Usuario = {
            user: "",  
            clave: ""                     
        };
    }
    
    
        $scope.iniciarSesion = function() {        
        if ($scope.Usuario.user == "" || $scope.Usuario.clave == "") {
              Materialize.toast("Faltan campos por digilenciar",5000,'rounded');
        } else {
            var object = {
                username: $scope.Usuario.user,
                pass: $scope.Usuario.clave
            };            
            document.getElementById("error").innerHTML = "";
            
            document.getElementById("btn-inicio").disabled=true;
            var promisePost = loginService.autenticarUsuario(object);
            promisePost.then(function(d) {
                document.getElementById("btn-inicio").disabled=false;
                if(d.data.message=="KO"){
     
                    Materialize.toast("Datos incorrectos, verifique su usuario y contraseña.",4000,'rounded');
                }else if(d.data.message=="OK"){
                    Materialize.toast("Usuario auntenticado",4000,'rounded');
                    
                    data =JSON.parse(d.data.request);
                    if(data[0].rol == 'ADMIN'){
                      window.location.href = "view/index.html";
                      sessionStorage.setItem('sessionAdmin',d.data.request);
                  }else{
                      window.location.href = "funcionario/index.html";
                      sessionStorage.setItem('session',d.data.request);
                  }
                      
                }                                               
            }, function(err) {
                if (err.status == 401) {
                    console.log(err.data.exception);
                } else {
                    alert("Error Al procesar Solicitud");
                }
                console.log("Some Error Occured " + JSON.stringify(err));
            });
        }
    };
    

});

