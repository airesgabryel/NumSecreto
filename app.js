let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {//função importada ResposiveVoice.
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}



function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto'); // usando função em h1 sem retorno
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10'); // usando função em p sem retorno
}

exibirMensagemInicial();


function verificarChute(){ 
    let chute = document.querySelector('input').value 

    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        if (chute < numeroSecreto){
            exibirTextoNaTela('p', `O número é maior que ${chute}` );
    
        } else {
            exibirTextoNaTela('p', `O número é menor que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}


function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    //método para não ter repetição de números escolhidos
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){//includes verifica se ja há numero igual na lista
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido); //push adiciona número no final da lista
        return numeroEscolhido;
    }
}//função sem parâmetro com retorno

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}//função sem retorno

function reiniciarJogo(){//resetando o App
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas=1;
    exibirMensagemInicial();
    
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
