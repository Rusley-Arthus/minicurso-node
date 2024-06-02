import tabela from './tabela.js';
import express from 'express';
import { modeloTime, modeloAtualizacaoTime } from './validacao.js';

const app = express();

app.use(express.json());

app.get('/', (requisicao, resposta) => {
    resposta.status(200).send(tabela);
});

app.get('/:sigla', (requisicao, resposta) => {
    const siglaInformada = requisicao.params.sigla.toUpperCase();
    const time = tabela.find((infoTime) => infoTime.sigla === siglaInformada);
    if(!time){
        resposta.status(404).send('Não existe na série A do Brasileirão um time com a sigla informada!');
        return;
    }
    
    resposta.status(200).send(time);
    
});

app.put('/:sigla', (req, res) => {
    const siglaInformada = req.params.sigla.toUpperCase();
    const timeSelecionado = tabela.find((time) => time.sigla === siglaInformada);
    if (!timeSelecionado){
        res.status(404).send("Não existe na série A do Brasileirão um time com a sigla informada!");
        return;
    }
    const { error }  = modeloAtualizacaoTime.validate(req.body);
    if(error){
        res.status(400).send(error);
        return;
    }
    const campos = Object.keys(req.body);
    for(let campo of campos){
        timeSelecionado[campo] = req.body[campo];
    }
    res.status(200).send(timeSelecionado);
});

app.post('/', (req, res) => {
    const novoTime = req.body;
    const {error} = modeloTime.validate(novoTime);
    if (error){
        res.status(400).send(error);
        return;
    }
    tabela.push(novoTime);
    res.status(201).send(novoTime);
});
    
app.delete('/:sigla', (req, res) => {
    const siglaInformada = req.params.sigla.toUpperCase();
    const timeSelecionado = tabela.find((time) => time.sigla === siglaInformada);
    const indiceTimeSelecionado = tabela.findIndex((time) => time.sigla === siglaInformada);
    if(indiceTimeSelecionado === -1 ){
        res.status(404).send("Não existe na série A do Brasileirão um time com a sigla informada!");
        return;
    }

    const timeRemovido = tabela.splice(indiceTimeSelecionado, 1);
    res.status(200).send(timeRemovido);

})

app.listen(8080, () => console.log('Servidor Funcionando!'));