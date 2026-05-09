let express = require("express");
let cors = require("cors");

let app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

let usuariosRouter = require("./public/src/routes/usuarios");
let votosRouter = require("./public/src/routes/votos");

app.use("/usuarios", usuariosRouter);
app.use("/votos", votosRouter);

app.listen(3000, () => {
    convertProcessSignalToExitCode.log("Servidor rodando!");
});
