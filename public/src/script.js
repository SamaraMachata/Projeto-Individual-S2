let votosGlobais = JSON.parse(localStorage.getItem("votos")) || [0,0,0,0,0,0,0,0,0,0,0,0,0,0];

function registrarVoto(i){
   let personagens = [
    `Frisk`,`Sans`,`Papyrus`,`Toriel`,`Undyne`,`Asgore`,`Mettaton`,`Alphys`,`Flowey`,`Asriel`,`Napstablook`,`Temmie`,`Mad Mew Mew`,`Muffet`
   ];

   fetch("http://127.0.0.1:3000/votos/votar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      personagem: personagens[i],
      id_usuario: 1 
    })
   })
   .then(() => {
    div_mensagem.innerHTML = "Voto Registrado!";
   });
}

 //DASH
function renderizarGrafico(){
  fetch("http//127.0.0.1:3000/votos/ranking")
    .then(function (resposta){
      return resposta.json();
    })
    .then(function (dados){

      let labels = [];
      let valores = [];

      for(let i = 0; i < dados.length; i++){
        labels.push(dados[i].personagem);
        valores.push(dados[i].total);
      }

      let ctx = document.getElementById("myChart");

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets:[{
            label: "Votos de personagens favoritos",
            data: valores
          }]
        }
      });

    })

    .catch(function (erro){
      console.log("erro ao carregar grafico:", erro);
    });
}

//LOGIN
      //VERIFICAÇÃO LOGIN
 function ValidarLogin(){
  let email = input_email.value
  let senha = input_senha.value

  if (email == "" || senha == ""){
    div_mensagem.innerHTML = `Preencha todos os campos!`
  }else if (!email.includes(`@`)){
    div_mensagem.innerHTML = `Falta @ no campo email!`
  }else if (senha.length < 8){
    div_mensagem.innerHTML = `A Senha precisa ter 8 digitos ou mais!`
  }
  
   window.location = "home2.html";

 }





//GAME
function start(){
 div_mensagem.innerHTML = ` <div class="perguntas">
 <p>O Sans gosta de ketchup?</p>
      <button class="btn" onclick="sim()">Sim</button>
     <button class="btn" onclick="nao()">Não</button>
    </div> `
}
function sim(){
  div_mensagem.innerHTML = ` <div class="perguntas">
 <p> blablabla?</p>
      <button class="btn" onclick="sim2()">Sim</button>
     <button class="btn" onclick="nao2()">Não</button>
    </div> `
 }

 function nao(){
div_mensagem.innerHTML = `perdeu`

 }
 function sim2(){
  div_mensagem.innerHTML = `perdeu `
 }

 function nao2(){
div_mensagem.innerHTML = ` <div class="perguntas">
 <p> ajwhsvbfniolqkwahsf?</p>
      <button class="btn" onclick="sim3()">Sim</button>
     <button class="btn" onclick="nao3()">Não</button>
    </div> `
 }
  function sim3(){
  div_mensagem.innerHTML = `perdeu `
 }

 function nao3(){
div_mensagem.innerHTML = ` <div class="perguntas">
 <p> abacate?</p>
      <button class="btn" onclick="sim4()">Sim</button>
     <button class="btn" onclick="nao4()">Não</button>
    </div> `
 }
 