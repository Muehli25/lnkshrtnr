var express = require('express');


var app = express();

const dbConnection = require("./db.connector")
const Links = dbConnection.links;
const Op = dbConnection.Sequelize.Op;

dbConnection.sequelize.sync();

app.get('/', function (req, res) {
    dbConnection
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    dbConnection.link.create()
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
