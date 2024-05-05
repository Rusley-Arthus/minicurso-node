import tabela from './tabela.js';
import express from 'express';

const app = express();

app.get('/', (requisicao, resposta) => {
    resposta.status(200).send(tabela);
});

app.get('/:sigla', (requisicao, resposta) => {
    const siglaInformada = requisicao.params.sigla.toUpperCase();
    const time = tabela.find((infoTime) => infoTime.sigla === siglaInformada);
    if(!undefined){
        resposta.status(404).send('Não existe na série A do Brasileirão um time com a sigla informada!');
        return;
    }
    resposta.status(200).send(time);
});

app.listen(8080, () => console.log('Servidor Funcionando!'));