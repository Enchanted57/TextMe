// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const userChatRoom = sequelizeClient.define('user_chat_room', {
    // text: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // }
  }, {
    timestamps:false,
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  userChatRoom.associate = function (models) {
  };

  return userChatRoom;
};
