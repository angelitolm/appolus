// eslint-disable-next-line
/*eslint jsx-quotes: ["error", "prefer-double"]*/
/*
  This file is a part of Appolus
  Author: Angel Labrada Mass贸
 */

// ===============================================================
// Import Modules
// ===============================================================
// const params = require('../../config/parameters')

// Load Ticketcomments Model
const Ticketcomments = require('../models/Ticketcomments')

// Get all Commets by Ticket
const getTicketComments = async (req, res) => {
  await Ticketcomments.find({ticket: req.params.ticket}, (err, ticketcomments) => {
    if (err)
      return res.status(500).send({ message: `Error to the request resolve: ${err}` })

    res.status(200).send({ ticketcomments })
  })
}

// Add a new Comment
const addComment = async (req,res) => {

  const { ticket, name, email, avatar, description, date } = req.body

  const newTicketcomments = new Ticketcomments({ticket, name, email, avatar, description, date})

  await newTicketcomments.save()

  res.json({status: "Comment Saved"})
}

module.exports = {
  getTicketComments,
  addComment
}
