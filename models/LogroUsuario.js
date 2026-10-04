const { DataTypes } = require('sequelize');
const db = require('./index')

const LogroUsuario = db.sequelize.define('LogroUsuario', {
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  idLogro: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'LogroUsuario',
  timestamps: false
});

module.exports = LogroUsuario;
