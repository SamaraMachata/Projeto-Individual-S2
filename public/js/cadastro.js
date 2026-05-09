function cadastrar(){
    let nome = input_nome.value;
    let email = input_email.value;
    let senha = input_senha.value;

    if(nome == `` || email == `` || senha == ``){
        div_mensagem.innerHTML = `Preencgha todos os campos!`;
    }else {
        fetch("http://localhost:3000/usuarios/cadastrar",{
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha
            })
        })

        .then(function(resposta){
            return resposta.text();
        })
        .then(function(resultadoi){
            div_mensagem.innerHTML = `Cadastro realizado!`;

            setTimeout(function(){
                window.location = "login.html";
            }, 1000);
        });
    }
}