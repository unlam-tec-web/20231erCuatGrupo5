const AwsConfig = require('./config');

function signUp(email, password) {

  return new Promise((resolve, reject) => {
    AwsConfig.initAWS ();
    AwsConfig.setCognitoAttributeList(email,password);
    AwsConfig.getUserPool().signUp(email, password, AwsConfig.getCognitoAttributeList(), null, function(err, result){
      if (err) {
        return resolve({ statusCode: 422, response: err });
      }
      const response = {
        username: result.user.username,
        userConfirmed: result.userConfirmed,
        userAgent: result.user.client.userAgent,
      }
      return resolve({ statusCode: 201, response: response });
    });
  });

}

function verify(email, code) {
  return new Promise((resolve) => {
    AwsConfig.getCognitoUser(email).confirmRegistration(code, true, (err, result) => {
      if (err) {
        return resolve({ statusCode: 422, response: err });
      }
      return resolve({ statusCode: 200, response: result });
    });
  });
}

function signIn(email, password) {
  console.log("COGNITO_SERVICE - ", "USER: ", email, "PASS: ", password);
  return new Promise((resolve) => {
    AwsConfig.getCognitoUser(email).authenticateUser(AwsConfig.getAuthDetails(email, password), {
      onSuccess: (result) => {
        /*const token = {
          accessToken: result.getAccessToken().getJwtToken(),
          idToken: result.getIdToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken(),
        };*/
        resolve({ statusCode: 200, response: 'estoy acá' });
      },
      onFailure: (err) => {
        resolve({ statusCode: 400, response: err.message || JSON.stringify(err) });
      },
    });
  });
}

function signOut(email) {
  return new Promise((resolve) => {
    const cognitoUser =  AwsConfig.getUserPool().getCurrentUser();
    if (cognitoUser !== null) {
      cognitoUser.signOut();
      return resolve({ statusCode: 200, response: 'Sesion cerrada' });
    }else{
      return resolve({ statusCode: 400, response: 'Server error' });
    }
  });
}

function forgotPassword(email) {
  return new Promise((resolve) => {
    AwsConfig.getCognitoUser(email).forgotPassword({
      onSuccess: (result) => {
        return resolve({ statusCode: 200, response: result });
      },
      onFailure: (err) => {
        return resolve({ statusCode: 400, response: err.message || JSON.stringify(err)});
      },
    });
  });
}

function confirmPassword(email, code, newPassword) {
  return new Promise((resolve) => {
    AwsConfig.getCognitoUser(email).confirmPassword(code, newPassword, {
      onSuccess: (result) => {
        return resolve({ statusCode: 200, response: result });
      },
      onFailure: (err) => {
        return resolve({ statusCode: 400, response: err.message || JSON.stringify(err)});
      },
    });
  });
}

module.exports = {
  signUp,
  verify,
  signIn,
  signOut,
  forgotPassword,
  confirmPassword
}
