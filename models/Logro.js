const { DataTypes } = require('sequelize');
const db = require('./index')

const Logro = db.sequelize.define("Logro", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mensajeMotivacionalCursoOK: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    mensajeMotivacionalCursoKO: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: "logro",
    timestamps: false
});

module.exports = Logro;