var express = require('express')
var app = express()
var logger = require('winston')
const session = require('express-session');
const MemcachedStore = require('connect-memcached')(session);

var bodyParser = require('body-parser');
var passport = require('passport')
var morgan = require('morgan')

require('dotenv').config()

const auth_config = require('./auth')
var DB_init = require('./db/config');
const connection_string = DB_init()


const routers = require('./routers')


const port = process.env.PORT
const app_name = process.env.APP_NAME


logger.add(logger.transports.File, { filename: "/tmp/" + app_name + ".log" })

logger.info("Application started!")

// Configure the session and session storage.
const sessionConfig = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.CACHE_SECRET,
  signed: true
};

// In production use the App Engine Memcache instance to store session data,
// otherwise fallback to the default MemoryStore in development.
if (process.env.NODE_ENV === 'production' && process.env.MEMCACHE_URL) {
  sessionConfig.store = new MemcachedStore({
    hosts: [process.env.MEMCACHE_URL]
  });
}



// set static pages
const pages_path = __dirname + "/www"
app.set('view engine', 'pug')
app.set('views', pages_path)
app.set('view options', {
  layout: false
});

logger.log(express.static(pages_path))


// parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//[ROUTER]
//Auth
app.use(passport.initialize());
app.use(passport.session());
app.use(routers.jwt.get_router())

app.use('/auth', routers.google_auth_router.get_router())

//API
app.use('/api/polls', routers.polls_router.get_router())
app.get('/ping', function (req, res, next) {
  res.render('index', {
    title: 'pong'
  })
})
//[END of ROUTER]

//[PAGES]
// index test page
app.get('/', function (req, res) {
  res.render('index', {
    title: 'my main page'
  })
})



// Basic 404 handler
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Basic error handler
app.use((err, req, res, next) => {
  /* jshint unused:false */
  console.error(err);
  // If our routes specified a specific response, then send that. Otherwise,
  // send a generic message so as not to leak anything.
  res.status(500).send(err.response || 'Something broke!');
});

// [END of PAGES]




// Server startup
app.listen(port, function () {
  logger.info(app_name + ' listening on port ', port)
})

module.exports = app;

