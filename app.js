const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const db = require('./models');
const Todo = db.Todo;
const User = db.User;

const app = express();

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll({
      raw: true,
      nest: true,
    });
    res.render('index', { todos });
  } catch (err) {
    res.status(422).json(err);
  }
  // return Todo.findAll({
  //   raw: true,
  //   nest: true
  // })
  //   .then((todos) => { return res.render('index', { todos: todos }) })
  //   .catch((error) => { return res.status(422).json(error) })
});
app.get('/users/login', (req, res) => {
  res.render('login');
});

app.post('/users/login', (req, res) => {
  res.send('login');
});

app.get('/users/signup', (req, res) => {
  res.render('signup');
});

app.post('/users/signup', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  User.create({ name, email, password }).then((user) => res.redirect('/'));
});

app.get('/users/logout', (req, res) => {
  res.send('logout');
});

module.exports = app;
