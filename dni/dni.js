//

/*
    El DNI tiene el siguiente formato

    X9999999A  => Extranjeros, puede empezar por X, Y o Z
    99999999A  => Nacionales, determinadas letras

    La estrategia de validacion:

    Comprobar si tiene uno de los dos formatos
    Si es extranjero, sustituir la primera letra por el digito de control y comprobar como si fuera nacional
    Si es nacional comprobar que la letra coincide con la operacion

*/

// Arrays varios
const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
const letrasExt = "XYZ";


// Obtiene la letra del dni pasado. El ultimo digito mas bien
const letra = (dni) => dni[dni.length - 1];

// Obtiene el numero sin letra. Mas bien todo menos el ultimo digito
const numero = (dni) => dni.substring(0, dni.length - 1);

//const isNumber = numero => typeof numero === 'number' ? true : false;
//const isLetter = letra => letra.match(/[a-zA-Z]/);

// Obtenemos el dni de la caja de texto
const obtenerDni = () => document.getElementById("dni").value;

// Validamos si el dni pertenece a extranjero
const validExtFormat = dni => {

    return (dni.startsWith("X") || dni.startsWith("Y") || dni.startsWith("Z"));
};

// Sustituimos la letra de extranjero por su valor
const substituteExt = (dni) => `${letrasExt.search(dni[0])}${dni.substring(1)}`;


// Validamos si el dni pertenece a nacional
const validNacFormat = (dni) => {

    return letras.includes(letra(dni).toUpperCase());

};

// Validamos la validez del dni pasado
const validDni = (dni) => {

    let indice = numero(dni) % 23;
    return (letras[indice] == letra(dni)) ? true : false;
}

// Funcion para limpiar la zona de mensajes. Simplemente eliminamos el div que crea showMessage
function clearUI() {

    let div = document.getElementById("mensajes");

    if (div) {
        div.remove();
    }
}

// Funcion para mostrar mensajes debajo de la caja de dni, en un div aparte
function showMessage(msg) {

    let body = document.getElementsByTagName("body")[0];

    let div = document.createElement("div");

    div.setAttribute("class", "mensajes");
    div.setAttribute("id", "mensajes");

    let h3 = document.createElement("h3");

    let texto = document.createTextNode(msg);

    h3.appendChild(texto);

    div.appendChild(h3);
    body.appendChild(div);

}

// Funcion principal
function comprobarDni(e) {

    e.preventDefault();

    // Limpiamos la zona de mensajes
    clearUI();

    // Obtenemos dni
    let dni = obtenerDni();

    // Comprobar nacional o extranjero
    // Extranjero
    let finaldni = validExtFormat(dni) ? substituteExt(dni) : dni;

    // Nacional
    if (validNacFormat(finaldni)) {
        if (validDni(finaldni)) {
            // Mostramos el mensaje
            //console.log("DNI ok");
            showMessage("DNI ok");
        } else {
            // Mostramos error
            //console.log("Dni error");
            showMessage("DNI incorrecto");
        }
    } else {
        //console.log("Error de formato");
        showMessage("Error en el formato del DNI");
    }
}