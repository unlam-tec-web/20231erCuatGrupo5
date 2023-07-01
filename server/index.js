const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const CREDENTIALS = require('./CREDENTIALS');
const u = require('./aws/config')

app.use(cors());
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
    console.log("LLEGUE")
    console.log(u.getAuthDetails('prueba@prueba.com', 'Tallerweb2#'))
    console.log(u.setCognitoAttributeList('prueba2@prueba.com'))
  });
}

InitServer();
