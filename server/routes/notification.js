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
const { getAllNotifications } = require('../controllers/notifications')

// @route POST api/users/list
// @desc List user
// @access Private
router.get("/list", getAllNotifications)

module.exports = router
