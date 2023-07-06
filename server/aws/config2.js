const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const poolData = {
  UserPoolId: 'us-east-2_wp1ZOXxR9', // Reemplaza con el ID del grupo de usuarios (User Pool) en Cognito
  ClientId: '70bi6vent87npmp6ntoog9h4rm', // Reemplaza con el ID de cliente de tu aplicación en Cognito
};

const region = 'us-east-2';

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

module.exports = userPool;