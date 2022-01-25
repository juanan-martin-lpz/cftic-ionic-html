/*

    Calculo IMC: peso / estatura^2

    Valores:

    < 16 => Desnutrido
    >= 16 && <18 => Delgado
    >= 18 && <25 => Ideal
    >= 25 && <31 => Sobrepeso
    >= 31 => Obesidad
    

    Se requiere:

    Calculo de los valores de IMC a partir de los parametros de peso y altura,
    mostrando los valores numericos y textuales, acompañando con una imagen los
    resultados

    ----------------------------------------------------------------------------

    ESTRATEGIA

    Leemos datos
    Realizamos los calculos
    Seleccionamos la imagen
    Mostramos los datos

*/

// Lectura de datos
const altura = () => document.getElementById("altura").value / 100;
const peso = () => document.getElementById("peso").value;

// Funciones generales
const between = (a, b, valor) => valor >= a && valor < b;
const greater = (a, valor) => valor > a;
const lesser = (a, valor) => !greater(a, valor);

// Funciones del UI
const obtenerPanelResultados = () => document.getElementById("resultados");
const obtenerIMCSpan = () => document.getElementById("imc");
const obtenerIMCTextoSpan = () => document.getElementById("imc-texto");
const obtenerCirculo = () => document.getElementById("circulo");
const obtenerImagen = () => document.getElementById("imagen");

// Elimina el circulo de la imagen, si existe
function resetImagen() {
    let c = obtenerCirculo();

    if (c) {
        c.remove();
    }
}

// Resetea textos del resultado
function resetTextos() {
    let imc = obtenerIMCSpan();
    let imc_texto = obtenerIMCTextoSpan();

    if (imc && imc_texto) {
        imc.innerHTML = "";
        imc_texto.innerHTML = "";
    }
}

// Resetea el UI
function resetUI() {
    resetTextos();
    resetImagen();
}

// Coloca el valor de imc en el texto correspondiente
function setIMC(imc) {
    let imcspan = obtenerIMCSpan();
    imcspan.innerHTML = imc.toFixed(2);
}

// Coloca el valor del imc texto en el texto correspondiente
function setIMCText(imc_texto) {
    let imcspan = obtenerIMCTextoSpan();
    imcspan.innerHTML = imc_texto;
}

// Crea el punto indicativo de l imagen 
function crearPuntoImagen(imc) {

    let clases = puntoIMCImagen(imc);

    let img = obtenerImagen();

    let circulo = document.createElement("div");
    circulo.setAttribute("id", "circulo");
    circulo.setAttribute("class", `${clases} circulo`);

    img.appendChild(circulo);


}

// Calculos

// Calcula el valor del imc
const obtenerIMC = (h, p) => p / (h * h);

// Obtiene el texto correspodiente al valor del imc
function obtenerIMCTexto(imc) {

    let result = "";

    result = greater(31, imc) ? "Obeso" : result;
    result = between(25, 31, imc) ? "Sobrepeso" : result;
    result = between(18, 25, imc) ? "Ideal" : result;
    result = between(16, 18, imc) ? "Delgado" : result;
    result = lesser(16, imc) ? "Desnutrido" : result;

    return result;
}




// Obtiene las clases css correspondientes al valor del imc
function puntoIMCImagen(imc) {

    let clase = "";

    clase = greater(31, imc) ? "quinto" : clase;
    clase = between(25, 31, imc) ? "cuarto" : clase;
    clase = between(18, 25, imc) ? "tercero" : clase;
    clase = between(16, 18, imc) ? "segundo" : clase;
    clase = lesser(16, imc) ? "primero" : clase;

    return "punto " + clase;
}


// Funcion principal
function calcularIMC(e) {

    e.preventDefault();

    resetUI();

    let h = altura();
    let p = peso();

    // Verificamos parametros, si alguno es cero mostramos error
    if (h == 0 || p == 0) {
        return;
    }

    // Realizamos los calculos
    let imc = obtenerIMC(h, p);
    let imc_texto = obtenerIMCTexto(imc);

    // Seleccionamos la imagen
    crearPuntoImagen(imc);

    // Mostramos los datos
    setIMC(imc);
    setIMCText(imc_texto);

}