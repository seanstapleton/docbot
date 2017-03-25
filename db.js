var mongoose = require('mongoose');
mongoose.connect('mongodb://owner:root@ds141410.mlab.com:41410/docbot');
module.exports = mongoose.connection;
