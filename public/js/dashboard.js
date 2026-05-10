console.log("dash carregou!");

fetch("http://localhost:3000/votos/listar")

.then(function(resposta){
    console.log("resposta recebida");
    return resposta.json();

})

.then(function(dados){
    console.log(dados);
    let personagens = [];
    let votos = [];

    for(let i = 0; i < dados.length; i++){
        personagens.push(dados[i].personagem);

        votos.push(dados[i].qtdVotos);

    }
    console.log(personagens);
    console.log(votos);
    
    let ctx = document.getElementById("grafico");

    new Chart(ctx,{
        type: "bar",

        data: {
            labels: personagens,

            datasets: [{
                label: "Quantidade de votos",
                data: votos,
                borderWidth: 1,
                backgroundColor: [
                  '#E100FF'
        ]
            }]
        },
        options: {
            responsive: true,
            scales:{
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    })

    .catch(function(erro){
        console.log("ERRO", erro);
    });

