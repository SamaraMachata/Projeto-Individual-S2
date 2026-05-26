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
            plugins: {
                legend: {
                    labels: {
                        color: 'white',
                        font: {
                            size: 14
                        }
                    }
                }
            },
            scales:{
                x: {
                    ticks: {
                        color: 'white',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },

                    grid: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                },
                y: {
                    beginAtZero: true,

                    ticks: {
                        color: 'white',
                        font: {
                            size: 14
                        }
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.1)'
                    }
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

    .then(function(dados){
        console.log(dados);
        console.log(dados[0]);

        if(dados && dados.length > 0){
            kpiMedia.innerHTML = dados[0].personagem;
        }else{
            kpiMedia.innerHTML = `Ainda não há mais votados`
        }
    })

    .catch(function(erro){
        console.log(erro);
    });



