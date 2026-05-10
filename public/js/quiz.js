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

    let resposta = respostaSelecionada.ariaValueMax;

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