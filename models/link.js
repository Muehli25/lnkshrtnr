module.exports = (sequelize, Sequelize) => {
  return sequelize.define('link', {
    shortValue: {
      type: Sequelize.STRING,
    },
    longValue: {
      type: Sequelize.STRING,
    },
    public: {
      type: Sequelize.BOOLEAN,
    },
  });
};
