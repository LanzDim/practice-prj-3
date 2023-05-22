const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 3000;

const proxyOptions = {
  target: 'http://localhost:4000',
  changeOrigin: true,
  timeout: 60000,
};

app.use('/register', createProxyMiddleware(proxyOptions));
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
});

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (user || user.password !== password)  {
    res.status(403);
    res.json({
      message: "invalid login", 
    });
    return;
  }
  await User.create({ username, password });
  res.json({
    username,
    password,
  });
});

app.post("/Todos", async (req, res) => { 
const { authorization } = req.headers;
const [, token] = authorization.split(" ");
const [username, password] = token.split(":");
const user = await User.findOne({ username }).exec();
  if (user || user.password !== password)  {
    res.status(403);
    res.json({
      message: "invalid login", 
    });
    return;
  }
  const todos = await
});

mongoose.connection.on("error", console.error.bind(console, "Connection error!"));
mongoose.connection.once("open", function () {
  console.log(`Server listening on port ${port}`);
});
