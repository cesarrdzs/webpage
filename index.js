let express = require('express'),
app = express(),
path = require('path'),
favicon = require('serve-favicon'),
logger = require('morgan'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
flash = require('connect-flash'),
session = require('express-session'),
MVCRouter = require('express-mvc-router'),
exphbs = require('express-handlebars');

require('dotenv').config();

const hbs = exphbs({
		extname : '.hbs',
		layoutsDir : 'app/views/layouts/',
		defaultLayout : 'layout',
		helpers : require('handlebars-helpers')()
});

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
		secret: process.env.SECRETSESS,
		resave: true,
		saveUninitialized: true
}));

// use connect-flash for flash messages stored in session
app.use(flash());
// auto load routes based on controllers folder
app.use('/', new MVCRouter({ controllerPath: "app/controllers" }).load()); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	
	if (process.env.NODE_ENV == 'production'){
		res.sendFile( path.join(process.cwd(), '/pages/404.html'));
	}else{
		// render the error page
		res.status(err.status || 500);
		res.render('error');
	}
});

module.exports = app;
