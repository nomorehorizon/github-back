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

app.put('/repositories/:id', (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if(repoIndex < 0) {
    return res.status(400).json({ error: 'Project not found.'})
  }

  const repo = {
    id,
    title,
    url,
    techs,
  };

  repositories[repoIndex] = repo;

  return res.json(repo);
});

app.delete('/repositories/:id', (req, res) => {
  const { id } = req.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if(repoIndex < 0) {
    return res.status(400).json({ error: 'Project not found' })
  }

  repositories.splice(repoIndex, 1);

  return res.status(204).send();
})

 app.listen(PORT, () => {
   console.log('👾  Back-end started!')
 });