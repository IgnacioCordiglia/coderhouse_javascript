let equipos = document.getElementsByClassName("equipo");
let PJs = document.getElementsByClassName("PJ");
let PGs = document.getElementsByClassName("PG");
let PEs = document.getElementsByClassName("PE");
let PPs = document.getElementsByClassName("PP");
let GFs = document.getElementsByClassName("GF");
let GCs = document.getElementsByClassName("GC");
let DFs = document.getElementsByClassName("DF");
let ptos = document.getElementsByClassName("pto");
let locales = document.getElementsByClassName("local-f11");
let visitantes = document.getElementsByClassName("visitante-f11");
let golesLocales = document.getElementsByClassName("golesLocal");
let golesVisitantes = document.getElementsByClassName("golesVisitante");

let cambiosLocales = [];
let cambiosVisitantes = [];
let partidos = [];
let tablaPosiciones = [];


for(i=0;i<locales.length;i++) {
    cambiosLocales.push("");
}

for(i=0;i<locales.length;i++) {
    cambiosVisitantes.push("");
}

for (i=0;i<equipos.length;i++) {
    let equipo = new Equipo (equipos[i].innerText,PJs[i].textContent,PGs[i].textContent,PEs[i].textContent,PPs[i].textContent,GFs[i].textContent,GCs[i].textContent);
    tablaPosiciones.push(equipo);
}



//funcion a la que se le da un nombre de un club y busca si este existe
//si existe, retorna el equipo correspondiente, sino retorna null

function find(name) {
    let devolver=null;

    for(i=0;i<equipos.length;i++) {
        if(equipos[i].innerText==name) {
            devolver = tablaPosiciones[i];
            break;
        }
    }

    return devolver;
}

//si al terminar el partido, el club tiene mas punto que quien esta arriba, sube un puesto, esto se repite hasta que no pueda avanzar mas
//en caso de empate de puntos, se decide quien esta delante por diferencia de gol
//en caso de empate de puntos y DF, se decide por goles a favor

function actualizarTabla(equipo) {
    let num = tablaPosiciones.indexOf(equipo);
    //si no esta primero...
    if (num!=0) {
        for (var i=tablaPosiciones.indexOf(equipo);i>1;i--) {
            //si el de arriba de i tiene menos puntos
            if(tablaPosiciones[i].getPuntos()>tablaPosiciones[i-1].getPuntos()) {
                //cambian puestos
                swapArrayElements(tablaPosiciones,i,i-1);    
            }
                //sino, si ambos tienen los mismos puntos...
                else if(parseFloat(tablaPosiciones[i].getPuntos())==parseFloat(tablaPosiciones[i-1].getPuntos())) {
                        //si el de arriba de i tiene peor diferencia de gol
                        if(parseFloat(tablaPosiciones[i].getDif())>parseFloat(tablaPosiciones[i-1].getDif())) {
                            //cambian puestos
                            swapArrayElements(tablaPosiciones,i,i-1);
                        }
                }
                    //sino, si ambos tienen los mismos puntos y misma diferencia de gol...
                    else if(tablaPosiciones[i].getDif()==tablaPosiciones[i-1].getDif()) {
                        //si el de arriba de i tiene menos goles a favor
                        if(tablaPosiciones[i].getGF()>tablaPosiciones[i-1].getGF()){
                            //cambian puestos
                            swapArrayElements(tablaPosiciones,i,i-1);
                        }
                        //sino, no hay que realizar mas cambios
                        else break
                    } else break;   
        }
    }

    for (var i=tablaPosiciones.indexOf(equipo);i<tablaPosiciones.length-1;i++) {
        //si el de abajo tiene mas puntos que i
        if(tablaPosiciones[i].getPuntos()<tablaPosiciones[i+1].getPuntos()) {
            //cambian puestos
            swapArrayElements(tablaPosiciones,i,i+1);    
        }
        //sino, si ambos tienen los mismos puntos
        else if(tablaPosiciones[i].getPuntos()==tablaPosiciones[i+1].getPuntos()){
            //si el de abajo tiene mejor diferencia de gol que i
            if(parseFloat(tablaPosiciones[i].getDif())<parseFloat(tablaPosiciones[i+1].getDif())) {
                    //cambian puestos
                    swapArrayElements(tablaPosiciones,i,i+1);
                }
                 //sino, si ambos tienen los mismos puntos y la misma diferencia de gol
            else if(parseFloat(tablaPosiciones[i].getDif())==parseFloat(tablaPosiciones[i+1].getDif())) {
                    //si el de abajo de i tiene mas goles a favor
                    if(tablaPosiciones[i].getGF()<tablaPosiciones[i+1].getGF()) {
                        //cambian puestos
                        swapArrayElements(tablaPosiciones,i,i+1);
                    }
                    //sino no se hacen mas cambios
                    else break
             } else break;
        } else break;
    }
}

