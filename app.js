let listaDeNumeroSorteados = [];
let numeroLimite = 10;
let numeroSecreto = 5;
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.1});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Digite o número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagensTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagensTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }

        tentativas++;
        zerarCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhidos = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumeroSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumeroSorteados = [];
    }

    if (listaDeNumeroSorteados.includes(numeroEscolhidos)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumeroSorteados.push(numeroEscolhidos);
        return numeroEscolhidos;
    }
}

function zerarCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    zerarCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}