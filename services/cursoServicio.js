const Curso = require("../models/Curso");
const Tema = require("../models/Tema");

class CursoServicio {

    /**
     * Obtiene el curso correspondiente al id proporcionado
     * junto con sus temas
     */
    static async getCourseById(id) {
        const curso = await Curso.findOne({
            where: { id },
            include: [{ model: Tema, as: "temas" }]
        });
        if (!curso) {
            throw Error(`No se ha podido encontrar el curso con id ${id}`);
        }
        return curso;
    }

}

module.exports = CursoServicio;