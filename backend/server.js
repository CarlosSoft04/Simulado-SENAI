const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Opções de conexão com o MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'simulado'
});

// Tenta conectar ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conexão com o MySQL estabelecida com sucesso.');
});

const app = express();
app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});

// Usando o middleware CORS
app.use(cors());

// Rota raiz (verificando a conexão)
app.get("/", (req, res) => {
    connection.query("SELECT COUNT(*) AS usuarios FROM usuarios", (err, results) => {
        if (err) {
            res.status(500).send('Erro ao consultar o banco de dados');
        } else {
            res.send(`Número de usuários: ${results[0].usuarios}`);
        }
    });
});

// Rota para buscar usuário pelo ID
app.get("/user/:id", (req, res) => {
    connection.query("SELECT * FROM usuarios WHERE id_usuario = ?", [req.params.id], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao consultar o banco de dados');
        } else if (results.length === 0) {
            res.status(404).send('Usuário não encontrado');
        } else {
            res.json(results[0]); // Retorna apenas o primeiro usuário encontrado
        }
    });
})
