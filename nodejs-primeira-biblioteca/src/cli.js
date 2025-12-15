import fs from 'fs';
import trataErros  from './erros/funcoesErros.js';
import { contaPalavras } from './index.js'
import { montaSaidaAquivo }  from './helpers.js';
import { Command } from 'commander';

const program = new Command();

program
    .version('0.0.1')
    .option('-t, --texto <string>', 'caminho do texto a ser processado')
    .option('-d, --destino <string>', 'caminho da pasta onde salvar o arquivo de resultados')
    .action((options) => {
        const { texto, destino } = options;
        if (!texto || !destino) {
            console.error('Erro, favor inserir caminho de origem e destino');
            program.help();
            return;
        }
    })

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

function criaESalvaArquivo(listaPalavras, endereco){
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = montaSaidaAquivo(listaPalavras);

    fs.promises.writeFile(arquivoNovo, textoPalavras)
    .then(() => {
        console.log('Arquivo criado com sucesso em', arquivoNovo);
    })
    .catch((erro) => {
        throw erro;
    })
    .finally(() => {
        console.log('Operação finalizada');
    });
}