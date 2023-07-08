const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const CREDENTIALS = require('./CREDENTIALS');
const u = require('./aws/config')
const cookieParser = require('cookie-parser');

app.use(cors({origin:'http://localhost:4200', credentials:true}));
app.use(cookieParser());
// Dependencias y configuraciones adicionales

const UserController =require ('./aws/userController');
const productController = require('./controller/ProductController');
const userController = require('./controller/UserController');
const cartController = require('./controller/CartController');

app.use(bodyParser.json());

app.use('/user',UserController);
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
