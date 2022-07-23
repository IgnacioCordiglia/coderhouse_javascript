
var int = new Number(prompt("Ingrese un numero"))
let mensaje="Los 10 numeros que le siguen a "+int+" son:"
let lista=""

for(var i=1; i<=10; i++) {
    var suma=new Number(int+i)
    if(i!=10)
        lista=lista + suma + ", "
        else {
            lista=lista + suma
        }
}

alert(mensaje + lista)