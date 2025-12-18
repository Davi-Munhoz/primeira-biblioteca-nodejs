import chalk from 'chalk';

export default function trataErros(erro){
    if (erro && erro.code === 'ENOENT') {
        console.error(chalk.red.bold('Arquivo não encontrado. Verifique o caminho informado.'));
        process.exit(1);
    }

    const mensagem = erro && erro.message ? erro.message : String(erro);
    console.error(chalk.red.bold(`Erro na aplicação: ${mensagem}`));
    process.exit(1);
}