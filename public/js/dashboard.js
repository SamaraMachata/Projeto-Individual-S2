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


    fetch("http://localhost:3000/dashboard/usuarios")

    .then(res => res.json())

    .then(dados => {
        kpiUsuarios.innerHTML = dados[0].totalUsuarios;
    });


    fetch("http://localhost:3000/dashboard/quiz")

    .then(res => res.json())

    .then(dados => {
        kpiQuiz.innerHTML = dados[0].totalQuiz;
    });

    
    fetch("http://localhost:3000/dashboard/top1")

    .then(function(resposta){
        return resposta.json();
    })

    .then(function(dados){
        if(dados.length > 0){
            kpiTop1.innerHTML = dados[0].nomeCompleto;
        }else{
            kpiTop1.innerHRML = `Sem Ranking`;
        }
    });


    fetch("http://localhost:3000/dashboard/media")

    .then(res => res.json())

    .then(dados => {
        kpiMedia.innerHTML = Number(dados[0].media).toFixed(1);
    });



