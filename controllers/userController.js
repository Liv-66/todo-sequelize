const passport = require('passport');
const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.User;

exports.checkLoginForm = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];
  if (!email || !password) {
    errors.push({ message: '請輸入E-mail與密碼。' });
  }
  if (!(await User.findOne({ where: { email } }))) {
    errors.push({ message: '此E-mail尚未註冊。' });
  }
  if (errors.length) {
    return res.render('login', {
      errors,
    });
  }
  next();
};

exports.login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
});

exports.signup = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = [];
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所以欄位都是必填。' });
  }
  if (password !== confirmPassword) errors.push({ message: '密碼不相符。' });
  if (await User.findOne({ where: { email } })) {
    errors.push({ message: '這個E-mail已經註冊過。' });
  }
  if (errors.length) {
    return res.render('signup', {
      errors,
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
    eq.flash('success_msg', '註冊成功！請重新登入。');
    res.redirect('/users/login');
  } catch (err) {
    console.log(err);
  }
  next();
};

exports.logout = (req, res) => {
  req.logout();
  req.flash('success_msg', '你已經成功登出。');
  res.redirect('/users/login');
};
