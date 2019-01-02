const errors = require('@feathersjs/errors');

module.exports = async function(context) {
    
    try {
      const sequelize = context.app.get('sequelizeClient');
      await sequelize.query(`INSERT INTO contact VALUES (${context.data.userId}, ${context.data.friendId})`);
    } catch (e) {
      return Promise.reject(
        new errors.BadRequest(e.toString())
      )
    }
    

    return context;
}