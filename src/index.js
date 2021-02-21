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

  const repo = { 
    id: uuid(), 
    title, 
    url, 
    techs,
    likes: 0
  }

  repositories.push(repo);

  return res.json(repo);
});

app.put('/repositories/:id', (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if(repoIndex < 0) {
    return res.status(400).json({ error: 'Repository not found.'})
  }

  const repo = {
    id,
    title,
    url,
    techs,
    likes: repositories[repoIndex].likes,
  };

  repositories[repoIndex] = repo;

  return res.json(repo);
});

app.delete('/repositories/:id', (req, res) => {
  const { id } = req.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if(repoIndex < 0) {
    return res.status(400).json({ error: 'Repository does not exists' });
  }

  repositories.splice(repoIndex, 1);

  return res.status(204).send();
})

app.post('/repositories/:id/like', (req, res) => {
  const { id } = req.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  repositories[repoIndex].likes += 1;

  return res.json(repositories[repoIndex]);
});

app.listen(PORT, () => {
  console.log('👾  Back-end started!')
});