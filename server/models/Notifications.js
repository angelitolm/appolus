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
const { Schema } = mongoose

// ===============================================================
// Define NotificationsSchema
// ===============================================================
const NotificationsSchema = new Schema({
  image: { type: String, require: true },
  message: { type: String, lowercase: true, require: true },
  username: { type: String, lowercase: true, require: true },
  date: { type: Date, default: Date.now() },
  readed: { type: Boolean, default: false }
})

const Notifications = mongoose.model('Notifications', NotificationsSchema)
module.exports = Notifications
