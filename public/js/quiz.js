
let inicio = document.getElementById("inicio");

let quiz = document.getElementById("quiz");

let fim = document.getElementById("fim");

let pergunta = document.getElementById("pergunta");

let alternativas = document.getElementById("alternativas");

let resultado = document.getElementById("resultado");

let ranking = document.getElementById("ranking");

let img = document.getElementById("img");

let rankingFinal = document.getElementById("rankingFinal");

let perguntas = [
    {
        pergunta: "1- Quem é o irmão do Sans?",

        alternativas: [
            "Papyrus",
            "Flowey",
            "Asgore",
            "Frisk"
        ],

        correta: "Papyrus"
    },

    {
        pergunta: "2- Quem é o rei do subterrâneo?",

        alternativas: [
            "Sans",
            "Toriel",
            "Asgore",
            "Metatton"
        ],

        correta: "Asgore"

    },

    {
        pergunta: "3- Quem criou Undertale?",

        alternativas: [
            "Nintendo",
            "Toby Fox",
            "Sakurai",
            "Scott Cawthon"
        ],

        correta: "Toby Fox"

    },

    {
        pergunta: "4- Qual humano é controlado pelo jogador durante a maior parte de undertale?",

        alternativas: [
           "Chara",
           "Kris",
           "Frisk",
           "Asriel"
        ],

        correta: "Frisk"
    },
    {
        pergunta: "5- Qual personagem é a capitã da guarda real?",

        alternativas: [
            "Undyne",
            "Alphys",
            "Toriel",
            "Muffet"
        ],

        correta: "Undyne"
    },
    {
        pergunta: "6- Qual é o nome da flor que aparece no inicio do jogo?",

        alternativas: [
            "Asriel",
            "Flowey",
            "Temmie",
            "Napstablook"
        ],
        correta: "Flowey"
    },
    {
        pergunta: "7- Qual personagem ama cozinhar e fazer quebra-cabeças?",

        alternativas: [
            "Undyne",
            "Toriel",
            "Papyrus",
            "Asgore"
        ],
        correta: "Papyrus"
    },
    {
        pergunta: "8- Quem é o robô apresentador de TV?",

        alternativas: [
            "Napstablook",
            "Muffet",
            "Mad Mew Mew",
            "Mettaton"
        ],
        correta: "Mettaton"
    },
    {
        pergunta: "9- Qual rota acontece quando o jogador elimina todos os monstros?",

        alternativas: [
            "Pacifista",
            "Neutra",
            "Genocida",
            "Verdadeira"
        ],
        correta: "Genocida"
    },
    {
        pergunta: "10- Qual personagem ama anime?",
        alternativas: [
            "Alphys",
            "Toriel",
            "Muffet",
            "Undyne"
        ],

        correta: "Alphys"
    },
    {
        pergunta: "11- O que representa a alma vermelha do protagonista?",
        alternativas: [
            "Justiça",
            "Coragem",
            "Determinação",
            "Bondade"
        ],

        correta: "Determinação"
    }, 
    {
        pergunta: "12- Qual personagem fala quase sempre em letras maiúsculas?",
        alternativas: [
            "Sans",
            "Flowey",
            "Asriel",
            "Papyrus"
        ],

        correta: "Papyrus"
    }, 
    {
        pergunta: "13- Qual personagem gosta muito de trocadilhos?",
        alternativas: [
            "Muffet",
            "Napstablook",
            "Sans",
            "Temmie"
        ],

        correta: "Sans"
    }, 
    {
        pergunta: "14- Qual personagem é um fantasma tímido e triste?",
        alternativas: [
            "Napstablook",
            "Mettaton",
            "Asriel",
            "Temmie"
        ],

        correta: "Napstablook"
    }, 
    {
        pergunta: "15- Qual o nome da música tema do Sans?",
        alternativas: [
            "Hopes and Dreams",
            "Bonetrousle",
            "Spider Dance",
            "Megalovania"
        ],

        correta: "Megalovania"
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




