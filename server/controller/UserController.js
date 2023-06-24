const express = require("express");
const service = require('../service/user_service')
const router = express.Router();

module.exports = router;

router.get('/GetUsersList', (req, res) => {
  const products = service.GetUsers();
  res.json(products)
});

router.get('/GetUser/:id?', (req, res) => {
  const id = req.params.id;
  if(!id){
    res.status(400).json(
      { titulo: "Error en la petición", mensaje: "No se ha ingresado ningún usuario", status_code: 400 }
    );
  }
  const _user = service.GetUserById(id);
  if (_user == null){
    res.status(404).json(
      { titulo: "Error en la petición", mensaje: "Usuario no encontrado", status_code: 404 }
    );
  }
  res.json(_user)
});

router.post('/Create', (req, res) => {
  const UserRequest = req.body;
  if (Object.keys(UserRequest).length === 0){
    return res.status(400).json(
      { titulo: "Error en la petición", mensaje: "No se ha ingresado información correcta", status_code: 400 }
    );
  }
  service.CreateUser(UserRequest)
  res.status(200).json({
    titulo: "Usuario agregado",
    mensaje: "El usuario se ha creado exitosamente",
    status_code: 200
  });
});

router.put('/Update', (req, res) => {
  const UpdatedUser = req.body;
  if (Object.keys(UpdatedUser).length === 0) {
    return res.status(400).json(
      {titulo: "Error en la petición", mensaje: "No se ha ingresado información correcta", status_code: 400}
    );
  }
  const updated = service.UpdateUser(UpdatedUser)
  if (!updated){
    return res.status(404).json(
      {titulo: "Error en la petición", mensaje: "El usuario " + UpdatedUser.id + " no existe", status_code: 404}
    );
  }
  res.status(200).json({
    titulo: "Usuario actualizado",
    mensaje: "El usuario ha sido actualizado exitosamente",
    status_code: 200
  });

});

router.delete('/Delete/:id?', (req, res) => {
  const id = req.params.id;
  if(!id){
    res.status(400).json(
      { titulo: "Error en la petición", mensaje: "No se ha ingresado ningún usuario", status_code: 400 }
    );
  }
  const product = service.GetUserById(id);
  if (product == null){
    res.status(404).json(
      { titulo: "Error en la petición", mensaje: "El usuario que desea eliminar no existe", status_code: 404 }
    );
  }

  service.DeleteUser(id);
  res.status(200).json({
    titulo: "Usuario eliminado",
    mensaje: "El usuario ha sido eliminado exitosamente",
    status_code: 200
  });
});

module.exports = router;
