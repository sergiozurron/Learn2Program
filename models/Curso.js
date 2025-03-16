const DataTypes = require("sequelize");
const sequelize = require("../database/connection"); // Import Sequelize instance
const Topic = require("./Tema");

const Course = sequelize.define("Curso", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    enRevision: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},
    {
        tableName: "cursos",
        timestamps: false
    }
);

// Relacion 1:N con temas
Course.hasMany(Topic, { as: "temas", foreignKey: "idCurso", onDelete: "CASCADE" });

module.exports = Course;