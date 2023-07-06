const userService = require('./userService');
const express = require('express');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const user = await userService.registerUser(username, password, email);
    res.status(200).json({ message: 'User registered successfully', usuario : user});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to register user', error });
  }
});

router.post('/verifyCode', async (req, res) => {
  const { username, code } = req.body;

  try {
    const formCode = await userService.verificationCode(username, code);
    res.status(200).json({ message: 'Codigo cargado exitosamenmte', formCode});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Fallo al cargar el codigo', error });
  }
});
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const formLogin = await userService.login(username, password);
    res.status(200).json({ message: `Login existoso, bienvenido:${username}`});
    console.log(`Login existoso, bienvenido: ${username}`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Error al loguear, el error es: ${error}`});
    console.log(`Error al loguear, el error es: ${error}`);
  }
});

module.exports = router;