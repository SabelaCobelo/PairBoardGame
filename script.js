//DECLARACIÓN DE VARIABLES

/*tablero es el área donde se dibuja el tablero*/
const tablero = document.getElementById('tablero');
/*mensaje es el espacio donde aparecen los mensajes rápidos*/
const mensaje = document.getElementById('mensaje');
/*contador con los intentos que el usuario ha realizado*/
let intentos = 0;
/*parejas restantes que se inicia en 6 por defecto*/
let parejasRestantes = 6;
/* Guarda las casillas que se seleccionan para compararlas */
let seleccionadas = [];
/*Se activan todas las casillas */
let casillas;
/*Dificultad seleccionada por defecto con 12 casillas distribuidas en 3x4 */
let dificultadSeleccionada = '3x4';

//CAMBIO DE DIFICULTAD AL JUEGO

//Se detecta el cambio de seleccion de dificultad
//Primero se obtiene el valor de la dificultad seleccionada por el usuario
document.getElementById('dificultad').addEventListener('change', (e) => {
    const dificultad = e.target.value;
    const opcionesPersonalizadas = document.getElementById('personalizado-opciones');

    console.log(`Dificultad seleccionada: ${dificultad}`);  // Debug
//Si el jugador elige personalizado el formulario el usuario ingresa numero de filas y columnas
    if (dificultad === 'personalizado') {
        opcionesPersonalizadas.classList.remove('hidden');
//oculta el formulario de opciones de personalizadas si no se utiliza
    } else {
        opcionesPersonalizadas.classList.add('hidden');
    }
});

//REINICIAR EL JUEGO

//Reinicia el numero de intentos que tiene el jugador a 0
function iniciarJuego() {
    intentos = 0;
//calcula cuantas parejas hay, con el numero de casillas totales entre 2
    parejasRestantes = parseInt(dificultadSeleccionada.split('x').reduce((a, b) => a * b)) / 2;
   //Reinicia el contador de intentos y de parejas restantes 
    document.getElementById('intentos').textContent = intentos;
    document.getElementById('parejas-restantes').textContent = parejasRestantes;
//Genera un nuevo tablero 
    generarTablero(dificultadSeleccionada);
    console.log(`Iniciando juego: Intentos = ${intentos}, Parejas Restantes = ${parejasRestantes}`); // Debug
}
