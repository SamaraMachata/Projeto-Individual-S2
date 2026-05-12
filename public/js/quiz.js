let perguntas = [
    {
        pergunta: "Quem é o irmão do Sans?",

        alternativas: [
            "Papyrus",
            "Flowey",
            "Asgore",
            "Frisk"
        ],

        correta: "Papyrus"
    },

    {
        pergunta: "Quem é o rei do subterrâneo?",

        alternativas: [
            "Sans",
            "Toriel",
            "Asgore",
            "Metatton"
        ],

        correta: "Asgore"

    },

    {
        pergunta: "Quem criou Undertale?",

        alternativas: [
            "Nintendo",
            "Toby Fox",
            "Sakurai",
            "Scott Cawthon"
        ],

        correta: "Toby Fox"

    },

    {
        pergunta: "Qual humano é controlado pelo jogador durante a maior parte de undertale?",

        alternativas: [
           "Chara",
           "Kris",
           "Frisk",
           "Asriel"
        ],

        correta: "Frisk"
    }
];

let indiceAtual = 0;
let pontos = 0;
let acertos = 0;

function iniciarQuiz(){
    quiz.style.display = "block";
    mostrarPergunta();

}

function mostrarPergunta(){
    let perguntaAtual = perguntas[indiceAtual];

    pergunta.innerHTML = perguntaAtual.pergunta;
    alternativas.innerHTML = ``;

    for(let i = 0; i < perguntaAtual.alternativas.length; i++){
        alternativas.innerHTML += `
        <input type="radio" name="resposta" value="${perguntaAtual.alternativas[i]}">
        ${perguntaAtual.alternativas[i]}
        <br>`;

    }
}

function proximaPergunta(){
    let respostaSelecionada = document.querySelector('input[name="resposta"]:checked');

    if(respostaSelecionada == null){
        alert("Escolha uma alternativa");

        return;
    }

    let resposta = respostaSelecionada.value;

    if(resposta == perguntas[indiceAtual].correta){
        pontos += 10;
        acertos++;
    }

    indiceAtual ++;

    if(indiceAtual < perguntas.length){
        mostrarPergunta();

    }else{
        finalizarQuiz();
    }
}

function finalizarQuiz(){
    quiz.style.display = "none";

    resultado.innerHTML = `
    Você acertou ${acertos} perguntas!
    <br>
    Pontuação: ${pontos}`;

    salvarRanking();

}

function salvarRanking(){
    fetch("http://localhost:3000/ranking/salvar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        
        body: JSON.stringify({
            pontos: pontos,
            qtdAcertos: acertos,
            fk_usuario: sessionStorage.ID_USUARIO
        })
    })

    .then(function(resposta){
        console.log("Ranking salvo!");

    })
}

buscarRanking();

function buscarRanking(){
    fetch("http://localhost:3000/ranking/top5")
    
    .then(function(resposta){
        return resposta.json();
    })

    .then(function(dados){
        console.log(dados);

        ranking.innerHTML = ``;
        rankingFinal.innerHTML = ``;

        let nomes = [];
        let pontosGrafico = [];

        for(let i = 0; i < dados.length; i++){
          let medalha = ``;

            if(i == 0){
                medalha = `🥇`;
            }else if (i == 1){
                medalha = `🥈`;
            }else if(i == 2){
                medalha = `🥉`;
            }

            let card = `
            <div class="cardRanking">
            <h2>
            ${medalha} ${i + 1} º Lugar
            </h2>
            <p>
            ${dados[i].nomeCompleto}
            </p>
            <p>
            ${dados[i].pontos} pontos
            </p>
            </div>`;

            ranking.innerHTML += card;

            rankingFinal.innerHMTL += card;

            nomes.push(dados[i].pontos);
        }
    
        criarGrafico(nomes, pontosGrafico);
    });
}

function criarGrafico(nomes, pontosGrafico){
    new Chart(graficoRanking, {
        type: bar
    })
}