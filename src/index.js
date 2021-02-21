const express = require('express');
const { uuid } = require('uuidv4');

const app = express();
const PORT = 3333;

app.use(express.json());

const repositories = [];

app.get('/repositories', (req, res) => {
  const { title } = req.query;

  const results = title
    ? repositories.filter(repo => repo.title.includes(title))
    : repositories;

  return res.json(results);
});

app.post('/repositories', (req, res) => {
  const { title, url, techs } = req.body;

  const repo = { id: uuid(), title, url, techs }

  repositories.push(repo);

  return res.json(repo);
});

 app.listen(PORT, () => {
   console.log('👾  Back-end started!')
 });