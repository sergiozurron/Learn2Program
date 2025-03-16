// Pruebas de unidad
require('dotenv').config();
const request = require('supertest');
const app = require('../app');

// Mock para el pool
jest.mock('../database/connection', () => ({
    query: jest.fn(), // Mock the query function
}));
const pool = require('../database/connection');


describe('GET /', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Reinicia los 'mocks' después de cada test
    });

    it('debera devolver 200 cuando los datos se obtengan exitosamente', async () => {
        // ## Given ##
        // Mock the first query (SELECT * FROM Cursos)
        const cursos = [{ id: 1, name: 'Test Curso' }];
        const temas = [{ id: 1, idCurso: 1, title: 'Test Tema' }];

        pool.query
            .mockImplementationOnce((query, callback) => {
                callback(null, cursos); // Simula una consulta exitosa a la tabla de cursos
            })
            .mockImplementationOnce((query, params, callback) => {
                callback(null, temas); // Simula una consulta exitosa a la tabla de cursos
            });

        // ## When ##
        // Envia la peticion y almacena la respuesta
        const response = await request(app).get('/');

        // ## Then ##
        // Comprueba que el estado de la respuesta coincide con el esperado
        expect(response.status).toBe(200);
        // Comprueba que se hayan realizado dos consultas
        expect(pool.query).toHaveBeenCalledTimes(2);
        // Comprueba que las consultas se han realizado con los datos esperados
        expect(pool.query).toHaveBeenCalledWith('SELECT * FROM Cursos', expect.any(Function));
        expect(pool.query).toHaveBeenCalledWith('SELECT * FROM Temas WHERE idCurso = ?', [1], expect.any(Function));
    });

    it('deberia devolver 500 cuando falla la consulta de cursos', async () => {
        // ## Given ##
        // Simulamos error en la primera consulta
        pool.query.mockImplementationOnce((query, callback) => {
            callback(new Error('Database error'), null); // Simulate error
        });

        // ## When ##
        // Envia la peticion y almacena la respuesta
        const response = await request(app).get('/');

        // ## Then ##
        // Comprueba que el estado de la respuesta coincide con el esperado
        expect(response.status).toBe(500);
        // Comprueba que la respuesta contiene el texto esperado
        expect(response.text).toContain('Error al obtener los datos');
        // Comprueba que, solamente, se haya realizado un consulta
        expect(pool.query).toHaveBeenCalledTimes(1);
    });

    it('deberia devolver 500 cuando falla la consulta de temas', async () => {
        // ## Given ##
        const cursos = [{ id: 1, name: 'Test Curso' }];
        pool.query
            .mockImplementationOnce((query, callback) => {
                callback(null, cursos); // Simula consulta exitosa sobre cursos
            })
            .mockImplementationOnce((query, params, callback) => {
                callback(new Error('Temas error'), null); // Simula consulta sobre temas que devuelve error
            });

        // ## When ##
        const response = await request(app).get('/');

        // ## Then ##
        expect(response.status).toBe(500); // Check if the response is 500
        expect(response.text).toContain('Error al obtener los temas'); // Check error message
        expect(pool.query).toHaveBeenCalledTimes(2); // Both queries were called
    });
});