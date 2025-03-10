// Importar dependencias
const express = require('express');
const sql = require('mysql');
const path = require('path');
const pool = require('./database/connection');

const app = express();
const port = 3000;

// Configuración para que el servidor sepa redirigir correctamente a las plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// sirve para que en tiempo de ejecución el servidor sepa acceder a la carpeta public para imagenes, etc
app.use(express.static(path.join(__dirname, 'public')));


// Ruta principal (de momento se quedará así para la primera historia de usuario)
app.get('/', (req, res) => {
  const query = 'SELECT * FROM TeoriaCursos';
  pool.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error al obtener los datos: ' + err.message);
      return;
    }
    res.render('ver_teoria_curso', { cursos: results });
  });
});

// Iniciar el servidor en el puerto
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
