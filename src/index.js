const express = require('express');
const { uuid } = require('uuidv4');

const app = express();
const PORT = 3333;

app.use(express.json());

const repositories = [];

app.post('/repositories', (req, res) => {
  const { title, url, techs } = req.body;

  const repository = { id: uuid(), title, url, techs }

  repositories.push(repository);

  return res.json(repository);
});

 app.listen(PORT, () => {
   console.log('👾  Back-end started!')
 });