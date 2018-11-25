(function () {
    // declaramos variables
    var monto, anio, interes, areaMsjes, cuota;
    //asignamos area mensajes en variable
    areaMsjes = document.getElementById("mensajes");
    areaMsjes.style.display="none;"

    // Al hacer click, ejecuta una funcion donde hara las validaciones
    document.getElementById("calcular").addEventListener("click", function(){
        // borrar area msjes
        areaMsjes.innerHTML = "";
        areaMsjes.style.display="none;"
        // obtiene valores desde inputs y los guarda en variables
        monto = document.getElementById("monto");
        interes =  document.getElementById("interes");
        anios = document.getElementById("anios");

        // validaciones
        // valido monto
        if(monto.value ===""){
            areaMsjes.innerHTML = "Debe ingresar el monto";
            areaMsjes.style.display="block;"
            monto.focus();
        }else{
            if( Number.isInteger(parseInt(monto.value))){
                if(interes.value ===""){
                    areaMsjes.innerHTML = "Debe ingresar el interes";
                    areaMsjes.style.display="block;"
                    interes.focus();
                }else{
                    if(anios.value ===""){
                        areaMsjes.innerHTML = "Debe ingresar los años";
                        areaMsjes.style.display="block;"
                        anios.focus();
                    }else{
                        
                        monto = parseInt(monto.value);
                        interes = parseFloat(interes.value);
                        interes = interes/100;
                        anios = parseInt(anios.value);
                        cuota = getCuota(monto, interes, anios);

                        var tabla = document.getElementById("tablaResultados");
                        tabla.style.display="block";
                        
                        var prevCapital = monto;
                        var prevTotAmort = 0;

                        for (let index = 1; index <= anios+1; index++) {
                            var row = tabla.insertRow(index);
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);
                            var cell3 = row.insertCell(2);
                            var cell4 = row.insertCell(3);
                            var cell5 = row.insertCell(4);
                            var cell6 = row.insertCell(5);
                            cell1.innerHTML = index -1;

                            if(index === 1){
                                cell6.innerHTML = monto;
                            }else{
                                
                                var cuotaInteres = interes * prevCapital;
                                var cuotaAmortizacion = cuota - cuotaInteres;
                                var totalAmortizado = cuotaAmortizacion + prevTotAmort;
                                var capital = prevCapital - cuotaAmortizacion;
                                prevCapital = capital;
                                prevTotAmort = totalAmortizado;


                                cell2.innerHTML = Math.ceil(cuota);
                                cell3.innerHTML = parseFloat(cuotaInteres).toFixed(0);
                                cell4.innerHTML = parseFloat(cuotaAmortizacion).toFixed(0);
                                cell5.innerHTML = parseFloat(totalAmortizado).toFixed(0);
                                cell6.innerHTML = parseFloat(capital).toFixed(0);

                            }
                        }
                    }
                }
            }else{
                areaMsjes.innerHTML = "Debe ingresar un monto númerico";
                areaMsjes.style.display="block;"
                monto.focus();
            }
        }
    });

})();

function getCuota(prestamo, interes, anios){
    var calculo1 =  prestamo * interes;
    var calculo2 = Math.pow((1+interes), -anios);
    var calculo3 = 1-(calculo2);
    return calculo1 / calculo3;
}

/* Queda:
 - Agregar totales
 - eliminar filas de tabla cuando da click a btn consultar
 */
