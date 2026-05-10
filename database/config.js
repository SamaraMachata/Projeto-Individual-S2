let mysql = require("mysql2");

let conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Cm280189",
    database: "projetoIndividual"
});

module.exports = conexao;