app.controller('configuracionController', function($scope,horariosService) {

 $scope.editar = function(item){
     $scope.horario = item;
        $scope.editMode ="Editar Horario";
        $scope.active = "";
        $('#modalHorario').openModal();
    };
    $scope.horario="";
$scope.Horarios = "";    
  loadHorario();  
    function loadHorario(){
        var promiseGet = horariosService.getAll(); 
        promiseGet.then(function (pl) {
            $scope.Horarios = pl.data;
        },
              function (errorPl) {
                  console.log('falla Cargando las Areas', errorPl);
              });
        
    }


});

