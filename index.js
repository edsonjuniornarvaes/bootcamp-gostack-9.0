/**
 * Bootcamp GoStack 9.0 » Desafo 01 - NodeJs.
 *
 * -- Atividades do desafio 01.
 *
 * @author Edson Junior <edsonjunior.narvaes@gmail.com>
 */

const express = require('express');
const server = express();

server.use(express.json());

const projects = [];

const idVerify = (req, res, next) => {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if ( !project ) return res.status(400).json({ error: 'Este projeto não existe.' });
  return next();
}

let count = 0;

const requestCount = (req, res, next) => {
  count += 1;
  setCount();
  return next();
}

const setCount = () => {
  console.log(`O total de requisições é de: ${ count }`);
}

server.post('/projects', requestCount, (req, res) => {
  const { id, title } = req.body;
  
  const project = {
      id,
      title,
      tasks: []
  };
  
  projects.push(project);
  return res.json(project);
});

server.put('/projects/:id', idVerify, requestCount, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

server.delete('/projects/:id', idVerify, requestCount, (req, res) => {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  projects.splice(project, 1);
  return res.json(projects);
});

server.post('/projects/:id/tasks', idVerify, requestCount, (req, res) => {
  const { id } = req.params;
  const { tasks } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(tasks);
  return res.json(projects);
});



server.get('/projects', requestCount, (req, res) => {
  return res.json(projects);
});

server.listen(3001);