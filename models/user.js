'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    githubId: DataTypes.INTEGER,
    token: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};