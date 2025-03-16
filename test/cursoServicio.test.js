const CursoServicio = require("../services/CursoServicio")
const Curso = require("../models/Curso");
const Tema = require("../models/Tema");

jest.mock("../models/Curso", () => ({ // Resetea los mocks
    findOne: jest.fn()
}));

jest.mock("../models/Tema", () => ({})); // Resetea los mocks

// Definimos el contexto del metodo que queremos probar
// En este caso, CursoServicio.getCourseById
describe("CursoServicio.getCourseById", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("deberia devolver el curso y sus temas cuando se encuentre el curso", async () => {
        // ## Given ##
        // Inicializamos los valores que esperamos obtener al llamar al metodo findOne
        const cursoEsperado = {
            id: 1,
            nombre: "Curso de Node.js",
            temas: [{ id: 1, nombre: "Introducción a Node.js" }]
        };
        // Indicamos como se simulara la llamada a findByPk
        Curso.findOne.mockResolvedValue(cursoEsperado);

         // ## When ##
        // Llamamos a la función que estamos probando
        // Ahora, cursoObtenido contiene el valor obtenido
        const cursoObtenido = await CursoServicio.getCourseById(cursoEsperado.id);

        // ## Then ##
        // Comprobamos que los valores esperados son iguales a los valores obtenidos
        expect(cursoObtenido).toEqual(cursoEsperado);
        expect(Curso.findOne).toHaveBeenCalledWith({
            where: { id: cursoEsperado.id },
            include: [{ model: Tema, as: "temas" }]
        });
    });

    test("deberia lanzar una excepcion cuando el id no se corresponda con ningun curso", async () => {
        // ## Given ## 
        const id = 99;
        Curso.findOne.mockResolvedValue(null);

        // ## When ##
        await expect(CursoServicio.getCourseById(id)).rejects.toThrow(`No se ha podido encontrar el curso con id ${id}`);

        // ## Then ##
        expect(Curso.findOne).toHaveBeenCalledWith({
            where: { id: id },
            include: [{ model: Tema, as: "temas" }]
        });
    });
});
