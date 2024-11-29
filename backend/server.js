const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// opcoes de conexao com o MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'simulado'
});

const app = new express();
app.listen(3000, () => {
    console.log('Servidor iniciado.');
})

app.use(cors());

// rotas
// ----------------------------------------
app.get("/", (req, res) => {
    connection.query("SELECT COUNT(*) usuarios FROM usuarios", (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }
        res.send('MySQL connection OK.');
    })
});

// ----------------------------------------
app.get("/user/:id", (req, res) => {
    connection.query("SELECT id_usuario, nome, email FROM usuarios WHERE id_usuario = ?", [req.params.id], (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }
        res.json(results);
    })
});

// ----------------------------------------
app.get("/user/:id/tasks/", (req, res) => {
    connection.query("SELECT * FROM chamados WHERE usuario_id = ?", [req.params.id], (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }
        res.json(results);
    })
});
 