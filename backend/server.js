const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// Conexão com o MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "simulado",
});

const app = new express();
app.listen(3000, () => {
  console.log("Servidor iniciado.");
});

app.use(cors());
app.use(express.json());

// Rota para obter o nome do usuário
app.get("/user/:id", (req, res) => {
  connection.query(
    "SELECT id_usuario, nome, email FROM usuarios WHERE id_usuario = ?",
    [req.params.id],
    (err, results) => {
      if (err) {
        res.send("MySQL connection error.");
      }
      res.json(results);
    }
  );
});

// Rota para obter as tarefas do usuário
app.get("/user/:id/tasks", (req, res) => {
  connection.query(
    "SELECT * FROM chamados WHERE usuario_id = ?",
    [req.params.id],
    (err, results) => {
      if (err) {
        res.send("MySQL connection error.");
      }
      res.json(results);
    }
  );
});

// Rota para atualizar o status de uma tarefa
app.post("/user/tasks/update_status/", (req, res) => {
  connection.query(
    "UPDATE chamados SET status = ?, data_cadastro = NOW() WHERE id_chamados = ?",
    [req.body.status, req.body.id_chamados],
    (err, results) => {
      if (err) {
        res.send("MySQL connection error.");
      }
      res.json("ok");
    }
  );
});

// Rota para criar uma nova tarefa
app.post("/user/tasks/new_task/", (req, res) => {
  const { descricao, usuario_id } = req.body;  // Recebe descricao e usuario_id do corpo da requisição

  // Verificar se a descrição e o id do usuário estão presentes
  if (!descricao || !usuario_id) {
    return res.status(400).json({ message: "Dados faltando." });
  }

  // Insere uma nova tarefa no banco de dados
  connection.query(
    "INSERT INTO chamados (descricao, setor, usuario_id, status) VALUES (?, 'Geral', ?, 'a fazer')",  // 'Geral' como setor padrão e 'a fazer' como status padrão
    [descricao, usuario_id],  // descricao e usuario_id serão inseridos nas respectivas colunas
    (err, results) => {
      if (err) {
        return res.status(500).send("MySQL connection error.");
      }
      res.json({ message: "Tarefa criada com sucesso!" });
    }
  );
});