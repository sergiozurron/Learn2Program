
const mysql = require('mysql');

// Configuración del pool de conexiones
const pool = mysql.createPool({
    host: process.env.DBHOST,    
    user: process.env.DBUSER,         
    password: process.env.DBPASSWORD,        
    database: process.env.DBNAME
});

module.exports = pool;
