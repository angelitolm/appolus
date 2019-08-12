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
// Define TicketcommentsSchema
// ===============================================================
const TicketcommentsSchema = new Schema({
  ticket: { type: String, require: true },
  name: { type: String, require: true },
  email: { type: String, require: true },
  avatar: { type: String },
  description: { type: String, require: true },
  date: { type: Date, default: Date.now() }
})

const Ticketcomments = mongoose.model('Ticketcomments', TicketcommentsSchema)
module.exports = Ticketcomments
