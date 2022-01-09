//express server
const express = require("express");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (req, res) => 
{
  res.json({message: "API for Museums "});
});

const route = require('./routes/router')(app);

app.listen(process.env.PORT);

console.log("Listening to PORT "+process.env.PORT+"");