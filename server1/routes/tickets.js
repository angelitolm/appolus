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
const { getTicketsList, addTicket } = require('../controllers/tickets')

// @route POST api/tickets/add
// @desc Add user
// @access Private
router.post("/add", addTicket)

// @route POST api/tickets/list
// @desc List user
// @access Private
router.get("/list", getTicketsList)

// @route POST api/tickets/:id
// @desc Update user
// @access Private
// router.put("/update/:id", updateUser)

// @route POST api/tickets/:id
// @desc Delete user
// @access Private
// router.delete("/delete/:id", deleteUser)

module.exports = router
