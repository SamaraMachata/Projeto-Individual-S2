let express = require("express");

let router = express.Router();

let conexao = require("../database/config");

router.get("/usuarios", (re, res) => {
    let sql = `
    SELECT COUNT(idUsuario) AS totalUsuarios 
    FROM usuario
    `;

    conexao.query(sql,
        function(erro, resultado){
            if(erro){
                res.status(500).send(erro);
            }else{
                res.json(resultado);
            }
        }
    );
});

router.get("/quiz", (req, res) => {
    let sql = `
    SELECT COUNT(idRanking) AS totalQuiz
    FROM ranking
    `;

    conexao.query(sql,
        function(erro, resultado){
            if(erro){
                res.status(500).send(erro);
            }else{
                res.json(resultado);
            }
        }
    );
});

router.get("/top1", (req, res) => {
    let sql = `
    SELECT usuario.nomeCompleto,
    ranking.pontos
    FROM ranking
    JOIN usuario
    ON ranking.fk_usuario = usuario.idUsuario
    ORDER BY ranking.pontos DESC
    LIMIT 1
    `;

    conexao.query(sql,
        function(erro, resultado){
            if(erro){
                res.status(500).send(erro);
            }else{
                res.json(resultado);
            }
        }
    );
});

router.get("/media", (req, res)=> {
    let sql = `
    SELECT personagem
    FROM voto ORDER BY qtdVotos DESC LIMIT 1;
    `;

    conexao.query(sql,
        function(erro, resultado){
            if(erro){
                res.status(500).send(erro);
            }else{
                res.json(resultado);
            }
        }
    );
});

module.exports = router;