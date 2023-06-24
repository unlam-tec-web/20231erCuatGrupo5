const ProductosList = require('../model/product');

function GetProducts(){
  return ProductosList;
}

function GetProductsById(id){
  producto =  ProductosList.find(e => e.id == id);
  return producto === undefined ? null : producto;
}

function AddProducto(producto){
  const _producto =  {
    id: (ProductosList.length + 1),
    descripcion: producto.descripcion,
    precio: producto.precio,
    stock: producto.stock,
  }
  ProductosList.push(_producto)
}

function DeleteProduct(id){
  const index = ProductosList.findIndex(element => element.id === Number(id));
  if (index !== -1) {
    ProductosList.splice(index, 1);
  }
}

function UpdateProduct(producto){
  console.log(JSON.stringify(producto))
  const index = ProductosList.findIndex(element => element.id === producto.id);
  if(index === -1){
    console.log("Producto ", producto.id , " no encontrado")
    return false;
  }
  setNewValues(index, producto);
  return true;
}

function setNewValues(i, producto){
  ProductosList[i].descripcion = producto.descripcion;
  ProductosList[i].precio = producto.precio;
  ProductosList[i].stock = producto.stock;
}

module.exports = {
  GetProducts,
  GetProductsById,
  AddProducto,
  UpdateProduct,
  DeleteProduct
};
