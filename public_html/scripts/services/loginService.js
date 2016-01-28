app.service('loginService', function($http){
     u = "../public";
      this.autenticarUsuario = function (object){
         
          var req = $http.post(u + '/api/usuario/autenticar',object);
	  return req;
        }
        
        this.activarCuenta =function(cedula){

			var req = $http.post(u+'/api/usuario/'+cedula+'/activarCuenta');
			return req;
			
		}
                
    });