//metodo que cambie de lugar 2 objetos de un array entre sí
var swapArrayElements = function(arr, indexA, indexB) {
    var temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
};

const solicitar = () => {
    let repetido = false;
    let num=null;

    for(i=0; i<locales.length;i++) {    
        //si hubo algun cambio en el fixture
        if(golesLocales[i].value!=cambiosLocales[i] || golesVisitantes[i].value!=cambiosVisitantes[i]) {
            //actualizo las listas
            cambiosLocales[i] = golesLocales[i].value;
            cambiosVisitantes[i] = golesVisitantes[i].value;
            
            //busco si ese partido ya se jugó
            for(j=0;j<partidos.length;j++) {
                //si ya habia un resultado agregado, lo borra y pone el nuevo
                if((locales[i].innerText == partidos[j].getLocal().getNombre() && visitantes[i].innerText == partidos[j].getVisitante().getNombre())) {
                    partidos[j].borrarPartido();
                    partidos.splice(j,1);
                    break;
                }
            }    
            //guardo la posicion del partido a agregar
            num=i;
            
            break;
        }
    }



    if(golesLocales[num].value<0 || golesVisitantes[num].value<0 || isNaN(golesLocales[i].value) || 
       isNaN(golesVisitantes[i].value)){
        Toastify({
            text: "Error: uno de los valores es invalido",
            duration: 3000,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "red",
            },
          }).showToast();
    }
    else {
        if(golesLocales[num].value!="" && golesVisitantes[num].value!="") {
        //con los nombres de los equipos, encuentro el objeto con sus datos
        let local = find(locales[num].innerText);
        let visitante = find(visitantes[num].innerText);
        //creo un nuevo partido con los datos
        let partido = new Partido (local,visitante,golesLocales[num].value,golesVisitantes[num].value);
        //actualizo los datos de los clubes con el resultado del partido
        partido.actualizar();
        //actualizo la posicion en la tabla de ambos equipos
        actualizarTabla(local);
        actualizarTabla(visitante);

        //hago los cambios necesarios a la tabla
        for (i=0;i<tablaPosiciones.length;i++) {
            equipos[i].innerText = tablaPosiciones[i].getNombre();
            PJs[i].innerText = tablaPosiciones[i].getPJ();
            PGs[i].innerText = tablaPosiciones[i].getPG();
            PEs[i].innerText = tablaPosiciones[i].getPE();
            PPs[i].innerText = tablaPosiciones[i].getPP();
            GFs[i].innerText = tablaPosiciones[i].getGF();
            GCs[i].innerText = tablaPosiciones[i].getGC();
            DFs[i].innerText = tablaPosiciones[i].getDif();
            ptos[i].innerText = tablaPosiciones[i].getPuntos();
        } 
        //elimino el mensaje de error en caso de que este visible ya que no corresponde
        document.getElementById('errorMsg').innerHTML = "";
        //guardo el partido
        sessionStorage.setItem('partidoJugado', partido);
        partidos.push(partido);
    }
}
}
//evento que hace que cada vez que se toca una tecla, se inicie solicitar()
addEventListener("input",solicitar)
