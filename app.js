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
const dbConnection = require('./db.connector');
const Links = dbConnection.links;

dbConnection.sequelize.sync();

app.get('/:short', function(req, res) {
  Links
      .findOne({
        where: {
          shortValue: req.params.short,
          public: true,
        },
      })
      .then((value) =>
        res.redirect(301, value.longValue),
      );
});

app.post('/', function(req, res) {
  if (req.body.secret === process.env.CREATION_SECRET) {
    const newLink = {
      shortValue: randomstring.generate({
        length: 6,
        charset: 'alphabetic',
      }),
      longValue: req.body.link,
      public: true,
    };

    Links.create(newLink)
        .then((data) => {
          res.send(data);
        });
  } else {
    res.status(403).send();
  }
});

app.listen(3000, function() {
  console.log('Listening on port 3000!');
});
