let votosGlobais = JSON.parse(localStorage.getItem("votos")) || [0,0,0,0,0,0,0,0,0,0,0,0,0,0];

function registrarVoto(i){
    votosGlobais[i]++;
    localStorage.setItem("votos", JSON.stringify(votosGlobais));
    alert("Voto registrado!");
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
  
  window.location.href = "home2.html";

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
  
  window.location.href = "../home2/home2.html";

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

//GAME
function sim(){
  
 }