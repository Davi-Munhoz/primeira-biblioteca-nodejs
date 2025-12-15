function filtrarOcorrencias(paragrafo){
    return Object.keys(paragrafo).filter (chave => paragrafo[chave] > 1)
}

function montaSaidaAquivo(listaPalavras){
    let textoFinal = '';
    listaPalavras.forEach((paragrafo, indice) => {
        const duplicadas = filtrarOcorrencias(paragrafo).join(', ');
        textoFinal += `Palavras duplicadas no paragrafo ${indice + 1}: ${duplicadas}\n`;
    })

    return textoFinal;
}

export { montaSaidaAquivo};