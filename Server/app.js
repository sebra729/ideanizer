
/**
 * Module dependencies. Hello World!
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , db_cmd = require('./routes/db_cmd')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/card', db_cmd.create);
app.get('/card/:user', db_cmd.getAllCards);
app.del('/card/:nodeId', db_cmd.del);
app.put('/card/:nodeId', db_cmd.update);
app.put('/card/update/:nodeId', db_cmd.updatePos)
app.post('/card/:nodeId/addRel', db_cmd.addRelation);
app.post('/card/:nodeId/removeRel', db_cmd.removeRelation);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
