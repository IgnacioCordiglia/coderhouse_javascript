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
            //si gana el local, se le suma un partido ganado y un partido perdido al visitante
            if(this.golesLocal>this.golesVisitante) {
                this.visitante.PP++;
                this.local.PG++;
            }
            //si gana el visitante, se le suma un partido ganado y un partido perdido al local
            else if (this.golesVisitante>this.golesLocal) {
                    this.visitante.PG++;
                    this.local.PP++;
                 }
                 //si empatan, se le suma un partido empata a c/u
                 else if (this.golesLocal==this.golesVisitante) {
                            this.local.PE++;
                            this.visitante.PE++;
                      }
    
            //se le agregan los goles metidos y concedidos a los goles a favor y en contra de cada equipo
            this.local.GF=parseInt(this.local.GF) + parseInt(this.golesLocal);
            this.visitante.GF=parseInt(this.visitante.GF) + parseInt(this.golesVisitante);
            this.local.GC=parseInt(this.local.GC) + parseInt(this.golesVisitante);
            this.visitante.GC=parseInt(this.visitante.GC) + parseInt(this.golesLocal)
            //se le suma un partido jugado mas a ambos
            this.local.PJ++;
            this.visitante.PJ++;
        }
    }
    
    borrarPartido() {
        if(this.golesLocal!=null && this.golesVisitante!=null) {
            //si ganó el local, se le resta el partido ganado y el partido perdido al visitante
            if(this.golesLocal>this.golesVisitante) {
                this.visitante.PP--;
                this.local.PG--;
            }
            //si ganó el vistante, se le resta el partido ganado y el partido perdido al local
            else if (this.golesVisitante>this.golesLocal) {
                    this.visitante.PG--;
                    this.local.PP--;
                 }
                 //si empataron, se le resta el partido empatado a ambos
                 else if (this.golesLocal==this.golesVisitante) {
                            this.local.PE--;
                            this.visitante.PE--;
                      }
    
            //se le quitan los goles metidos y concedidos a los goles a favor y en contra de cada equipo
            this.local.GF=parseInt(this.local.GF) - parseInt(this.golesLocal);
            this.visitante.GF=parseInt(this.visitante.GF) - parseInt(this.golesVisitante);
            this.local.GC=parseInt(this.local.GC) - parseInt(this.golesVisitante);
            this.visitante.GC=parseInt(this.visitante.GC) - parseInt(this.golesLocal)
            //se le resta un partido jugado mas a ambos
            this.local.PJ--;
            this.visitante.PJ--;
        }
    }
    }