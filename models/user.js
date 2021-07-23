const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    active: Sequelize.BOOLEAN,
  });

  user.prototype.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) {
        return callback(err);
      }
      callback(null, isMatch);
    });
  };
  return user;
};
