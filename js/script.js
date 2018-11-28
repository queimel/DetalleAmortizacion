(function () {

    totalColumna1 = 0;
    totalColumna2 = 0;
    totalColumna3 = 0;
    totalColumna4 = 0;
    totalColumna5 = 0;
    total = "Total";

    // declaramos variables
    var monto, anio, interes, areaMsjes, cuota;
    //asignamos area mensajes en variable
    areaMsjes = document.getElementById("mensajes");
    areaMsjes.style.display="none;"

    // Al hacer click, ejecuta una funcion donde hara las validaciones
    document.getElementById("calcular").addEventListener("click", function(){
        limpiar();
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
                                cell6.innerHTML = fNumber.go(monto,"$");
                            }else{
                                
                                var cuotaInteres = interes * prevCapital;
                                var cuotaAmortizacion = cuota - cuotaInteres;
                                var totalAmortizado = cuotaAmortizacion + prevTotAmort;
                                var capital = prevCapital - cuotaAmortizacion;
                                prevCapital = capital;


                                cell2.innerHTML = fNumber.go(Math.ceil(cuota),"$");
                                totalColumna1 = parseFloat(totalColumna1 + cuota);
                                cell3.innerHTML = fNumber.go(parseFloat(cuotaInteres).toFixed(0),"$");
                                totalColumna2 = parseFloat(totalColumna2 + Math.ceil(parseFloat(cuotaInteres).toFixed(0)));
                                cell4.innerHTML = fNumber.go(parseFloat(cuotaAmortizacion).toFixed(0),"$");
                                totalColumna3 = parseFloat(totalColumna3) + parseFloat(cuotaAmortizacion);
                                cell5.innerHTML = fNumber.go(parseFloat(totalAmortizado).toFixed(0),"$");
                                totalColumna4 = parseFloat(totalColumna4 ) +parseFloat(totalAmortizado);
                                cell6.innerHTML = fNumber.go(parseFloat(capital).toFixed(0),"$"); 
                                totalColumna5 = parseFloat(totalColumna5 + parseFloat(capital).toFixed(0));    
                    
                             
                                

                            }
                            
                        }

                    }
                    f = anios+2;
                    var row = tabla.insertRow(f);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);
                    
                    cell1.innerHTML = "<strong>Total</strong>";
                    cell2.innerHTML = "<strong>"+fNumber.go(totalColumna1.toFixed(0),"$") +"</strong>";                
                    cell3.innerHTML = "<strong>"+fNumber.go(totalColumna2.toFixed(0),"$")+"</strong>";
                    cell4.innerHTML = "<strong>"+fNumber.go(totalColumna3.toFixed(0),"$")+"</strong>";
                    
                    totalColumna1 = "";
                    totalColumna2 = "";
                    totalColumna3 = 0;
                    
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
/* Agregar totales */
function SumarColumna(grilla, columna) {
 
    
    
}   
/* eliminar filas de tabla cuando da click a btn consultar */
function limpiar() {

    var tableHeaderRowCount = 1;
    var table = document.getElementById('tablaResultados');
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
}
var fNumber = {
    sepMil: ".", // separador para los miles
    sepDec: ',', // separador para los decimales
    formatear:function (num){
    num +='';
    var splitStr = num.split('.');
    var splitLeft = splitStr[0];
    var splitRight = splitStr.length > 1 ? this.sepDec + splitStr[1] : '';
    var regx = /(\d+)(\d{3})/;
    while (regx.test(splitLeft)) {
    splitLeft = splitLeft.replace(regx, '$1' + this.sepMil + '$2');
    }
    return this.simbol + splitLeft + splitRight;
    },
    go:function(num, simbol){
    this.simbol = simbol ||'';
    return this.formatear(num);
    }
    }
    
