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

    this.local.GF+=+this.golesLocal;
    this.visitante.GF+=+this.golesVisitante;
    this.local.GC+=+this.golesVisitante;
    this.visitante.GC+=+this.golesLocal;
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
        return this.PG*3+this.PE;
    }

    getGF(){
        return this.GF;
    }

    getGC(){
        return this.GC;
    }

    getDif(){
        return this.GF-this.GC;
    }
}

let AtlTucuman = new Equipo ("Atletico Tucuman",10,6,4,0,10,3);
let Argentinos = new Equipo ("Argentinos Jrs.",10,6,2,2,15,9);
let Racing = new Equipo ("Racing Club",10,5,3,2,16,8);
let Gimnasia = new Equipo ("Gimnasia (LP)",10,5,3,2,10,6);
let Union = new Equipo ("Union",10,5,3,2,18,16); 
let GodoyCruz = new Equipo ("Godoy Cruz",10,5,2,3,12,8);
let tablaPosiciones = [AtlTucuman,Argentinos,Racing,Gimnasia,Union,GodoyCruz];


//funcion a la que se le da un nombre de un club y busca si este existe
//si existe, retorna el equipo correspondiente, sino retorna null

function find(name) {
    let devolver=null;

    for(i=0; i < tablaPosiciones.length;i++) {

        if(tablaPosiciones[i].getNombre()==name) {
            devolver = tablaPosiciones [i];
            break;
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
    let localNombre= prompt("Ingrese nombre del equipo local");
    let local= null;

    local = find(localNombre);

    let visitanteNombre= prompt("Ingrese nombre del equipo visitante");
    let visitante=null;

    visitante = find(visitanteNombre);

    let golesLocales = prompt("Ingrese los goles del equipo local: ");
    let golesVisitantes = prompt("Ingrese los goles del equipo visitante: ");

    if(local == null || visitante == null || isNaN(golesLocales) || isNaN(golesVisitantes)) {
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

solicitar();