const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const routes = require('./routes');
const usePassport = require('./config/passport');

const app = express();

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));

app.use(
  session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true,
  })
);

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

usePassport(app);

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  // res.locals.success_msg = req.flash('success_msg');
  // res.locals.warning_msg = req.flash('warning_msg');
  next();
});

app.use(routes);

module.exports = app;
