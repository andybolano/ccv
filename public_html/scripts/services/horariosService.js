app.service("horariosService", function ($http) {  
       this.getAll = function (){
           var req = $http.get(uri+'/api/horarios');
           return req;
    }
    
    this.put = function(){
        var req = $http.put(uri+'/api/horarios/');
        return req;
    }

});