//DEPENDENCIAS NODE
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

//MODULOS PROPIOS
const service = require('../service/product_service');

app.use(bodyParser.json())

//LISTAR TODOS LOS PRODUCTOS
app.get('/GetProducts', (req, res) => {
  const products = service.GetProducts();
  res.json(products)
});

//BUSCAR POR ID
app.get('/GetProductsById/:id?', (req, res) => {
  const id = req.params.id;
  if(!id){
    res.status(400).json(
      { titulo: "Error en la petición", mensaje: "No se ha ingresado ningún producto", status_code: 400 }
    );
  }
  const product = service.GetProductsById(id);
  if (product == null){
    res.status(404).json(
      { titulo: "Error en la petición", mensaje: "Producto no encontrado", status_code: 404 }
    );
  }
  res.json(product)
});

//NUEVO PRODUCTO
app.post('/AddProducto', (req, res) => {
  const ProductRequest = req.body;
  if (Object.keys(ProductRequest).length === 0){
    return res.status(400).json(
      { titulo: "Error en la petición", mensaje: "No se ha ingresado información correcta", status_code: 400 }
    );
  }
  service.AddProducto(ProductRequest)
  res.status(200).json({
    titulo: "Producto agregado",
    mensaje: "El producto ha sido agregado exitosamente",
    status_code: 200
  });
});

//ACTUALIZAR PRODUCTO
app.put('/UpdateProduct', (req, res) => {
  const UpdatedProduct = req.body;
  if (Object.keys(UpdatedProduct).length === 0) {
    return res.status(400).json(
      {titulo: "Error en la petición", mensaje: "No se ha ingresado información correcta", status_code: 400}
    );
  }
  const updated = service.UpdateProduct(UpdatedProduct)
  if (!updated){
    return res.status(404).json(
      {titulo: "Error en la petición", mensaje: "El producto " + UpdatedProduct.id + " no existe", status_code: 404}
    );
  }
  res.status(200).json({
    titulo: "Producto actualizado",
    mensaje: "El producto ha sido actualizado exitosamente",
    status_code: 200
  });

});

//ELIMINAR PRODUCTO
app.delete('/DeleteProductById/:id?', (req, res) => {
  const id = req.params.id;
  if(!id){
    res.status(400).json(
      { titulo: "Error en la petición", mensaje: "No se ha ingresado ningún producto", status_code: 400 }
    );
  }
  const product = service.GetProductsById(id);
  if (product == null){
    res.status(404).json(
      { titulo: "Error en la petición", mensaje: "El producto que desea eliminar no existe", status_code: 404 }
    );
  }

  service.DeleteProductById(id);
  res.status(200).json({
    titulo: "Producto eliminado",
    mensaje: "El producto ha sido eliminado exitosamente",
    status_code: 200
  });
});




function InitServer() {
  app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
  });
}

InitServer()
