let express = require("express");
let router = express.Router();

let conexao = require("../src/database/config");

router.post("/login", (req, res) => {
    let email = req.body.email;
    let senha = req.body.senha;

    let sql = `
    SELECT * FROM usuario 
    WHERE email = ? ADN senha = ?
    `;

    conexao.query(sql,
        [email, senha],
        (erro, resultado) => {
            if(erro){
                res.status(500).send(erro);
            }else {
                if(resultado.length > 0){
                    res.jason(resultado[0]);
                }else {
                    res.status(403).send("Login inválido");
                }

            }
        }
    );
});

module.exports = router;