let express = require("express");
let router = express.Router();

let conexao = require("../database/config");

//SAVE DO RANKING

router.post("/salvar", (req, res) => {
    let pontos = req.body.pontos;
    let qtdAcertos = req.body.qtdAcertos;
    let fk_usuario = req.body.fk_usuario;

    let sql = `INSERT INTO ranking (pontos, qtdAcertos, fk_usuario) VALUES (?, ?, ?)`;

    conexao.query(sql,
        [pontos, qtdAcertos, fk_usuario],

        function(erro){
            if(erro){
                res.status(500).send(erro);

            }else {
                res.send("Ranking salvo!");

            }
        }
    );
});

//LISTANDO RANKING

router.get("/listar", (req, res) => {
    let sql = `SELECT
    usuario.nomeCompleto,
    ranking.pontos,
    ranking.qtdAcertos

    FROM ranking
    JOIN usuario 
    ON ranking.fk_usuario = usuario.idUsuario
    ORDER BY pontos DESC
    `;

    conexao.query(sql,
        function(erro, resultado){
         if(erro){
            res.status(500).send(erro);

         }else {
            res.json(resultado);

         }
        }
    );
});

module.exports = router;