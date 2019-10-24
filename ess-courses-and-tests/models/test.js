"use strict";
module.exports = (sequelize, DataTypes) => {
  const test = sequelize.define("test", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "courses",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    },
    num_of_questions: DataTypes.INTEGER,
    name: DataTypes.STRING,
    duration: DataTypes.STRING
  });

  test.associate = models => {
    test.belongsTo(models.course, { foreignKey: "course_id" });
  };

  return test;
};
