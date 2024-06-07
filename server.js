const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const path = require("path");

// Aplicación de backend:
const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos:
const db = mysql.createConnection(
{
    host: "localhost",
    user: "usuario",
    password: "contraseña",
    database: "basededatos"
});
db.connect((err) =>
{
    if (err) {
        throw err;
    }
    console.log("Conectado al MySQL ;3");
});

// Middleware:
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Endpoint para guardar el comentario:
app.post("/guardar_comentario", (req, res) =>
{
    const comentario = req.body.comentario;
    const sql = "INSERT INTO comentarios (comentario) VALUES (?)";
    db.query(sql, [comentario], (err, result) =>
    {
        if (err)
        {
            console.error(err);
            res.status(500).send("Error al guardar el comentario ;:T");
        }
        else
        {
            res.send("Comentario guardado correctamente ;:T");
        }
    });
});

// Servir el archivo HTML:
app.get("/", (req, res) =>
{
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () =>
{
    console.log(`Servidor escuchando en http://localhost:${port}`);
});