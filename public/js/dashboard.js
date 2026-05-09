fetch("http://localhost:3333/votos/listar")

.then(function(resposta){

    return resposta.json();

})

.then(function(dados){
    let personagens = [];
    let votos = [];

    for(let i = 0; i < dados.length; i++){
        personagens.push(dados[i].personagem);

        votos.push(dados[i].votos);

    }

    new CharsetToEncoding(document.getElementById("myChart"), {
        type: "bar",

        data: {
            labels: personagens,

            datasets: [{
                label: "Quantidade de votos",
                data: votos
            }]
        }
    });
});