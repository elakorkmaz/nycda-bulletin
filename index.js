const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      pug = require('pug'),
      Sequelize = require('sequelize');

var app = express();
    sequelize = new Sequelize('bulletinboard', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, { dialect: 'postgres' });

app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

var Message = sequelize.define('message', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT
});

app.get('/', (request, response) => {
  Message.findAll({ order: 'id ASC' }).then((messages) => {
    response.render('messages/index', { messages: messages });
  });
});

app.get('/new', (request, response) => {
  response.render('messages/new');
});



app.post('/messages', (request, response) => {
  console.log('message posted');
  if (request.body.title) {
    Message.create(request.body).then(() => {
      response.redirect('/');
    });
  } else {
    response.redirect('/new');
  }
});

sequelize.sync().then(() => {
  console.log('connected to database');
  app.listen(3000, () => {
    console.log('Server is now running on port 3000');
  });
});
