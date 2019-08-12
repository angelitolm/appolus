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
const router = express.Router()
const { getTicketComments, addComment } = require('../controllers/ticketcomments')
// const { getUserTicketComments } = require('../controllers/users')

// @route POST api/tickets/comments/add
// @desc Add comment
// @access Private
router.post("/add", addComment)

// @route GET api/tickets/comments/list
// @desc List tickets
// @access Private
router.get("/list/:ticket", getTicketComments)

// @route GET api/tickets/comments/list/:ticket
// @desc List ticket by number
// @access Private
// router.get("/list/:ticket", getUserTicketComments)

// @route POST api/ticket-comment/:id
// @desc Update user
// @access Private
// router.put("/update/:id", updateUser)

// @route POST api/ticket-comment/:id
// @desc Delete user
// @access Private
// router.delete("/delete/:id", deleteUser)

module.exports = router
