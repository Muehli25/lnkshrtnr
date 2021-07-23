const express = require('express');
const randomstring = require('randomstring');

const app = express();

app.use(express.json()); // parse body

const helmet = require('helmet');
app.use(helmet());

// parse cookies, needed for authentication
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Add cors
const cors = require('cors');
app.use(cors());

// database connection
const dbConnection = require('./models');
const Links = dbConnection.links;

dbConnection.sequelize.sync();

app.get('/:short', function(req, res) {
  Links
      .findOne({
        where: {
          shortValue: req.params.short,
        },
      })
      .then((value) =>
        res.redirect(301, value.longValue),
      );
});

app.post('/', function(req, res) {
  const newLink = {
    shortValue: randomstring.generate({
      length: 6,
      charset: 'abc',
    }),
    longValue: req.body.value,
    public: true,
  };

  Links.create(newLink)
      .then((data) => {
        res.send(data);
      });
});

const authRouter = require('./router/authentication.router');

app.use('/auth', authRouter);

app.listen(3000, function() {
  console.log('Listening on port 3000!');
});
