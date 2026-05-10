let express = require("express");
let router = express.Router();

let conexao = require("../database/config");

router.post("/cadastrar", (req, res) => {
    let personagem = req.body.personagem;
    let fk_usuario = req.body.fk_usuario;

    let buscarVoto = `SELECT * FROM voto WHERE personagem = ?`;

    conexao.query(buscarVoto, 
        [personagem],
    function(erro,resultado){
        
        if(erro){
            res.status(500).send(erro);
        }else {
            if(resultado.length == 0){
                res.status(404).send("Personagem não encontrado");

            }else {
                let idVoto = resultado[0].idVoto;
    
                let atualizarVoto = `UPDATE voto SET qtdVotos = qtdVotos + 1 WHERE idVoto = ?`;
    
                conexao.query(atualizarVoto,
                    [idVoto],
                    function(erroUpdate){
                        if(erroUpdate){
                            res.status(500).send(erroUpdate);
    
                        }else{
                            let inserirRegistro = `INSERT INTO registro
                            (fk_usuario, fk_voto)
                            VALUES (?, ?)`;
    
                            conexao.query(inserirRegistro,
                                [fk_usuario, idVoto],
    
                                function(erroRegistro){
                                    if(erroRegistro){
                                        res.status(500).send(erroRegistro);
    
                                    }else {
                                        res.send("Voto registrado!");
                                    }
                                }
                             );
                        }
                    }
                );
            }
            
        }
    });
});
  
//ROTA DA DASHBOARD

router.get("/listar", (req, res) => {

    let sql = `SELECT * FROM voto`;

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
