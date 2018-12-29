const defaults = {};

module.exports = function(options) {
    options = Object.assign({}, defaults, options);

    return function(hook) {
        hook.params.sequelize = {
            include: [
                { model: hook.app.services.user.Model }
            ]
        };
    };
};