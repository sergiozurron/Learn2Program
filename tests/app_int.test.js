// Usamos la estructura given-when-then para los tests
require('dotenv').config();
const request = require('supertest');
const pool = require('../database/connection');
const app = require('../app')

describe('GET /', () => {

    // ## Given ##
    let curso;

    beforeAll(() => {
        // Cuando el endpoint permita obtener un curso por su id, se podrán
        // insertar filas de prueba en la BD, sin tener que eliminar datos
        // Antes de realizar los tests, iniciamos curso al primer curso,
        // junto con sus temas, que se obtenga de la BD
        const queryCursos = "SELECT * FROM cursos";
        pool.query(queryCursos, (err, cursos) => {
            curso = cursos[0]; // En app.get('/') seleccionamos el primer punto
            const queryTemas = "SELECT * FROM temas WHERE idCurso = ?";
            pool.query(queryTemas, [curso.id], (err, temas) => {
                curso.temas = temas;
            })
        });
    });

    afterAll(() => {
        pool.end();
    });

    // La implementacion actual de app solo seguira un camino controlable:
    it('debera devolver 200 cuando los datos se obtengan exitosamente', async () => {
        // ## When ##
        // Enviamos la peticion y guardamos la respuesta
        const response = await request(app).get('/');

        // ## Then ##
        // Verificamos que el estado de la respuesta coincide con el esperado
        expect(response.status).toBe(200);
        // Verificamos que el cuerpo de la respuesta contiene el curso y los
        // temas cargados en el .ejs
        expect(response.text).toContain(curso.nombre);
        for (let i = 0; i < curso.temas.length; i++) {
            expect(response.text).toContain(curso.temas[i].titulo);
        }
    });
});
