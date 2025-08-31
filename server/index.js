
import express from 'express';
import cors from 'cors';
import { todos } from './todos.js';

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(express.json());

app.get('/api/todos', (req, res) => {
  //res.status(500).send();
  setTimeout(() => {
    res.json(todos);
  }, 2000);
});

app.get('/api/todos/:id', (req, res) => {
  const id = req.params.id;
  const todo = todos.find(t => String(t.id) === id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

app.post('/api/todos', (req, res) => {
  const { id } = req.body;
  const todo = todos.find(t => String(t.id) === String(id));
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});