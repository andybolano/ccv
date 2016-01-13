app.service('loginService', function($http){
      this.autenticarUsuario = function (object){
          u = "../public";
          var req = $http.post(u + '/api/usuario/autenticar',object);
	  return req;
        }
    });


