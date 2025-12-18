import fs from 'fs';
import path from 'path';
import trataErros  from './erros/funcoesErros.js';
import { contaPalavras } from './index.js'
import { montaSaidaAquivo }  from './helpers.js';
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
    .version('0.0.1')
    .option('-t, --texto <string>', 'caminho do texto a ser processado')
    .option('-d, --destino <string>', 'caminho da pasta onde salvar o arquivo de resultados')
    .action((options) => {
        const { texto, destino } = options;
        if (!texto || !destino) {
            console.error(chalk.red.bold('Erro, favor inserir caminho de origem e destino'));
            program.help();
            return;
        }

        const caminhoTexto = path.resolve(texto);
        const caminhoDestino = path.resolve(destino);

        try {
            processaArquivo(caminhoTexto, caminhoDestino);
            console.log(chalk.green.bold('Arquivo processado com sucesso!'));
        } catch (erro) {
            trataErros(erro);
        }
    })

program.parse(process.argv);

async function processaArquivo(caminhoTexto, caminhoDestino){
    try {
        const textoConteudo = await fs.promises.readFile(caminhoTexto, 'utf-8');
        const resultado = contaPalavras(textoConteudo);
        await criaESalvaArquivo(resultado, caminhoDestino);
    } catch (erro) {
        throw erro;
    }
}

async function criaESalvaArquivo(listaPalavras, endereco){
    if (!endereco) throw new Error('Endereço de saída não informado');
    const dir = endereco;
    const arquivoNovo = path.join(dir, 'resultado.txt');
    const textoPalavras = montaSaidaAquivo(listaPalavras);

    try {
        await fs.promises.mkdir(dir, { recursive: true });
        await fs.promises.writeFile(arquivoNovo, textoPalavras);
        console.log(chalk.green.bold(`Arquivo criado com sucesso em ${arquivoNovo}`));
    } catch (erro) {
        throw erro;
    } finally {
        console.log(chalk.green.bold('Operação finalizada'));
    }
}