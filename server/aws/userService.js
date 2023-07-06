const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const userPool = require('./config2.js');


function registerUser(username, password, email, name) {
  const attributeList = [
    new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'name', Value: name }),
    new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'email', Value: email }),
  ];

  return new Promise((resolve, reject) => {
    userPool.signUp(username,password,attributeList, null, (error, result) => {
      if (error) {
        reject(error);
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
    cognitoUser.confirmRegistration(code, true, (err, result)=>{
      if(err){
        console.log('Error al validad el código de confirmación');
        reject(err);
      }
      else{
        console.log('Validación del código de confirmación exitosa');
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
        resolve(result);
      },
      onFailure: (error) => {
        reject(error);
      }
    });
  });
}


module.exports = {
  registerUser,
  verificationCode,
  login
};