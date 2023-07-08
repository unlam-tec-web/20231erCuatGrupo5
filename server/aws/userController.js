const userService = require('./userService');
const express = require('express');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const user = await userService.registerUser(username, password, email);
    res.status(200).json({ message: 'User registered successfully', usuario : user});
  } catch (error) {
      res.status(error.statusCode).json({ message: error.response});
  }
});

router.post('/verifyCode', async (req, res) => {
  const { username, code } = req.body;

  try {
    const formCode = await userService.verificationCode(username, code);
    res.status(200).json({ message: 'Codigo cargado exitosamenmte', formCode});
  } catch (error) {
    res.status(error.statusCode).json({ message: error.response});
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const formLogin = await userService.login(username, password);

    res.cookie('sessionToken',formLogin.accessToken,{
      httpOnly:true,
      secure:true,
      sameSite:'strict'
    })
    res.status(200).json({ message: `Login existoso, bienvenido:${username}`});
  } catch (error) {
    res.status(error.statusCode).json({ message: error.response});
  }
});

module.exports = router;