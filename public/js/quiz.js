
let inicio = document.getElementById("inicio");

let quiz = document.getElementById("quiz");

let fim = document.getElementById("fim");

let pergunta = document.getElementById("pergunta");

let alternativas = document.getElementById("alternativas");

let resultado = document.getElementById("resultado");

let ranking = document.getElementById("ranking");

let rankingFinal = document.getElementById("rankingFinal");

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
    inicio.style.display = "none";
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
    fim.style.display = "block";

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

        buscarRanking();
    })
}


function buscarRanking(){
    fetch("http://localhost:3000/ranking/listar")
    
    .then(function(resposta){
        return resposta.json();
    })

    .then(function(dados){
        console.log(dados);

        ranking.innerHTML = ``;
        rankingFinal.innerHTML = ``;


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
            <div class="ladoEsquerdo">
            <h1 class="medalha">
            ${medalha}
            </h1>
            </div>
            
            <div class="ladoDireito">
            <h2>
            ${i + 1} Lugar
            </h2>
            <p>
            Jogador: ${dados[i].nomeCompleto}
            </p>
            <p>
            Pontuação:
            ${dados[i].pontos}
            </p>
            </div>
            </div>
            `;

            ranking.innerHTML += card;

            rankingFinal.innerHTML += card;

        }
    
    });
}

