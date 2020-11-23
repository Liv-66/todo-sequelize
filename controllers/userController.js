const passport = require('passport');
const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.User;

exports.login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
});

exports.signup = async (req, res) => {
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
    res.redirect('/users/login');
  } catch (err) {
    console.log(err);
  }
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/users/login');
};
