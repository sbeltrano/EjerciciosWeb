
//Punto 1
let decrypt = 'decrypt'
let encrypt = 'encrypt'
function secret(mensaje, funcion, claveSecreta) {

  if (funcion == encrypt) {
    mensaje = mensaje.map(x => x + claveSecreta);
  }
  else if (funcion == decrypt) {
    mensaje = mensaje.map(x => x - claveSecreta);
  }
  return mensaje;
}

//Punto 2
var mcd = (a,b) => { if(parseInt(a)==parseInt(b)){return a;} else{c = Math.min(parseInt(a), parseInt(b)); max = Math.max(parseInt(a), parseInt(b));d = max - c; return  mcd(c,d);} }
