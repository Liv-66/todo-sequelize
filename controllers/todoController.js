const db = require('../models');
const Todo = db.Todo;

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    await Todo.create({
      name,
      UserId: req.user.id,
    });
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
};

exports.edit = async (req, res) => {
  try {
    const UserId = req.user.id;
    const id = req.params.id;
    const { name, isDone } = req.body;
    const todo = await Todo.findOne({ where: { id, UserId } });
    todo.name = name;
    todo.isDone = isDone === 'on';
    await todo.save();
    res.redirect(`/todos/${id}`);
  } catch (err) {
    console.log(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const UserId = req.user.id;
    const id = req.params.id;
    const todo = await Todo.findOne({ where: { id, UserId } });
    await todo.destroy();
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
};
