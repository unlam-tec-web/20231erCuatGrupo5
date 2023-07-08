const jwt = require('jsonwebtoken');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const userPool = require('./config.js');


function registerUser(username, password, email, rol) {
  const attributeList = [
    new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'custom:rol', Value: rol }),
    new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'email', Value: email }),
  ];

  return new Promise((resolve, reject) => {
    userPool.signUp(username,password,attributeList, null, (error, result) => {
      if(error){
        console.log(error.code);
        reject({statusCode: 400, response: exceptionErros(error.code)});
      } else {
        resolve(result.user);
      }
    });
  });
}
function verificationCode(username,code) {

  return new Promise((resolve, reject) => {
    const userData = {
      Username : username,
      Pool : userPool
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, (error, result)=>{
      if(error){
        reject({statusCode: 400, response: exceptionErros(error.code)});
      }
      else{
        resolve(result);
      }
      });
    });
}

function login(username, password) {
  const authentiactionData = {
    Username: username,
    Password: password
  }

  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authentiactionData);

  const userData = {
    Username: username,
    Pool: userPool
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        
        const accessToken = result.getAccessToken().getJwtToken();
        const decodedToken = jwt.decode(accessToken);

        resolve({ result, decodedToken });
      },
      onFailure: (error) => {
        reject({ statusCode: 400, response: exceptionErros(error.code)});
      }
    });
  });
}

function exceptionErros(excep){
  switch(excep){
    case excep='InvalidPasswordException':
      return "Contraseña no cumple con requisitos"
    break;
    case excep='UsernameExistsException':
      return "El email ingresado ya existe"
    break;
    case excep='CodeMismatchException':
      return "La combinación de email y/o código de verificación es incorrecta"
    break;
    case excep='NotAuthorizedException':
      return "La combinación de usuario y/o contraseña es incorrecta"
    break;
    case excep='UserNotConfirmedException':
      return "El usuario no está confirmado aún"
    break;
    case excep='InvalidParameterException':
      return "Alguno de los campos no es correcto"
    break; 
    case excep='ExpiredCodeException':
      return "El email no existe o la clave está expirada "
    break;  
    default:
      excep="ExpiredCodeException";
      return "La combinación de email y/o código de verificación es incorrecta"
      break;
  }
} 

module.exports = {
  registerUser,
  verificationCode,
  login
};