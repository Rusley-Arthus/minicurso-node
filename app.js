import tabela from "./tabela.js";
import express from 'express';

const app = express();

app.get("/", (requisicao, resposta) => {
    resposta.send(tabela);
});

app.get("/:sigla", (requisicao, resposta) => {
    const siglaInformada = requisicao.params.sigla.toUpperCase();
    const time = tabela.find((infoTime) => infoTime.sigla === siglaInformada);
    resposta.send(time);
});

app.listen(8080, () => console.log('Servidor Funcionando!'));