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
const TicketsSchema = new Schema({
  numer: { type: Number, require: true },
  name: { type: String, require: true },
  email: { type: String, require: true },
  title: { type: String, require: true },
  description: { type: String, require: true },
  module: { type: String, require: true },
  specificity: { type: String, require: true },
  date: { type: Date, default: Date.now() },
  status: { type: String },
  address: { type: String },
  factory: { type: String},
  occupation: { type: String},
  image1: { type: String },
  image2: { type: String },
  image3: { type: String },
  comments: { type: Array }
})

const Tickets = mongoose.model('Tickets', TicketsSchema)
module.exports = Tickets
