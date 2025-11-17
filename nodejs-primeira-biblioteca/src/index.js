const fs = require('fs');

const caminhoArquivo = process.argv;
const link = caminhoArquivo[2];
const { trataErros } = require('./erros/funcoesErros');

fs.readFile(link, 'utf-8', (erro, texto) => {
    try {
        if (erro) throw erro;
        contaPalavras(texto);
    } catch (erro) {
        trataErros(erro);
    }
})

function extraiParagrafos(texto){
    return texto.toLowerCase().split('\n');
}

function contaPalavras(texto){
    const paragrafos = extraiParagrafos(texto);
    const contagem = paragrafos.flatMap((paragrafo) => {
        if (!paragrafo) return [];
            return verificarPalavrasDuplicadas(paragrafo);;
    })
    console.log(contagem);
}

function limparTexto(texto) {
    return texto.replace(/[.,\/#!$%\^&\*:;{}=\-_`~()]/g, '');
}

function verificarPalavrasDuplicadas(texto) {
    const listaPalavras = texto.split(' ');
    const resultado = {};
    listaPalavras.forEach(palavra => {
        if(palavra.length >= 3){
            const palavraLimpa = limparTexto(palavra);
            resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1
        }
    })
    return resultado;
}
