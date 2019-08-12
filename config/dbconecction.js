// eslint-disable-next-line
/*eslint jsx-quotes: ["error", "prefer-double"]*/
/*
  This file is a part of Appolus
  Author: Angel Labrada Mass贸
 */

// ===============================================================
// Import Modules
// ===============================================================
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// ===============================================================
// Settings
// ===============================================================
const config = require('./parameters')

// ===============================================================
// Connection to Database
// ===============================================================
mongoose.connect(config.dbUri, { useNewUrlParser: true })
  .then(() => {
      /* ready to use. The `mongoose.connect()` promise resolves to undefined */
      console.log('Appolus has been connect to MongoDb...')
    },
    err => {
      /* handle initial connection error */
      console.log('Oops!!! Error connection to MongoDb:')
      console.log(err)
    }
  )
