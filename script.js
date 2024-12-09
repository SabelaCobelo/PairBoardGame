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