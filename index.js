import express from 'express';
import cors from 'cors';

const PORT = 4001

const app = express();
app.use(cors())
app.listen(`${PORT}`)

app.get("/tweets", () => {
  console.log(` Servidor rodando na porta: ${PORT}`)
} )
