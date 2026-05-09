function ValidarLogin(){
    let email = input_email.value;
    let senha = input_senha.value;

    div_mensagem.innerHTML = ``;

    if(email == `` || senha == ``){

        div_mensagem.innerHTML = `Preencha todos os campos!`;

    }else if(!email.includes("@")){
        div_mensagem.innerHTML = `Flata @ no campo email!`;

    }else if(senha.length < 8){
        div_mensagem.innerHTML = `A senha precisa ter 8 digitos ou mais!`;
    } else {
        fetch("http://localhost:3333/usuarios/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                senha: senha
            })

        })

        .then(function(resposta){
            console.log("STATUS:", resposta.status);

            if(resposta.ok){
                return resposta.json();

            }else {
                throw "Email ou senha inválidos";

            }
        })

        .then(function(dados){
            console.log(dados);

            sessionStorage.ID_USUARIO = dados.idUsuario;
            sessionStorage.NOME_USUARIO = dados.nomeCompleto;

            div_mensagem.innerHTML = `Login realizado com sucesso!`;

            setTimeout(function(){
                window.location = "home2.html";

            }, 1000);

        })

        .catch(function(erro){
            console.log(erro);

            div_mensagem.innerHTML = `Email ou senha Inválidos`;

        });
    }
}