let express = require("express");
let router = express.Router();

let conexao = require("../public/src/database/config");

router.post("/cadastrar", (req, res) => {
    let personagem = req.body.personagem;
    let fk_usuario = req.body.fk_usuario;

    let sqlVoto = `INSERT INTO voto (personagem, fk_usuario) VALUES (?,?)`;

    conexao.query(sqlVoto, 
        [personagem, fk_usuario],
    function(erro,resultado){
        
        if(erro){
            res.status(500).send(erro);
        }else {
            let idVoto = resultado.insertId;

            let sqlRegistro = `INSERT INTO registro (fk_voto) VALUES (?)`;

            conexao.query(sqlRegistro,
                [idVoto],
                function(erroRegistro){
                    if(erroRegistro){
                        res.status(500).send(erroRegistro);

                    }else{
                        res.status(200).send("Voto registrado!");
                    }
                }
            );
        }
    });
});

router.get("/listar", (req, res) => {
    let sql = `SELECT personagem,
    COUNT(idVoto) AS votos
    FROM voto
    GROUP BY personagem`;

    conexao.query(sql,

        function(erro, resultado){
            if(erro){
            res.status(500).send(erro);
            }else{
                res.status(500).send(resultado);
            }
        }
    );
});

module.exports = router;