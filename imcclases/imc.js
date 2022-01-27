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
    resultados.

    Cada vez que se calcula un peso se añade a un contenedor y se muestra en el
    div con id "historico".

    Habra un boton para reiniciar la lista y los resultados

    ----------------------------------------------------------------------------

    ESTRATEGIA

    Leemos datos
    Realizamos los calculos
    Seleccionamos la imagen
    Mostramos los datos

*/


//

/**
 * 
 * @class Imc
 * 
 * Clase para el calculo del IMC
 * 
 */

class Imc {

    /**
     * 
     * Constructor de clase
     * 
     * @param {number} peso 
     * @param {number} altura 
     */
    constructor(peso, altura) {
        this.peso = peso;
        this.altura = altura;
    }

    /**
     * 
     * Calcula el IMC
     * 
     * @returns number
     */
    calcularIMC() {
        // Realizamos los calculos
        return this.peso / (this.altura * this.altura);
    }

    /**
     * 
     * Calcula el valor textual del IMC segun el valor de la propiedad this.imc
     * 
     * @returns string
     */
    imcTexto() {

        let result = "";

        result = greater(31, this.imc()) ? "Obeso" : result;
        result = between(25, 31, this.imc()) ? "Sobrepeso" : result;
        result = between(18, 25, this.imc()) ? "Ideal" : result;
        result = between(16, 18, this.imc()) ? "Delgado" : result;
        result = lesser(16, this.imc(9)) ? "Desnutrido" : result;

        return result;
    }

    /**
     * Retorna el valor de imc calculado
     * 
     * @returns number
     */
    imc() {
        return this.calcularIMC();
    }

}

// Array para el historico
let historia = [];

// Lectura de datos
const altura = () => document.getElementById("altura").value / 100;
const peso = () => document.getElementById("peso").value;

// Funciones generales
const between = (a, b, valor) => valor >= a && valor < b;
const greater = (a, valor) => valor > a;
const lesser = (a, valor) => !greater(a, valor);

// Funcion de ordenacion
const sort = (coleccion, predicado) => coleccion.sort(predicado);

// Predicados de ordenacion
const compareImcAsc = (a, b) => a.imc() - b.imc();
const compareImcDesc = (a, b) => b.imc() - a.imc();

// Funciones del UI
const obtenerPanelResultados = () => document.getElementById("resultados");
const obtenerIMCSpan = () => document.getElementById("imc");
const obtenerIMCTextoSpan = () => document.getElementById("imc-texto");
const obtenerCirculo = () => document.getElementById("circulo");
const obtenerImagen = () => document.getElementById("imagen");
const obtenerLista = () => document.getElementById("lista");
const obtenerPeso = () => document.getElementById("peso");
const obtenerAltura = () => document.getElementById("altura");
const form = () => document.getElementById("form");

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

function resetValues() {
    let peso = obtenerPeso();
    peso.value = "";

    let altura = obtenerAltura();
    altura.value = "";

    peso.focus();

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

function aniadirListaUI(objeto) {

    let lista = obtenerLista();

    let h3imc = document.createElement("h3");
    let h3imc_texto = document.createElement("h3");

    h3imc.setAttribute("class", "column col-peso");
    h3imc_texto.setAttribute("class", "column col-result");

    h3imc.innerHTML = objeto.imc().toFixed(2);
    h3imc_texto.innerHTML = objeto.imcTexto();

    lista.appendChild(h3imc);
    lista.appendChild(h3imc_texto);
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

    let imc = new Imc(peso(), altura());

    // Seleccionamos la imagen
    crearPuntoImagen(imc.imc());

    // Mostramos los datos
    setIMC(imc.imc());
    setIMCText(imc.imcTexto());

    // Insertamos en el historico
    historia.push(imc);
    aniadirListaUI(imc);

    form().reset();
    obtenerPeso().focus();

}

// Limpiar el historico
function limpiarLista(e) {

    e.preventDefault();

    historia = [];

    limpiarListaUI();

}

function limpiarListaUI() {

    let lista = obtenerLista();
    lista.textContent = "";

    resetValues();
    resetUI();

}

function ordenarImcAsc(e) {
    e.preventDefault();

    ordena(compareImcAsc)
}

function ordenarImcDesc(e) {

    e.preventDefault();

    ordena(compareImcDesc)

}

function ordena(predicado) {

    let historia_ordenada = sort(historia, pºredicado);


    // Pintamos la lista
    limpiarListaUI();

    for (let item of historia_ordenada) {
        aniadirListaUI(item);
    }
}