//función con promesa
function loadJSON(url) {

  return new Promise(function(resolve, reject) {

    let req = new XMLHttpRequest();
    req.open('GET', url);
  
    req.onload = function() {
      if (req.status === 200) {

        resolve(req.response);
      } else {

        reject(Error('La url no se cargó; error code:' + req.statusText));
      }
    };
    req.onerror = function() {

        reject(Error('Error de red.'));
    };

    req.send();
  });
}

//función que llama la promesa
function productoMásPedido(){
  let jsonproductos;
  let jsondetallepedido;

  let detallepedido;
  let productos;

  let idMasPedido;

  loadJSON('https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json').then(function(response) {

    jsondetallepedido = response;
    detallepedido = JSON.parse(jsondetallepedido);


    loadJSON('https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json').then(function(response) {

      jsonproductos = response;
      productos = JSON.parse(jsonproductos);

      let masPedido ='0000';
      let countMax = 0;
      for (producto in productos) {
        let count = 0;
        let pedidoActual = productos[producto].idproducto;
        //console.log(pedidoActual);
        for (pedido1 in detallepedido) {
            if (detallepedido[pedido1].idproducto == pedidoActual) {
                count = count + parseInt(detallepedido[pedido1].cantidad);
            }
        }
        if(count >= countMax){
          countMax = count;
          masPedido = pedidoActual;
        }
      }
  
      idMasPedido = masPedido;

      for (producto in productos) {
        if(productos[producto].idproducto == idMasPedido){
          console.log('Id del producto: '+idMasPedido);
          console.log('Nombre del producto: '+productos[producto].nombreProducto);
          console.log('Cantidad de veces que ha sido pedido: '+countMax);
          return;
        }
      }
  
    }, function(Error) {
      console.log(Error);
    });

  }, function(Error) {
    console.log(Error);
  });

}

//llamado de la función final
productoMásPedido();