const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const router = new express.Router();
const Users = require('../models/').user;

router.post('/login', function(req, res, next) {
  const {username, password} = req.body;
  if (!username || !password) {
    res.status(400).json({error: 'MissingCredentials'});
    return;
  }

  Users
      .find({
        where:
                {
                  username: username,
                  active: true,
                },
      })
      .then((user) => {
        if (!user) {
          console.log('user not found');
          res.status(401).json({error: 'UserNotFound'});
        } else {
          user.comparePassword(password, (err, isMatch) => {
            if (isMatch && !err) {
              const token = jwt.sign({
                id: user.id,
                username: user.username,
              }, 'SECRET',
              {expiresIn: 30 * 24 * 60 * 60}); // 30 days
              res.json({token});
            } else {
              console.log('wrong password');
              res.status(401).json({error: 'Authentication failed!'});
            }
          });
        }
      });
});

router.post('/register', (req, res, next) => {
  const {username, password} = req.body;

  if (!username || !password) {
    res.status(400).json({error: 'MissingCredentials'});
  } else {
    Users
        .create({
          username: username,
          password: bcrypt.hashSync(password, 10),
          active: false,
        })
        .then(function(user) {
          res.json({status: 'user created'});
        })
        .catch(function(err) {
          console.log('User already exists!');
          res.status(400).json({error: 'UserAlreadyKnown'});
        });
  }
});

router.get('/checktoken', (req, res, next) => {
  const {token} = req.headers;

  if (!token) {
    console.log('Missing Token');
    res.json({expired: true});
    return;
  }
  try {
    jwt.verify(token, 'SECRET');
  } catch (TokenExpiredError) {
    res.json({expired: true});
    return;
  }
  res.json({expired: false});
});

module.exports = router;
