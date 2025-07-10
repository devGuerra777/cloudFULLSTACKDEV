const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const app = express();
const fs = require("fs");

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// DB config
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error conectando a la base de datos:", err);
    process.exit(1);
  }
  console.log("✅ Conectado a la base de datos");
});
global.db = db;

// Rutas
require("./routes/main")(app);

// Escucha HTTP normal (Railway pone HTTPS automáticamente)
const PORT = process.env.WEBAPP_SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 App corriendo en puerto ${PORT}`);
  console.log(`🌐 Abre: https://<tu-nombre-de-proyecto>.up.railway.app/home`);
});
