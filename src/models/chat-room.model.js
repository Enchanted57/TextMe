const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const chatRoom = sequelizeClient.define('chat_room', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isGroup: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: false,
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  chatRoom.associate = function (models) {
    chatRoom.hasMany(models.message);
    chatRoom.belongsToMany(models.user, {
      through: models.user_chat_room
    });
  };

  return chatRoom;
};
