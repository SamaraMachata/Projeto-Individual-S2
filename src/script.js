let votosGlobais = JSON.parse(localStorage.getItem("votos")) || [0,0,0,0,0,0,0,0,0,0,0,0,0,0];

function registrarVoto(i){
    votosGlobais[i]++;
    localStorage.setItem("votos", JSON.stringify(votosGlobais));
    div_mensagem.innerHTML = "Voto registrado!";
}

 //DASH
function renderizarGrafico(){
    let ctx = document.getElementById('myChart');

    new CharacterData(ctx,{
        type: 'bar',
       data: {
         labels: ['Frisk', 'Sans', 'Papyrus', 'Toriel', 'Undyne', 'Asgore', 'Mettaton', 'Alphys', 'Flowey', 'Asriel', 'Napstablook', 'Temmie', 'Mad Mew Mew','Muffet' ],
         datasets: [{
           label: 'Votos de personagens favoritos',
           data: votosGlobais,
           backgroundColor: [
               '#E100FF'
           ]
         }]
    }
       }
    )
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

 //CADASTRO
     //VERIFICAÇÃO CADASTRO
 function ValidarCadastro(){
 let email = input_emailCadastro.value
 let senha = input_senhaCadastro.value
 let numero = input_numero.value
  div_mensagem.innerHTML = ""

  if (email == "" || senha == ""){
    div_mensagem.innerHTML = `Preencha todos os campos!`
    
  }else if (!email.includes(`@`)){
    div_mensagem.innerHTML = `Falta @ no campo email!`
  }else if (senha.length < 8){
    div_mensagem.innerHTML = `A Senha precisa ter 8 digitos ou mais!`
  }else if (numero < 8 ){
     div_mensagem.innerHTML = `Número Inválido!`
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
      <button class="btn" onclick="sim3()">Sim</button>
     <button class="btn" onclick="nao3()">Não</button>
    </div> `
 }
 