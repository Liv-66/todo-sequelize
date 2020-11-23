const db = require('../models');
const Todo = db.Todo;
exports.login = (req, res) => {
  res.render('login');
};
exports.signup = (req, res) => {
  res.render('signup');
};
exports.getTodos = async (req, res) => {
  try {
    UserId = req.user.id;
    const todos = await Todo.findAll({
      where: { UserId },
      raw: true,
      nest: true,
    });
    res.render('index', { todos });
  } catch (err) {
    res.status(422).json(err);
  }
};
exports.createOne = (req, res) => {
  res.render('new');
};
exports.getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findByPk(id);
    res.render('detail', { todo: todo.toJSON() });
  } catch (err) {
    console.log(err);
  }
};
exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findByPk(id);
    res.render('edit', { todo: todo.toJSON() });
  } catch (err) {
    console.log(err);
  }
};
