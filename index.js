import express from 'express';
import cors from 'cors';

const PORT = 5000

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.listen(`${PORT}`, () => {
  console.log(` Servidor rodando na porta: ${PORT}`)
})

app.get("/tweets", (req, res) => {

} )
app.post("/tweets", (req, res) => {
  const {username, tweet} = req.body

  if(users.length === 0){ 
    return res.status(401).send("Por favor, faça login novamente")
  }

  const newTweet = {
    username, tweet
  }
  tweets.push(newTweet)
  return res.status(201).send("OK")

} )


app.post("/sign-up", (req, res) => {
  const {username, avatar} = req.body

  if(typeof username !== "string" || typeof avatar !== "string" || username.length=== 0 || avatar.length === 0){
    return res.status(400).send("Todos os campos são obrigatórios!")
  }
  if(users.filter(u => u.name === username).length > 0) {
    return res.status(409).send('Usuário já cadastrado!')
  }

  const newUser = {
    username, avatar
  }
  
  users.push(newUser);
  
  res.status(201).send("OK")
} )