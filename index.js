var express = require('express')
var app = express()
var logger = require('winston')
var bodyParser = require('body-parser');

var morgan = require('morgan')

require('dotenv').config()

const port = process.env.PORT
const app_name = process.env.APP_NAME


logger.add(logger.transports.File, { filename: "/tmp/" + app_name + ".log" })

logger.info("Application started!")


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


//router

// app.post('/file', upload.single('avatar'), function (req, res, next) {
  
  
// })

// index page
app.get('/', function (req, res) {
  res.render('index', {
    title: 'my main page'
  })
})



// Server startup
app.listen(port, function () {
  logger.info(app_name + ' listening on port ', port)
})


