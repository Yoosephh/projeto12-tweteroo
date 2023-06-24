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
  const lastTweets = tweets.slice(-10);
  const sendTweets = lastTweets.map(t => {
    const user = users.find(u => u.username === t.username);
    return {
      username: t.username,
      avatar: user && user.avatar,
      tweet: t.tweet
    };
  });
  res.status(200).send(sendTweets)
} )

function checkAvatar(t) {
  for (let i = 0; i < users.length; i++) {
    if (t.username === users[i].username) {
      return users[i].avatar;
    }
  }
}

app.post("/tweets", (req, res) => {
  const {username, tweet} = req.body

  if(typeof username !== "string" || typeof tweet !== "string" || username.length=== 0 || tweet.length === 0){
    return res.status(400).send("Todos os campos são obrigatórios!")
  }

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