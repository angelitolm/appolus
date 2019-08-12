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
const Tickets = require('../models/Tickets')

// Get all tickets
const getTicketsList = async (req, res) => {
  await Tickets.find({}, (err, tickets) => {
    if (err)
      return res.status(500).send({ message: `Error to the request resolve: ${err}` })

    res.status(200).send({ tickets })
  })
}

// Add a new ticket
const addTicket = async (req,res) => {

  const { number, name, email, avatar, title, description, module, specificity, date, status, address, factory, occupation, image1, image2, image3} = req.body

  const newTicket = new Tickets({
    number, name, email, avatar, title, description, module,
    specificity, date, status, address, factory,
    occupation, image1, image2, image3
  })

  await newTicket.save()

  res.json({status: "Ticket Saved"})
}

// Get Ticket by Number
const getTicketById = async (req, res) => {
  let ticketId = req.params.ticketId
  await Tickets.findById(ticketId, (err, ticket) => {
    if (err)
      return res.status(500).send({ message: `Error to the request resolve: ${err}` })

    res.status(200).send({ ticket })
  })
}

module.exports = {
  getTicketsList,
  addTicket,
  getTicketById
}
