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

    //se calculan los puntos a partir de los partidos ganados y empatados
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

    //se calcula la diferencia de gol a partir de los goles anotados y concedidos
    getDif(){
        let dif=0;
        dif+=+this.GF;
        dif+=-this.GC;
        return dif;
    }
}