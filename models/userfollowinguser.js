"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userFollowingUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      userFollowingUser.belongsTo(models.user)
      userFollowingUser.hasMany(models.user)
    }
  }
  userFollowingUser.init(
    {
      idFollower: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      idFollowing: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "userFollowingUser",
    }
  );
  return userFollowingUser;
};
