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


//GENERAR EL TABLERO

//divide la dificultad entre filas y columnas
function generarTablero(dificultad) {
    let [filas, columnas] = dificultad.split('x').map(Number);
    let totalCasillas = filas * columnas;

    console.log(`Generando tablero: Filas = ${filas}, Columnas = ${columnas}, Total Casillas = ${totalCasillas}`);  // Debug

// Generar números aleatorios en parejas
    let numeros = [];
    for (let i = 1; i <= totalCasillas / 2; i++) {
        numeros.push(i);
        numeros.push(i);
    }
//mezcla los numero al azar para desordenarlos
    numeros = numeros.sort(() => 0.5 - Math.random()); 
//limpia el tablero anterior
    tablero.innerHTML = ''; 
    tablero.style.gridTemplateColumns = `repeat(${columnas}, 80px)`;
//crea las casiillas del tablero
    numeros.forEach((numero) => {
        const casilla = document.createElement('div');
        casilla.classList.add('casilla');
        casilla.dataset.valor = numero;
        casilla.addEventListener('click', () => seleccionarCasilla(casilla));
        tablero.appendChild(casilla);
    });
//muestra las casillas en pantalla
    casillas = document.querySelectorAll('.casilla');
}

//FUNCION DE SELECCIONAR CASILLA

//Solo permite seleccionar dos casillas al mismo tiempo
//Muestra el número oculto que hay en las casillas
function seleccionarCasilla(casilla) {
    if (seleccionadas.length < 2 && !casilla.classList.contains('revealed')) {
        casilla.textContent = casilla.dataset.valor;
        casilla.classList.add('revealed');
        seleccionadas.push(casilla);
//Si hay dos casillas seleccionadas llama al método comprobar pareja
//añade un intento al numero de intentos totales
        if (seleccionadas.length === 2) {
            intentos++;
            document.getElementById('intentos').textContent = intentos;
            comprobarPareja();
        }
    }
}


//COMPROBACIÓN DE LA PAREJA SELECCIONADA
function comprobarPareja() {
    const [casilla1, casilla2] = seleccionadas;
//Si las casillas coinciden, reduce el numero de parejas restantes y muestra un mensaje
    if (casilla1.dataset.valor === casilla2.dataset.valor) {
        parejasRestantes--;
        document.getElementById('parejas-restantes').textContent = parejasRestantes;
        mostrarMensaje('¡Acertaste una pareja!');
        
        // Comprobación si el jugador ha ganado
        if (parejasRestantes === 0) {
            mostrarMensajeGanador('¡Has ganado el juego!');
        }
//Si las parejas no coinciden, las casaillas se esconden de nuevo
        seleccionadas = [];
    } else {
        mostrarMensaje('Fallaste. Intenta de nuevo.');
        setTimeout(() => {
            casilla1.textContent = '';
            casilla1.classList.remove('revealed');
            casilla2.textContent = '';
            casilla2.classList.remove('revealed');
            seleccionadas = [];
        }, 1000);
    }
}

//FUNCIONES PARA MOSTRAR MENSAJES

//Muestra mensaje de forma temporal
function mostrarMensaje(texto) {
    mensaje.textContent = texto;
    setTimeout(() => mensaje.textContent = '', 2000);
}

//Muestra el mensaje ganador si has acertado las parejas
function mostrarMensajeGanador(texto) {
    const mensajeGanador = document.createElement('div');
    mensajeGanador.id = 'mensaje-ganador';
    mensajeGanador.textContent = texto;
    document.body.appendChild(mensajeGanador);

    // El mensaje desaparece después de 3 segundos
    setTimeout(() => {
        mensajeGanador.remove();
//Se reinicia el juego
        iniciarJuego(); 
    }, 3000);
}

// Iniciar juego al actualizar o cargar la página
iniciarJuego();