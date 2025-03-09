
const mysql = require('mysql');

// Configuración del pool de conexiones
const pool = mysql.createPool({
    host: "68.221.168.158",    
    user: "agilemasters",         
    password: "AgileMasters_",        
    database: "learn2program"
});

module.exports = pool;
