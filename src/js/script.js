let votosGlobais = JSON.parse(localStorage.getItem("votos")) || [0,0,0,0,0,0,0,0,0,0,0,0,0,0];

function registrarVoto(i){
    votosGlobais[i]++;
    localStorage.setItem("votos", JSON.stringify(votosGlobais));
    alert("Voto registrado!");
}

//LOGIN
