app.service('usuarioService', function($http){

      this.getUsuario = function (id){
          var req = $http.get(uri + '/api/usuario/get/'+id);
	  return req;
        }
        
        this.postUsuario = function (object){
          var req = $http.post(uri + '/api/usuario/post',object);
	  return req;
        }
        
    this.postBuzon = function (object){
          var req = $http.post(uri + '/api/usuario/buzon',object);
	  return req;
        }

                
    });



