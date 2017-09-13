const Manifest = require('./manifest');
const Glue = require('glue');


// callback(err, server)
exports = module.exports = function(callback) {
    const options = {
        relativeTo: __dirname
    };

    Glue.compose(Manifest, options, callback);
};
