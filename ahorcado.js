var v = document.getElementsByTagName("audio")[0];
var v2 = document.getElementsByTagName("audio")[1];
var v3 = document.getElementsByTagName("audio")[2];
var v4 = document.getElementsByTagName("audio")[3];

var palabra = "CABALLITO DE MADERA";
var nueva = "";
var listaLetras = [];
var fallos = 6;
var aciertos = 0;


function IntroducirPalabra() {
    //  palabra = document.getElementById("palabraorigen").value.toUpperCase();
    if (palabra != "") {
        document.getElementById("cuadrojugador1").style.display = "none";
        document.getElementById("cuadrojugador2").style.display = "block";
        document.getElementById("cuadropalabra").style.display = "block";
        document.getElementById("imagen").style.display = "block";
        document.getElementById("oculta").innerHTML = nueva = palabra.replace(/(\w|\s)/g, '* ');
        document.getElementById("intentos").innerHTML = "Tienes " + fallos + " oportunidades.";
        listaLetras = [];
        document.getElementById("letrasdichas").innerHTML = "";
        document.getElementById("volverJugar").disabled = true;
    }
}

function DecirLetra() {

    letra = document.getElementById("letra").value;
    if (listaLetras.indexOf(letra) == -1) {
        listaLetras.push(letra);
        document.getElementById("letrasdichas").innerHTML = listaLetras;

        if (palabra.indexOf(letra) == -1) {
            fallos = fallos - 1;
            document.getElementById("intentos").innerHTML = "Te quedan " + fallos + " opotunidades.";
            document.getElementById("imagen").setAttribute("src", "img/ahorcado_" + fallos + ".png");
            document.getElementById("acierto").innerHTML = "Fallo!";
            document.getElementById("acierto").className += "acierto rojo";
            v3.play();
            if (fallos == 4) {
                alert("PISTA: Hay más de una palabra.")
            } else if (fallos == 3) {
                alert("PISTA: No hay pista!! jejeje");
            } else if (fallos == 2) {
                alert("PISTA: Se trata de un mamifero");
            } else if (fallos == 1) {
                alert("PISTA: Pero este no mama nada");
            }
        } else {
            document.getElementById("acierto").innerHTML = "Bien!";
            document.getElementById("acierto").className += "acierto verde";
            v4.play();
        }
        posicion = palabra.indexOf(letra);
        while (posicion != -1) {
            aciertos++;
            posicionStart = posicion + 1;
            posicion = palabra.indexOf(letra, posicionStart);
        }

    } else {
        alert("La letra '" + letra + "' ya esta dicha.")
    }
    setTimeout(function () {
        document.getElementById("acierto").className = "";
    }, 800);

    nueva = "";
    for (let i = 0; i < palabra.length; i++) {
        if (listaLetras.indexOf(palabra[i]) != -1) {
            nueva += palabra[i] + " ";
            if (palabra[i] == " ") {
                //Esto es para hacer el espacio visible, ya que de otra manera, me lo acortaria
                nueva += "__";
            }
        } else {
            //y SI NO ESTA, QUE ME SIGA PONIENDO ESTO
            nueva += "* ";
        }
    }

    document.getElementById("oculta").innerHTML = nueva;

    if (fallos == 0) {
        document.getElementById("letra").disabled = true;
        document.getElementById("botondecirletra").disabled = true;
        document.getElementById("palabrasolucion").disabled = true;
        document.getElementById("botonresolver").disabled = true;
        document.getElementById("volverJugar").disabled = false;
        document.getElementById("palabrasolucion").value = "";
        v2.play();
        fallos = 6;
        alert("Has perdido y te vamos a colgar.\nLa palabra era...\n¡JUEGA OTRA VEZ!");
    }

    if (aciertos == palabra.length) {
        document.getElementById("letra").disabled = true;
        document.getElementById("botondecirletra").disabled = true;
        document.getElementById("palabrasolucion").disabled = true;
        document.getElementById("botonresolver").disabled = true;
        document.getElementById("volverJugar").disabled = false;
        document.getElementById("acierto").innerHTML = "Felicidades !!";
        document.getElementById("acierto").className += "zoom-in encuadre";
        document.getElementById("letrasdichas").innerHTML="";
        v.play();
        //Esto lo pongo porque si no  me quita la clase con el setTimeOut que puse anteriormente
        //Y aqui le vuelvo a poner las clases, porque en el anterior se las quitaba
        setTimeout(function () {
            document.getElementById("acierto").className = "zoom-in encuadre";
        }, 800);
    }
}

function Resolver() {
    if (document.getElementById("palabrasolucion").value == "") {
        alert("Tendras que meter algun valor!! Digo yo, no?? ;-(")
    } else {
        if (document.getElementById("palabrasolucion").value.toUpperCase() == palabra) {
            document.getElementById("letra").disabled = true;
            document.getElementById("botondecirletra").disabled = true;
            document.getElementById("palabrasolucion").disabled = true;
            document.getElementById("botonresolver").disabled = true;
            document.getElementById("volverJugar").disabled = false;
            document.getElementById("acierto").innerHTML = "Felicidades !!";
            document.getElementById("acierto").className += "zoom-in encuadre";
            v.play();
        } else {
            if (fallos > 1) {
                v2.play();
                document.getElementById("acierto").innerHTML = "Fallo!";
                document.getElementById("acierto").className += "acierto rojo";
                document.getElementById("palabrasolucion").value = "";
                fallos--;
                document.getElementById("intentos").innerHTML = "Tienes " + fallos + " oportunidades.";
                document.getElementById("imagen").setAttribute("src", "img/ahorcado_" + fallos + ".png");
                alert("Has fallado, pero aun te queda alguna oportunidades");
            } else {
                v2.play();
                alert("Has perdido!! Has metido\n" + document.getElementById("palabrasolucion").value.toUpperCase() + "\ny era: " + palabra);
                document.getElementById("letra").disabled = true;
                document.getElementById("botondecirletra").disabled = true;
                document.getElementById("palabrasolucion").disabled = true;
                document.getElementById("botonresolver").disabled = true;
                document.getElementById("volverJugar").disabled = false;
            }
            setTimeout(function () {
                document.getElementById("acierto").className = "";
            }, 800);

        }
    }
}

function volverJugar() {
    document.getElementById("letra").disabled = false;
    document.getElementById("botondecirletra").disabled = false;
    document.getElementById("palabrasolucion").disabled = false;
    document.getElementById("botonresolver").disabled = false;
    document.getElementById("cuadrojugador1").style.display = "block";
    document.getElementById("cuadrojugador2").style.display = "none";
    document.getElementById("cuadropalabra").style.display = "none";
    document.getElementById("imagen").style.display = "none";
    document.getElementById("palabrasolucion").value = "";
    document.getElementById("palabraorigen").value = "";
    fallos = 6;
}
