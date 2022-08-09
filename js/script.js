class Partido {

constructor(local, visitante, golesLocal, golesVisitante){
    this.local=local;
    this.visitante=visitante;
    this.golesLocal=golesLocal;
    this.golesVisitante=golesVisitante;
}   

getLocal(){
    return this.local;
}

getVisitante(){
    return this.visitante;
}

getGolesLocales(){
    return this.golesLocales;
}

getGolesVisitante(){
    return this.golesVisitantes;
}

//tomando en cuenta el resultado del partido, actualiza los datos de los equipos participantes
actualizar() {
    if(this.golesLocal>this.golesVisitante) {
        this.local.PG++;
        this.visitante.PP++;
    }
    else if (this.golesVisitante>this.golesLocal) {
            this.visitante.PG++;
            this.local.PP++;
         }
         else if (this.golesLocal==this.golesVisitante) {
            this.local.PE++;
            this.visitante.PE++;
         }

    this.local.GF=parseInt(this.local.GF) + parseInt(this.golesLocal);
    this.visitante.GF=parseInt(this.visitante.GF) + parseInt(this.golesVisitante);
    this.local.GC=parseInt(this.local.GC) + parseInt(this.golesVisitante);
    this.visitante.GC=parseInt(this.visitante.GC) + parseInt(this.golesLocal);
    this.local.PJ++;
    this.visitante.PJ++;
}
}

class Equipo {
    constructor(nombre,PJ,PG,PE,PP,GF,GC) {
        this.nombre=nombre;
        this.PJ=PJ;
        this.PG=PG;
        this.PE=PE;
        this.PP=PP;
        this.GF=GF;
        this.GC=GC;
    }

    getNombre(){
        return this.nombre;
    }

    getPJ(){
        return this.PJ;
    }

    getPG(){
        return this.PG;
    }

    getPE(){
        return this.PE;
    }

    getPP(){
        return this.PP;
    }

    getPuntos(){
        let puntos=0;
        puntos+=+this.PG*3;
        puntos+=+this.PE;
        return puntos;
    }

    getGF(){
        return this.GF;
    }

    getGC(){
        return this.GC;
    }

    getDif(){
        let dif=0;
        dif+=+this.GF;
        dif+=-this.GC;
        return dif;
    }
}

let equipos = document.getElementsByClassName("equipo"); 
let PJs = document.getElementsByClassName("PJ");
let PGs = document.getElementsByClassName("PG");
let PEs = document.getElementsByClassName("PE");
let PPs = document.getElementsByClassName("PP");
let GFs = document.getElementsByClassName("GF");
let GCs = document.getElementsByClassName("GC");

let tablaPosiciones = [];

for (i=0;i<equipos.length;i++) {
    let equipo = new Equipo (equipos[i].innerText,PJs[i].textContent,PGs[i].textContent,PEs[i].textContent,PPs[i].textContent,GFs[i].textContent,GCs[i].textContent);
    tablaPosiciones.push(equipo)
}

//funcion a la que se le da un nombre de un club y busca si este existe
//si existe, retorna el equipo correspondiente, sino retorna null

function find(name) {
    let devolver=null;

    for(i=0;i<equipos.length;i++) {
        if(equipos[i].innerText==name) {
            devolver = tablaPosiciones[i];
        }
    }

    return devolver;
}

//si al terminar el partido, el club tiene mas punto que quien esta arriba, sube un puesto, esto se repite hasta que no pueda avanzar mas
//en caso de empate de puntos, se decide quien esta delante por diferencia de gol
function actualizarTabla(equipo) {

    for (var i=tablaPosiciones.indexOf(equipo);i>0;i--) {
        if(tablaPosiciones[i].getPuntos()>tablaPosiciones[i-1].getPuntos()) {
            swapArrayElements(tablaPosiciones,i,i-1);
        }
        else if(tablaPosiciones[i].getPuntos()==tablaPosiciones[i-1].getPuntos()) {
                if(tablaPosiciones[i].getDif()>tablaPosiciones[i-1].getDif()) {
                    swapArrayElements(tablaPosiciones,i,i-1);
                }
                else break;
             }
             else break;
        }
}

var swapArrayElements = function(arr, indexA, indexB) {
    var temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
  };

const solicitar = () => {
    let local= null;
    let localNombre = document.getElementById("local").value;
    local = find(localNombre);

    let visitante= null;
    let visitanteNombre = document.getElementById("visitante").value;
    visitante = find(visitanteNombre);

    let golesLocales = document.getElementById("golesLocal").value;
    let golesVisitantes = document.getElementById("golesVisitante").value;

    
    if(local == visitante || local == null || visitante == null || golesLocales<0 || golesVisitantes<0 || isNaN(golesLocales) || isNaN(golesVisitantes)) {
        console.log("ERROR! Ingrese los datos de nuevo");
        console.log ("ACLARACION: para esta version de prueba solo los primeros 6 equipos de la tabla fueron agregados y deben ser escritos tal y como estan en la tabla");
    }
    else {
        let partido = new Partido (local,visitante,golesLocales,golesVisitantes);
        partido.actualizar();
        actualizarTabla(local);
        actualizarTabla(visitante);

        console.log ("TABLA POSICIONES");
        console.log ("");
        for(i=0;i<tablaPosiciones.length;i++) {
            console.log((i+1)+")"+tablaPosiciones[i].getNombre());
        }

    //Estadisticas del local
        console.log((tablaPosiciones.indexOf(local)+1)+" | "+partido.local.getNombre()+
        " | PJ: "+partido.local.getPJ()+" | PG: "+partido.local.getPG()+
        " | PE: "+partido.local.getPE()+" | PP: "+partido.local.getPP()+
        " | GF: "+partido.local.getGF()+" | GC: "+partido.local.getGC()+
        " | DF: "+partido.local.getDif()+" | ptos: "+partido.local.getPuntos())


        console.log(" ");

    //Estadisticas del visitante
    console.log((tablaPosiciones.indexOf(visitante)+1)+" | "+partido.visitante.getNombre()+
    " | PJ: "+partido.visitante.getPJ()+" | PG: "+partido.visitante.getPG()+
    " | PE: "+partido.visitante.getPE()+" | PP: "+partido.visitante.getPP()+
    " | GF: "+partido.visitante.getGF()+" | GC: "+partido.visitante.getGC()+
    " | DF: "+partido.visitante.getDif()+" | ptos: "+partido.visitante.getPuntos())
    }

}

let boton = document.getElementById("boton");
boton.addEventListener("click",solicitar);
