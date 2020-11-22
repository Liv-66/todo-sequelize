const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
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

app.post('/users/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    console.log('User already exists');
    return res.render('signup', {
      name,
      email,
    });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await User.create({
      name,
      email,
      password: hash,
    });
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
  //   User.findOne({ where: { email } }).then((user) => {
  //     if (user) {
  //       console.log('User already exists');
  //       return res.render('register', {
  //         name,
  //         email,
  //         password,
  //         confirmPassword,
  //       });
  //     }
  //     return bcrypt
  //       .genSalt(10)
  //       .then((salt) => bcrypt.hash(password, salt))
  //       .then((hash) =>
  //         User.create({
  //           name,
  //           email,
  //           password: hash,
  //         })
  //       )
  //       .then(() => res.redirect('/'))
  //       .catch((err) => console.log(err));
  //   });
});

app.get('/users/logout', (req, res) => {
  res.send('logout');
});

app.get('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findByPk(id);
    res.render('detail', { todo: todo.toJSON() });
  } catch (err) {
    console.log(err);
  }
  //   return Todo.findByPk(id)
  //     .then((todo) => res.render('detail', { todo: todo.toJSON() }))
  //     .catch((error) => console.log(error));
});

module.exports = app;
