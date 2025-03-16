// Pruebas de integracion sobre el controlador de cursos
// Enviamos peticiones HTTP a la API para probar

const request = require("supertest"); // Metodo que usaremos para enviar peticiones
const app = require("../app");
const sequelize = require("../database/connection");
const Curso = require("../models/Curso")
const Tema = require("../models/Tema")

describe("GET /curso/:idCurso (Prueba de integracion)", () => {

    const curso = {
        id: 10,
        nombre: "Curso de Node.js",
        enRevision: false,
        temas: [
            {
                id: 1,
                titulo: "Introduccion a Node.js",
                contenido: "si",
                idCurso: 1
            }
        ]
    };

    beforeAll(async () => {
        await sequelize.sync({ force: true });

        // Inserta datos de prueba
        await Curso.create(
            curso,
            {
                include: [{ model: Tema, as: "temas" }]
            }
        );
    });

    afterAll(async () => {
        await Curso.destroy({
            where: {
                id: curso.id
            }
        })
        await sequelize.close();
    });

    test("deberia devolver Ok cuando se encuentre el curso", async () => {
        // ## When ##
        // Enviamos la peticion: GET /cursos/:idCurso
        const response = await request(app).get(`/cursos/${curso.id}`);

        // ## Then ##
        // Comprobamos que el estado de la respuesta coincide con el esperado (Ok)
        expect(response.status).toBe(200);
        // Comprobamos que los valores de los campos de curso
        // aparecen en la pagina devuelta (ver-teoria-curso)
        expect(response.text).toContain(curso.nombre)
        expect(response.text).toContain(curso.temas[0].titulo)
        expect(response.text).toContain(curso.temas[0].contenido)
    });

    test("deberia devolver Not Found cuando no se encuentre el curso", async () => {
        // ## Given ##
        const id = 99;

        // ## When ##
        const response = await request(app).get(`/cursos/${id}`);

        // ## Then ##
        expect(response.status).toBe(404);
    });
});
