var express = require('express');
var randomstring = require("randomstring");

var app = express();

app.use(express.json()); // parse body

const dbConnection = require("./db.connector")
const Links = dbConnection.links;
const Op = dbConnection.Sequelize.Op;

dbConnection.sequelize.sync();

app.get('/:short', function (req, res) {
    Links
        .findOne({
            where: {
                shortValue: req.params.short
            }
        })
        .then(value =>
            res.redirect(301, value.longValue)
        );
});

app.post('/', function (req, res) {
    console.log(req.body)
    const newLink = {
        shortValue: randomstring.generate({
            length: 6,
            charset: 'abc'
        }),
        longValue: req.body.value,
        public: true
    };

    Links.create(newLink)
        .then(data => {
            res.send(data);
        })
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
