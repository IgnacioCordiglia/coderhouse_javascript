class Partido {

constructor(local, golesLocales, visitante, golesVisitantes,L_GF,V_GF,L_GC,V_GC,L_DG,V_DG,L_ptos,V_ptos,L_PJ,V_PJ){
    this.local=local;
    this.golesLocales=golesLocales;
    this.visitante=visitante;
    this.golesVisitantes=golesVisitantes;
    this.L_GF=L_GF;
    this.V_GF=V_GF;
    this.L_GC=L_GC;
    this.V_GC=V_GC;
    this.L_DG=L_DG;
    this.V_DG=V_DG;
    this.L_ptos=L_ptos;
    this.V_ptos=V_ptos;
    this.L_PJ=L_PJ;
    this.V_PJ=V_PJ;
}   

getLocal(){
    console.log("Estadisticas de "+this.local);
}

getVisitante(){
    console.log("Estadisticas de "+this.visitante);
}

getGolesLocales(){
    return this.golesLocales;
}

getGolesVisitante(){
    return this.golesVisitantes;
}

getL_ptos() {
    console.log("Puntos: "+this.L_ptos);
}

getV_ptos() {
    console.log("Puntos: "+this.V_ptos);
}

getL_GF() {
    console.log("Goles a Favor: "+this.L_GF);
}

getV_GF() {
    console.log("Goles a Favor: "+this.V_GF);
}

getL_GC() {
    console.log("Goles en contra: "+this.L_GC);
}

getV_GC() {
    console.log("Goles en contra: "+this.V_GC);
}

getL_DF(){
    this.L_DF=this.L_GF-this.L_GC;
    console.log("Diferencia de Gol: "+this.L_DF);
}

getV_DF(){
    this.V_DF=this.V_GF-this.V_GC;
    console.log("Diferencia de Gol: "+this.V_DF);
}

getL_PJ(){
    console.log("Partidos jugados:"+this.L_PJ);
}

getV_PJ(){
    console.log("Partidos jugados:"+this.V_PJ);
}

actualizar() {
    if(this.golesLocales>this.golesVisitantes) {
        this.L_ptos+=3;
    }
    else if (this.golesVisitantes>this.golesLocales) {
            this.V_ptos+=3;
         }
         else if (this.golesLocales==this.golesVisitantes) {
            this.L_ptos+=1;
            this.V_ptos+=1;
         }

    this.L_GF+=this.golesLocales;
    this.L_GC+=this.golesVisitantes;
    this.V_GF+=this.golesVisitantes;
    this.V_GC+=this.golesLocales;
    this.L_DG=this.L_GF-this.L_GC;
    this.V_DG=this.V_GF-this.V_GC;
    this.L_PJ++;
    this.V_PJ++;
}
}




const solicitar = () => {
    let local= prompt("Ingrese nombre del equipo local");
    let visitante= prompt("Ingrese nombre del equipo visitante");
    let golesLocales = prompt("Ingrese los goles del equipo local: ");
    let golesVisitantes = prompt("Ingrese los goles del equipo visitante: ");
    let partido = new Partido (local,golesLocales,visitante,golesVisitantes,0,0,0,0,0,0,0,0,0,0);
    partido.actualizar();
    //Estadisticas del local
    partido.getLocal();
    partido.getL_PJ();
    partido.getL_ptos();
    partido.getL_GF();
    partido.getL_GC();
    partido.getL_DF();

    console.log(" ");

    //Estadisticas del visitante
    partido.getVisitante();
    partido.getV_PJ();
    partido.getV_ptos();
    partido.getV_GF();
    partido.getV_GC();
    partido.getV_DF();
}

solicitar();