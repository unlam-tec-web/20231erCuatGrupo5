const express = require("express");
const bodyParser = require('body-parser');
const app = express();

// Dependencias y configuraciones adicionales

const productController = require('./controller/ProductController');
const userController = require('./controller/UserController');
const cartController = require('./controller/CartController');

app.use(bodyParser.json());

app.use('/product', productController);
app.use('/users', userController);
app.use('/cart', cartController);

// Otras configuraciones y middleware

function InitServer() {
  app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
  });
}

InitServer();
