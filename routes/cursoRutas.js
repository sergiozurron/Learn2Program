const express = require("express");
const router = express.Router();
const cursoControlador = require("../controllers/cursoControlador");

router.get("/cursos/:idCurso", cursoControlador.getCourse);

module.exports = router;