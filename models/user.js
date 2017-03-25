var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User',{
    email: {type: String, required: true},
    password: {type: String, required: true},
    status: {type: Boolean, default: true}
});
