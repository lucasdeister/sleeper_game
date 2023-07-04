const cores = ["Verde", "Amarelo", "Marrom", "Rosa", "Laranja", "Cinza", "Vermelho", "Azul", "Preto"];
const classesCores = ["Green", "Yellow", "Brown", "Pink", "Orange", "Gray", "Red", "Blue", "Black"];


let interval;

let qtd_fragmentos = 0;

const obterTempoBaseadoNoNivel = (nivel) =>{

    let tempo = 0;

    switch(nivel) {
        case '1':
            tempo = 3;
          break;
        case '2':
        case '3':
            tempo = 2;
            break;
        case '4':
            tempo = 1.7;
            break;
        case '5':
            tempo = 1.5;
            break;
        default:
            tempo = 1;
            break;
      }

      return tempo;
}

const gameOver = () =>{
    clearInterval(interval);
    document.querySelector('.timer').innerText = '00:00';
    document.querySelector('.nivel').innerText = '1';
    exibirToast("Game over", "Pontuação total:" +
               document.querySelector('.pontuacao').innerText + " pontos", "blue");
    // alert("Game over. Pontuação total: " + document.querySelector('.pontuacao').innerText + " ponto(s)");
    document.querySelector('.pontuacao').innerText = 0;
    esconderJogo();
    habilitarBotaoInciarJogo();
}

function timer(seconds) {
    const tempo = document.querySelector('.timer');
    let tempoRestante = seconds;
  
    interval = setInterval(() => {
      if (tempoRestante <= 0) {
        clearInterval(interval);
        if (document.querySelector('.container_jogo').style.visibility == 'visible') {
          gameOver();
        }
      } else {
        const minutos = Math.floor(tempoRestante / 60).toString().padStart(2, '0');
        const segundos = (tempoRestante % 60).toString().padStart(2, '0');
        tempo.innerText = `${minutos}.${segundos}`;
        tempoRestante--;
      }
    }, 1000);
  }
  

const sortearPalavraAlvo = () => {
    const palavra_alvo = document.querySelector(".palavra_alvo");

    for (let i = palavra_alvo.classList.length - 1; i >= 0; i--) {
        const classe = palavra_alvo.classList[i];
        if (classe !== "palavra_alvo") {
            palavra_alvo.classList.remove(classe);
        }
    }

    palavra_alvo.innerText = cores[Math.floor(Math.random() * cores.length)];
    palavra_alvo.classList.add(classesCores[Math.floor(Math.random() * classesCores.length)].toLowerCase());
}


const sortearQuadrados = () => {
    const quadrados = document.querySelectorAll(".quadrado");
    const copiaClassesCores = [...classesCores];
    
    for (let i = 0; i < quadrados.length; i++) {
        const quadrado = quadrados[i];
        for (let j = 0; j < quadrado.classList.length; j++) {
            const classe = quadrado.classList[j];
            if (classe.startsWith("bg")) {
                quadrado.classList.remove(classe);
            }
        }

        const randomIndex = Math.floor(Math.random() * copiaClassesCores.length);
        const randomClasseCor = copiaClassesCores[randomIndex];

        quadrado.classList.add("bg" + randomClasseCor);
        copiaClassesCores.splice(randomIndex, 1);
    }
}

const esconderJogo = () =>{
    document.querySelector('.container_jogo').style.visibility = 'hidden';
}

const demonstrarJogo = () =>{
    document.querySelector('.container_jogo').style.visibility = 'visible';
}


const desabilitarBotaoInciarJogo = () =>{
    document.querySelector('#btnIniciarJogo').disabled = true;
}

const habilitarBotaoInciarJogo = () =>{
    document.querySelector('#btnIniciarJogo').disabled = false;
}

const obterCorQuadrado = (elemento) => {
    const classes = elemento.className.split(" ");
    for (let i = 0; i < classes.length; i++) {
        if (classes[i].startsWith("bg")) {
            return classes[i];
        }
    }
}

const obterCorPalavraAlvo = () => {

    let corPalavraAlvo = document.querySelector('.palavra_alvo').classList[1];
    let primeira_letra = corPalavraAlvo.charAt(0).toUpperCase();
    corPalavraAlvo = corPalavraAlvo.slice(1);
    return 'bg' + primeira_letra + corPalavraAlvo;
  };



const links = document.getElementsByClassName("quadrado");

for (let i = 0; i < links.length; i++) {

    links[i].addEventListener("click", function() {

        let acertou = false;
        let corQuadrado = obterCorQuadrado(this);
        let corPalavraAlvo = obterCorPalavraAlvo();
        acertou = verificarAcerto(corPalavraAlvo, corQuadrado);

        if(acertou){
            if(qtd_fragmentos == 9){
                document.querySelector('.nivel').innerText = parseInt(document.querySelector('.nivel').innerText) + 1;
                qtd_fragmentos = 0;
            }else{
                qtd_fragmentos++;
            }
            clearInterval(interval);
            timer(obterTempoBaseadoNoNivel(document.querySelector('.nivel').innerText));
            sortearQuadrados();
            sortearPalavraAlvo();
        }else{
            gameOver();
        }
  });
}

let pontuacao = document.querySelector('.pontuacao').innerText;

const verificarAcerto = (corPalavra, corQuadrado) =>{

    const pontos_por_acerto = 1;

    if(corPalavra === corQuadrado){
        document.querySelector('.pontuacao').innerText = parseInt(document.querySelector('.pontuacao').innerText) + pontos_por_acerto;
        return true;
    }else{
        return false;
    }

}

esconderJogo();

document.querySelector('#btnIniciarJogo').addEventListener("click", function() {
    timer(obterTempoBaseadoNoNivel(document.querySelector('.nivel').innerText));
    desabilitarBotaoInciarJogo();
    demonstrarJogo();
    sortearPalavraAlvo();
    sortearQuadrados();
  });





  

