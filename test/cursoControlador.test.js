// Pruebas de unidad sobre el controlador de cursos
// Debemos simular las llamadas los métodos de las
// dependencias (la capa de servicio)

const CursoServicio = require("../services/CursoServicio");
const { getCourse } = require("../controllers/cursoControlador");

jest.mock("../services/CursoServicio");

describe("CursoController.getCourse", () => {
    let req, res;

    beforeEach(() => {
        req = { params: { idCurso: "1" } };
        res = {
            render: jest.fn(),
            status: jest.fn(),
            send: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Comprobamos que la llamada a la funcion del controlador sigue el camino
    // del try cuando getCourseById devuelve un curso (cuando no lanza una
    // excepcion/error)
    test("deberia cargar ver-teoria-curso cuando se encuentre el curso", async () => {
        // ## Given ##
        const cursoEsperado = { id: 1, nombre: "Curso de Node.js" };
        // Indicamos el valor que deberá devolverse cuando se simule
        // la llamada a getCourseById
        CursoServicio.getCourseById.mockResolvedValue(cursoEsperado);

        // ## When ##
        await getCourse(req, res);

        // ## Then ##
        expect(CursoServicio.getCourseById).toHaveBeenCalledWith(req.params.idCurso);
        expect(res.render).toHaveBeenCalledWith("ver-teoria-curso", { curso: cursoEsperado });
    });

    // Comprobamos que la llamada a la funcion del controlador sigue el camino
    // del catch cuando getCourseById lanza una excepcion
    test("deberia cargar la pagina de error cuando no se encuentre el curso", async () => {
        // ## Given ##
        const error = new Error("Curso no encontrado");
        CursoServicio.getCourseById.mockRejectedValue(error);

        // ## When ##
        await getCourse(req, res);
        
        // ## Then ##
        expect(CursoServicio.getCourseById).toHaveBeenCalledWith(req.params.idCurso);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith(error.message);
        expect(res.render).not.toHaveBeenCalled();
    });
});
