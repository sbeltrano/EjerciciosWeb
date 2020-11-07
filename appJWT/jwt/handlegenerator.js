let jwt = require("jsonwebtoken");
let config = require("./config");
var express = require("express");
var router = express.Router();
const Joi = require("joi");
var [insertUser] = require("./controllers/users");

// Clase encargada de la creación del token
class HandlerGenerator {
  login(req, res) {
    // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.role;
    console.log(role);

    // Si se especifico un usuario y contraseña, proceda con la validación
    // de lo contrario, un mensaje de error es retornado
    if (username && password && role) {
      // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas

      let token = jwt.sign({ username: username }, config.secret, {
        expiresIn: "24h",
      });

      // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
      res.json({
        success: true,
        message: "Authentication successful!",
        token: token,
      });
    } else {
      res.render("index", { title: "Express" });
      // El error 400 corresponde a Bad Request de acuerdo al estándar HTTP
      res.send(400).json({
        success: false,
        message: "Authentication failed! Please check the request",
      });
    }
  }

  index(req, res) {
    // Retorna una respuesta exitosa con previa validación del token
    res.json({
      success: true,
      message: "Index page",
    });
  }
}

module.exports = HandlerGenerator;
