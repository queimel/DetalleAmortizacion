(function () {
    // declaramos variables
    var monto, anio, interes, areaMsjes;
    //asignamos area mensajes en variable
    areaMsjes = document.getElementById("mensajes");

    // Al hacer click, ejecuta una funcion donde hara las validaciones
    document.getElementById("calcular").addEventListener("click", function(){
        // borrar area msjes
        areaMsjes.innerHTML = "";
        // obtiene valores desde inputs y los guarda en variables
        monto = document.getElementById("monto").value;
        interes =  document.getElementById("interes").value;
        anios = document.getElementById("anios").value;

        // validaciones
        // valido monto
        if( Number.isInteger(parseInt(monto))){

            


        }else{
            insertarMsje("El monto debe ser un número");
        }

    });

})();

function getCuota(prestamo, interes, anios){
    var second = (1-(1+interes));
    return (prestamo * interes) / Math.pow(second, -anios);
}

function insertarMsje(mensaje){
    areaMsjes.innerHTML = mensaje;
}