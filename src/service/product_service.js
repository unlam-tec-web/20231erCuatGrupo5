const productos = require('../models/product');

function GetProducts(){
  return productos;
}

function GetProductsById(id){
  producto =  productos.find(e => e.id == id);
  return producto === undefined ? null : producto;
}

function AddProducto(producto){
  const _producto =  {
    id: JSON.stringify(productos.length + 1),
    descripcion: producto.descripcion,
    precio: producto.precio,
    stock: producto.stock
  }
  productos.push(_producto)
}

function DeleteProductById(id){
  const index = productos.findIndex(element => element.id === id);
  if (index !== -1) {
    productos.splice(index, 1);
  }
}

module.exports = {
  GetProducts,
  GetProductsById,
  AddProducto,
  DeleteProductById
};
