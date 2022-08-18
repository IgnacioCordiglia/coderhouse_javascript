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

getGolesLocal(){
    return this.golesLocal;
}

getGolesVisitante(){
    return this.golesVisitante;
}

//tomando en cuenta el resultado del partido, actualiza los datos de los equipos participantes
actualizar() {
    if(golesLocales!=null && golesVisitantes!=null) {
        if(this.golesLocal>this.golesVisitante) {
            this.visitante.PP++;
            this.local.PG++;
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
        this.visitante.GC=parseInt(this.visitante.GC) + parseInt(this.golesLocal)
        this.local.PJ++;
        this.visitante.PJ++;
    }
}

borrarPartido() {
    if(this.golesLocal!=null && this.golesVisitante!=null) {
        if(this.golesLocal>this.golesVisitante) {
            this.visitante.PP--;
            this.local.PG--;
        }
        else if (this.golesVisitante>this.golesLocal) {
                this.visitante.PG--;
                this.local.PP--;
             }
             else if (this.golesLocal==this.golesVisitante) {
                        this.local.PE--;
                        this.visitante.PE--;
                  }

        this.local.GF=parseInt(this.local.GF) - parseInt(this.golesLocal);
        this.visitante.GF=parseInt(this.visitante.GF) - parseInt(this.golesVisitante);
        this.local.GC=parseInt(this.local.GC) - parseInt(this.golesVisitante);
        this.visitante.GC=parseInt(this.visitante.GC) - parseInt(this.golesLocal)
        this.local.PJ--;
        this.visitante.PJ--;
    }
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
        puntos = parseInt(this.PG)*3 + parseInt(this.PE);
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

var swapArrayElements = function(arr, indexA, indexB) {
    var temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
};

const solicitar = () => {
    let repetido = false;
    let num=null;

    for(i=0; i<locales.length;i++) {    

        if(golesLocales[i].value!=cambiosLocales[i] || golesVisitantes[i].value!=cambiosVisitantes[i]) {
            cambiosLocales[i] = golesLocales[i].value;
            cambiosVisitantes[i] = golesVisitantes[i].value;
            
            
            for(j=0;j<partidos.length;j++) {

                if((locales[i].innerText == partidos[j].getLocal().getNombre() && visitantes[i].innerText == partidos[j].getVisitante().getNombre())) {
                    partidos[j].borrarPartido();
                    partidos.splice(j,1);
                    break;
                }
            }    
            num=i;
            
            break;
        }
    }



    if(golesLocales[num].value<0 || golesVisitantes[num].value<0 || isNaN(golesLocales[i].value) || 
       isNaN(golesVisitantes[i].value) || golesLocales[num].value=="" || golesVisitantes[num].value==""){
        document.getElementById('errorMsg').innerHTML = "<h4>ERROR! Ingrese los datos de nuevo</h4>";
    }
    else {
        let local = find(locales[num].innerText);
        let visitante = find(visitantes[num].innerText);
        let partido = new Partido (local,visitante,golesLocales[num].value,golesVisitantes[num].value);
        partido.actualizar();
        actualizarTabla(local);
        actualizarTabla(visitante);

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
        document.getElementById('errorMsg').innerHTML = "";
        sessionStorage.setItem('partidoJugado', partido);
        partidos.push(partido);
}
}

addEventListener("input",solicitar)
