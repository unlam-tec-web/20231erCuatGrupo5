'use strict';
//global.fetch = require('node-fetch');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

require('dotenv').config();
const Cognito = require('./cognito_service');
//si no levanta instalar npm install node-fetch@2

const body = {
  email: String,
  password: String,
  code:String,
  newPassword: String
};

async function signUp(req, res) {
  const response = await Cognito.signUp(req.body.email,req.body.password);
  return(response);
}

async function verify(req, res) {
  const response = await Cognito.verify(req.body.email,req.body.code);
  return(response);
}

async function signIn(req, res) {
  console.log("AUTH_CONTROLLER: ", "MAIL: ", req.body.email, " PASS: ",req.body.password)
  const response = await Cognito.signIn(req.body.email,req.body.password);
  return(response);
}

async function signOut(req, res) {
  const response = await Cognito.signOut(req.body.email);
  return(response);
}

async function forgotPassword(req, res) {
  const response = await Cognito.forgotPassword(req.body.email);
  return(response);
}


async function confirmPassword(req, res) {
  const response = await Cognito.confirmPassword(req.body.email, req.body.code, req.body.newPassword);
  return(response);
}


module.exports = {
  signUp,
  verify,
  signIn,
  signOut,
  forgotPassword,
  confirmPassword
};
