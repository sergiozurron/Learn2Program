// Importar dependencias
const express = require('express');
const sql = require('mysql');
const path = require('path');
const pool = require('./database');

const app = express();
const port = 3000; // Cambiarlo al puerto 80 para subirlo al servidor y 3000 para correrlo en local

// Configuración para que el servidor sepa redirigir correctamente a las plantillas
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {  

  const query = 'SELECT * FROM TeoriaCursos';

  pool.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error al obtener los datos: ' + err.message);
      return;
    }
    res.render('cursos', { cursos: results });
  });
});

// Iniciar el servidor en el puerto 80
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});