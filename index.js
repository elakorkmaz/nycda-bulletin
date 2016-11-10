const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      pug = require('pug'),
      Sequelize = require('sequelize');

var app = express();
    sequelize = new Sequelize('ela', 'ela', '', { dialect: 'postgres' });

var Message = sequelize.define('message', {
  title: Sequelize.TEXT,
  body: Sequelize.TEXT
});

app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (request, response) => {
  response.redirect('/new');
});

app.get('/index', (request, response) => {
  response.redirect('/index');
});

app.post('/', (request, response) => {

});

sequelize.sync().then(() => {
  console.log('connected to database');
  app.listen(3000, () => {
    console.log('Server is now running on port 3000');
  });
});
