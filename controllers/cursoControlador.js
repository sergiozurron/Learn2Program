const CursoServicio = require("../services/CursoServicio");

exports.getCourse = async (req, res) => {
    try {
        // Llamamos a la capa de servicio y cargamos el resultado en el .ejs
        // El estado de la respuesta será, por defecto, 200 (Ok)
        const curso = await CursoServicio.getCourseById(req.params.idCurso);
        res.render("ver-teoria-curso", { curso: curso });
    } catch (error) {
        // Si la llamada al servicio falla devolvemos una respuesta con estado
        // 404 (Not Found)
        // También se podria devolver un .ejs que informe de que no existe el
        // recurso
        res.status(404)
        res.send(error.message);
    }
}