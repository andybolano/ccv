app.controller('indicadoresController', ['$scope', '$http', function($scope, $http) {
        $scope.misProcesos = [];
        $scope.numProcesos = 0;

        $scope.misSubProcesos = [];
        $scope.numSubProcesos = 0;
        $scope.Proceso = {};
        $scope.Subproceso = {};
        $scope.Indicadores = [];
        $scope.Indicador = [];
        $scope.Meses = [];
        $scope.getMisProcesos = function() {

            var procesos = JSON.parse(localStorage.getItem("procesos"));
            var subprocesos = JSON.parse(localStorage.getItem("subprocesos"));
            var usuario = JSON.parse(sessionStorage.getItem('session'));

            for (i = 0; i < procesos.length; i++) {
                if (usuario[0].idCargo == procesos[i].responsable.id) {
                    $scope.misProcesos.push(procesos[i]);

                }
                $scope.numProcesos = $scope.misProcesos.length;
            }

            for (x = 0; x < subprocesos.length; x++) {
                if (subprocesos[x].responsable != null) {
                    if (usuario[0].idCargo == subprocesos[x].responsable.id) {
                        $scope.misSubProcesos.push(subprocesos[x]);
                    }
                }
            }
            $scope.numSubProcesos = $scope.misSubProcesos.length;
        }

        $scope.modalIndicador = function(proceso) {
            $scope.Indicador = {};
            $('#modalIndicadores').openModal();
            $scope.Proceso = proceso;
            $scope.getIndicadores(proceso.id);
        }

        $scope.getIndicadores = function(proceso) {
            $scope.Indicadores = [];

            $http.get('http://localhost/sgc/public/api/getIndicadores/' + proceso).success(function(respuesta) {
                if (respuesta.length > 0) {
                    for (i = 0; i < respuesta.length; i++) {
                        if (respuesta[i].nombreSubproceso == '-') {
                            $scope.Indicadores.push({i: respuesta[i]});
                        } else {

                        }
                    }

                } else {
                    $scope.Indicadores.estado = false;

                }

            });
        }

        $scope.cargarIndicador = function(indicador) {

            $scope.Meses.splice(0, $scope.Meses.length);
            $scope.Indicador = indicador;
            var meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            var i = 1;
            while (i <= 12) {
                $scope.Meses.push({id: i, mes: meses[i]});
                i += parseInt($scope.Indicador.frecuencia);
            }

        }

        $scope.guardar_resultados = function() {
            $scope.resultados = [];
            var numerador;
            var denominador;
            var resultado;
            for (i = 0; i < $scope.Meses.length; i++) {

                if ($('#numerador_' + $scope.Meses[i].id).val() == "") {
                    numerador = 0;
                } else {
                    numerador = $('#numerador_' + $scope.Meses[i].id).val();
                }

                if ($('#denominador_' + $scope.Meses[i].id).val() == "") {
                    denominador = 0;
                } else {
                    denominador = $('#denominador_' + $scope.Meses[i].id).val();
                }


                if ($('#resultado_' + $scope.Meses[i].id).val() == "") {
                    resultado = 0;
                } else {
                    resultado = $('#resultado_' + $scope.Meses[i].id).val();
                }

                $scope.resultados.push({'id': $scope.Meses[i].id, 'mes': $scope.Meses[i].mes, 'numerador': numerador, 'denominador': denominador, 'resuldado': resultado})
            }

            var object = {
                indicador: $scope.Indicador.id,
                resultados: $scope.resultados,
                anio: $('#anio').val()
            }

            $http.post('http://localhost/sgc/public/api/indicadores/resultados', object).success(function(respuesta) {
                console.log(respuesta);
            });

        }
        $scope.calcular = function(mes) {
            var numerador;
            var denominador;
            var resultado;
            if ($('#numerador_' + mes).val() == "") {
                numerador = 0;
            } else {
                numerador = $('#numerador_' + mes).val();
            }
            if ($('#denominador_' + mes).val() != undefined) {
                if ($('#denominador_' + mes).val() == "") {
                    denominador = 0;
                } else {
                    denominador = $('#denominador_' + mes).val();
                }
                resultado = numerador / denominador;
            } else {
                resultado = numerador;
            }

            $('#resultado_' + mes).val(resultado);
        }

        $scope.modalIndicadorSubproceso = function(subproceso) {
            $scope.Indicador = {};
            $('#modalIndicadoresSubproceso').openModal();
            $scope.Subproceso = subproceso;
            $scope.getIndicadoresSubprocesos(subproceso.id);
        }

        $scope.getIndicadoresSubprocesos = function(subproceso) {
            $scope.Indicadores = [];

            $http.get('http://localhost/sgc/public/api/getIndicadores/subproceso/' + subproceso).success(function(respuesta) {

                if (respuesta.length > 0) {
                    for (i = 0; i < respuesta.length; i++) {
                        $scope.Indicadores.push({i: respuesta[i]});
                    }
                } else {
                    $scope.Indicadores.estado = false;

                }

            });
        }

    }]);


