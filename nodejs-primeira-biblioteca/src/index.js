function extraiParagrafos(texto){
    return texto.toLowerCase().split('\n');
}

export function contaPalavras(texto){
    const paragrafos = extraiParagrafos(texto);
    const contagem = paragrafos.flatMap((paragrafo) => {
        if (!paragrafo) return [];
        return verificarPalavrasDuplicadas(paragrafo);;
    })
    return contagem;
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
