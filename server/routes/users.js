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
const { signUp, signIn, getUserList, AddUser, updateUser, deleteUser } = require('../controllers/users')

// @route POST api/users/signup
// @desc Register user
// @access Public
router.post("/signup", signUp)

// @route POST api/users/signin
// @desc Login user and return JWT token
// @access Public
router.post("/signin", signIn)

// @route POST api/users/add
// @desc Add user
// @access Private
router.post("/add", AddUser)

// @route POST api/users/list
// @desc List user
// @access Private
router.get("/list", getUserList)

// @route POST api/users/:id
// @desc Update user
// @access Private
router.put("/update/:id", updateUser)

// @route POST api/users/:id
// @desc Delete user
// @access Private
router.delete("/delete/:id", deleteUser)




module.exports = router
