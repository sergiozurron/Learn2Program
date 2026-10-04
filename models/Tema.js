const DataTypes = require("sequelize");
const db = require("./index");

const Tema = db.sequelize.define("Tema", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contenido: {
        type: DataTypes.TEXT
    },
    idCurso: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        tableName: "temas",
        timestamps: false
    }
);

module.exports = Tema;