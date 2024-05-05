import tabela from "./tabela.js";
import express from 'express';

const app = express();

app.get("/", (requisicao, resposta) => {
    resposta.send(tabela);
})

app.listen(8080, () => console.log('Servidor Funcionando!'));