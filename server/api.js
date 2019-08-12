// eslint-disable-next-line
/*eslint jsx-quotes: ["error", "prefer-double"]*/
/*
  This file is a part of Appolus
  Author: Angel Labrada Mass贸
 */

// ===============================================================
// Import Modules
// ===============================================================
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const passport = require('passport')

// ===============================================================
// Default requirements
// ===============================================================
require('../config/dbconecction')

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}

// ===============================================================
// Route requires
// ===============================================================
const users = require('./routes/users')
const notifications = require('./routes/notification')
const tickets = require('./routes/tickets')
const ticketcommets = require('./routes/ticketcomments')

// ===============================================================
// Initializing API with Express Framework
// ===============================================================
const api = express()

// ===============================================================
// Middleware
// ===============================================================
api.use(passport.initialize()) // Passport middleware
require('./middlewares/passport')(passport) // passport configuration

// Debug by console everything the requests to making on the server
api.use(morgan('dev'))
// api.use(express.json())

// API use format json for all requests
api.use(
  bodyParser.urlencoded({
    'extended': 'false'
  })
)
api.use(bodyParser.json())

// ===============================================================
// Routes
// ===============================================================
api.use(allowCrossDomain)

api.get('/api', (req, res) => {
  res.status(200).send('<h1>The API Rest running here...')
})

api.use("/api/users", users) // User Route
api.use("/api/notifications", notifications) // Notifications Route
api.use("/api/tickets", tickets) // Tickets Route
api.use("/api/ticket/comments", ticketcommets) // Ticket Comments Route

module.exports = api
