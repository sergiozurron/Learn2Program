require("dotenv").config();
const express = require("express");
const routes = require("./routes/cursoRutas");
const sequelize = require("./database/connection")
const path = require("path");
const app = express();

const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use("/", routes);

app.use(express.static("public"));

// Sincronizamos el modelo
// Force crea las tablas de nuevo. De esta forma, si se cambia el modelo, no
// hay que actualizar a mano la BD
// En produccion habria que quitar force, no queremos perder los datos de la BD...
sequelize.sync({ force: true })
    .then(() => {
        console.log("✅ Database synced successfully!");
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Error syncing database:", err);
    });

module.exports = app;