const express = require('express');
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));

//Configuracion del motor pug
app.set('view engine', 'pug');
app.set('views', './views');
//Fin de configuracion del motor pug

let productsHC = [
  { id: 1, title: 'nike ball', price: 101, thumbnail: 'http://localhost:8080/public/nike-ball.jpg' },
  { id: 2, title: 'nike shoes', price: 102, thumbnail: 'http://localhost:8080/public/nike-shoes.jpg' },
  { id: 3, title: 'adidas shoes', price: 102, thumbnail: 'http://localhost:8080/public/adidas-shoes.jpg' },
];

app.get('/products', (req, res) => {
  res.render('products.pug', { title: 'listado de perros', products: productsHC });
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  try {
    let productoEncontrado =  productsHC.find(e => e.id == id);
    
    if(productoEncontrado){
    res.render('unProducto', {producto: productoEncontrado, title: 'Detalle del producto'})
    } else {
      res.render('noProduct')
    }
  } catch (error) {
    res.json({error});
  }
  res.render('unProducto.pug', { product: productoEncontrado });
});

app.get('/form', (req, res) => {
  res.render('formulario', {titulo:'Formulario de carga'});
});

app.post('/form', (req, res) => {

  const { body } = req;

  const indice = productsHC.map(elem => elem.id).sort();
  id = indice[indice.length - 1] + 1 
  
  const productoAgregar = {...body, id}

  productsHC.push(productoAgregar);
  res.render('productoNuevo', { productoNuevo: productoAgregar, title:'Nuevo producto agregado'});
});