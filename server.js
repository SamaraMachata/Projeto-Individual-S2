let express = require("express");
let cors = require("cors");

let app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

//app.get("/", function(req, res){
//    res.sendFile(__dirname + "/public/login.html");
//
//});
//
//app.listen(3000, function(){
//    convertProcessSignalToExitCode.log("Servidor Rodando!");
//});



let usuariosRouter = require("./public/routes/usuarios");

let votosRouter = require("./public/routes/votos");

app.use("/usuarios", usuariosRouter);

app.use("/votos", votosRouter);

app.listen(3000, () => {

    console.log("Servidor rodando!");

});

