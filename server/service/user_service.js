const UserList = require('../model/user')

function GetUserById(id){
  user =  UserList.find(e => e.id == id);
  return user === undefined ? null : user;
}

function GetUsers(){
  return UserList
}

function CreateUser(usuario){
  const _user = {
    id: (UserList.length + 1),
    nombre: usuario.nombre,
    mail: usuario.mail,
    password: usuario.password
  }
  UserList.push(_user)
}

function UpdateUser(_user){
  console.log(JSON.stringify(_user))
  const index = UserList.findIndex(element => element.id === _user.id);
  if(index === -1){
    console.log("Usuario ", _user.id , " no encontrado")
    return false;
  }
  setValues(index, _user)
  return true;
}

function DeleteUser(id){
  const index = UserList.findIndex(element => element.id === Number(id));
  if (index !== -1) {
    UserList.splice(index, 1);
  }
}

function setValues(i, _user){
  UserList[i].nombre = _user.nombre
  UserList[i].mail = _user.mail
  UserList[i].password = _user.password
}
module.exports = {
  GetUserById,
  GetUsers,
  CreateUser,
  UpdateUser,
  DeleteUser
}
