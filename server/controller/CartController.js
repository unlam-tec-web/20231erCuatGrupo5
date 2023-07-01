const express = require("express");
const router = express.Router();
const service = require('../service/carrito_service.js');

router.post('/pagar', (req, res) => {
    const CompraRequest = req.body;
    if (Object.keys(CompraRequest).length === 0){
      return res.status(400).json(
        { titulo: "Error en la petición", mensaje: "No se ha generado la compra", status_code: 400 }
      );
      }
    const total=req.body.total;
    service.pagar(total);
    res.status(200).json({
      titulo: "Compra terminada",
      mensaje: "Mensaje de finalizacion de compra",
      status_code: 200,
      total: total
    });
  });

module.exports = router;
