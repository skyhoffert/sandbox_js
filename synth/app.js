var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(5009, function(){
    console.log('Server running on 5009...');
});
