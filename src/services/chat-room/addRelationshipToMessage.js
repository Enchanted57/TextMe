const defaults = {};

module.exports = function(options) {
    options = Object.assign({}, defaults, options);

    return function(hook) {
        hook.params.sequelize = {
            include: [
                { 
                    model: hook.app.services.messages.Model,
                    attributes: { exclude: ['chatRoomId', 'userId'] }, 
                    include: [{ model: hook.app.services.user.Model, attributes: {exclude: ['password']} }] 
                },
                // {
                //     model: hook.app.services['user-chat-room'].Model
                // }
            ]
        };
    };
};