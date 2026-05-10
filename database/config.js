let mysql = require("mysql2");

let conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "projetoIndividual"
});

module.exports = conexao;