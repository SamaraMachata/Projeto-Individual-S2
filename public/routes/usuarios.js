//ROTA LOGIN
let express = require("express");
let router = express.Router();

let conexao = require("../src/database/config");

router.post("/login", (req, res) => {
    let email = req.body.email;
    let senha = req.body.senha;

    let sql = `
    SELECT * FROM usuario 
    WHERE email = ? AND senha = ?
    `;

    conexao.query(sql,
        [email, senha],
        (erro, resultado) => {
            if(erro){
                res.status(500).send(erro);
            }else {
                if(resultado.length > 0){
                    res.json(resultado[0]);
                }else {
                    res.status(403).send("Login inválido");
                }

            }
        }
    );
});


//ROTA CADASTRO
router.post("/cadastrar", (req, res) => {
    
    let nome = req.body.nome;
    
    let email = req.body.email;

    let senha = req.body.senha;
    
    let sql = `INSERT INTO usuario (nomeCompleto, email, senha) VALUES (?,?,?)`;
    
conexao.query(sql, 
    [nome, email, senha],

    function(erro){
        if(erro){
            res.status(500).send(erro);
            
        }else {
            res.send("Cadastro realizado!");

        }
    }
);
});

module.exports = router;