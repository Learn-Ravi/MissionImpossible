var mongoose = require('mongoose'),
url ='mongodb://localhost/data';

global.connection = mongoose.connect(url);
mongoose.connection.on('error', function(err) {
    console.error('MongoDB error: %s', err);
});
module.exports = connection;