"use strict";
module.exports = (sequelize, DataTypes) => {
  const course = sequelize.define("course", {
    name: DataTypes.STRING,
    domain: DataTypes.STRING,
    description: DataTypes.STRING
  });

  return course;
};
