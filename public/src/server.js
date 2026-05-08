const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// conexão com seu banco
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sua_senha", // coloca sua senha aqui
    database: "sistema_votacao"
});


// 🔹 ROTA PARA VOTAR
app.post("/votos/votar", (req, res) => {
    const personagem = req.body.personagem;
    const id_usuario = req.body.id_usuario;

    db.query(
        "INSERT INTO voto (personagem, fk_usuario) VALUES (?, ?)",
        [personagem, id_usuario],
        (erro) => {
            if (erro) {
                res.status(500).send("Erro ao votar");
            } else {
                res.send("Voto registrado!");
            }
        }
    );
});


// 🔹 ROTA PARA PEGAR O RANKING
app.get("/votos/ranking", (req, res) => {
    db.query(
        "SELECT personagem, COUNT(*) AS total FROM voto GROUP BY personagem",
        (erro, resultado) => {
            if (erro) {
                res.status(500).send("Erro");
            } else {
                res.json(resultado);
            }
        }
    );
});


app.listen(3000, () => {
    console.log("API rodando em http://localhost:3000");
});