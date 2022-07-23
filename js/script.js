let local= prompt("Ingrese nombre del equipo local");
let visitante= prompt("Ingrese nombre del equipo visitante");
let golesLocales = prompt("Ingrese los goles del equipo local: ");
let golesVisitantes = prompt("Ingrese los goles del equipo visitante: ");
//goles a favor del local
let L_GF=0;
//goles a favor del visitante
let V_GF=0;
//goles en contra del local
let L_GC=0;
//goles en contra del visitante
let V_GC=0;
//diferencia de gol del local
let L_DG=0;
//diferencia de gol del local
let V_DG=0;
//puntos del local
let L_ptos=0;
//puntos del visitante
let V_ptos=0;

if(golesLocales>golesVisitantes) {
    L_ptos=3;
}
else if (golesVisitantes>golesLocales) {
        V_ptos=3;
     }
     else if (golesLocales==golesVisitantes) {
            L_ptos=1;
            V_ptos=1;
     }

L_GF+=golesLocales;
L_GC+=golesVisitantes;
V_GF+=golesVisitantes;
V_GC+=golesLocales;
L_DG=L_GF-L_GC;
V_DG=V_GF-V_GC;

//Estadisticas del local
console.log("Estadisticas de "+local);
console.log("Puntos: "+L_ptos);
console.log("Goles a Favor: "+L_GF);
console.log("Goles en contra: "+L_GC);
console.log("Diferencia de Gol: "+L_DG);

console.log(" ");

//Estadisticas del visitante
console.log("Estadisticas de "+visitante);
console.log("Puntos: "+V_ptos);
console.log("Goles a Favor: "+V_GF);
console.log("Goles en contra: "+V_GC);
console.log("Diferencia de Gol: "+V_DG);