var express = require('express');
var path = require('path');
var app = express();
var PORT = process.env.PORT || 8080; 

app.use('/static', express.static(path.join(__dirname, '../assets')))


require('./routing/apiRoutes.js')(app);
require('./routing/htmlRoutes.js')(app);

app.listen(PORT, function( ) {
    console.log('server running on port ' + PORT)
});
console.log(path.join(__dirname, '../static'));