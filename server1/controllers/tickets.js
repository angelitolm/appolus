// eslint-disable-next-line
/*eslint jsx-quotes: ["error", "prefer-double"]*/
/*
  This file is a part of Appolus
  Author: Angel Labrada Mass贸
 */

// ===============================================================
// Import Modules
// ===============================================================
const params = require('../../config/parameters')

// Load Tickets Model
const Tickets = require('../models/Tickets.js')

// Get all tickets
const getTicketsList = (req, res) => {
  Tickets.find({}, (err, tickets) => {
    if (err)
      return res.status(500).send({ message: `Error to the request resolve: ${err}` })

    res.status(200).send({ tickets })
  })
}

// Add a new ticket
const addTicket = async (req,res) => {

  const { number, name, email, title, description, module, specificity, date, status, address, factory, occupation, image1, image2, image3} = req.body

  const newTicket = new Tickets({
    number, name, email, title, description, module,
    specificity, date, status, address, factory,
    occupation, image1, image2, image3
  })

  await newTicket.save()

  res.json({status: "Ticket Saved"})
}

module.exports = {
  getTicketsList,
  addTicket
}
