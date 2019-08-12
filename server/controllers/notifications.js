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

// Load User model
const Notifications = require("../models/Notifications")

// Get all notifications
const getAllNotifications = (req, res) => {
  Notifications.find({}, (err, notify) => {
    if (err)
      return res.status(500).send({ message: `Error to the request resolve: ${err}` })

    res.status(200).send({ notify })
  })
}

module.exports = {
  getAllNotifications
}
