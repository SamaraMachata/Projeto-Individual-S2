function votar(personagem){
 let idUsuario = sessionStorage.ID_USUARIO;

 fetch("http://localhost:3333/votos/cadastrar", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        personagem: personagem,
        fk_usuario: idUsuario
    })
 })

 .then(function(resposta){
    if(resposta.ok){
        return resposta.text();

    }else{
        throw "Erro ao votar";

    }
 })

 .then(function(resultado){
    div_mensagem.innerHTML = `Voto realizado!`;

 })

 .catch(function(erro){
    console.log(erro);
 });

}