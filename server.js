let express = require("express");
let cors = require("cors");

let app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));


let usuariosRouter = require("./routes/usuarios");

let votosRouter = require("./routes/votos");

let rankingRouter = require("./routes/ranking");

app.use("/usuarios", usuariosRouter);

app.use("/votos", votosRouter);

app.use("/ranking", rankingRouter);

app.listen(3000, () => {

    console.log("Servidor rodando!");

});

