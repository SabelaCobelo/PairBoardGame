//DECLARACIÓN DE VARIABLES

/*tablero es el área donde se dibujo el tablero*/
const tablero = document.getElementById('tablero');
/*mensaje es el espacio donde aparecen los mensajes rápidos*/
const mensaje = document.getElementById('mensaje');
/*Se inicia el contador de intentos*/
let intentos = 0;
/*Inicia las parejas restantes*/
let parejasRestantes = 6;
/*Casillas que se seleccionan para compararlas */
let seleccionadas = [];
/*Se activan todas las casillas */
let casillas;
/*Dificultad seleccionada por defecto con 12 casillas distribuidas en 3x4 */
let dificultadSeleccionada = '3x4';