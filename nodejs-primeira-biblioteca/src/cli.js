import fs from 'fs';
import path from 'path';
import trataErros  from './erros/funcoesErros.js';
import { contaPalavras } from './index.js'

const caminhoArquivo = process.argv;

const link = caminhoArquivo[2];
const endereco = caminhoArquivo[3];

fs.readFile(link, 'utf-8', async (erro, texto) => {
    try {
        if (erro) throw erro
        const resultado = contaPalavras(texto);
        await criaESalvaArquivo(resultado, endereco)
    } catch (erro) {
        trataErros(erro);
    }
})

async function criaESalvaArquivo(listaPalavras, endereco){
    if (!endereco) throw new Error('Endereço de saída não informado');
    const dir = endereco;
    const arquivoNovo = path.join(dir, 'resultado.txt');
    const textoPalavras = JSON.stringify(listaPalavras);
    try {
        await fs.promises.mkdir(dir, { recursive: true });
        await fs.promises.writeFile(arquivoNovo, textoPalavras);
        console.log('Arquivo criado com sucesso em', arquivoNovo);
    } catch(erro){
        throw erro;
    }
}