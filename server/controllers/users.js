// eslint-disable-next-line
/*eslint jsx-quotes: ["error", "prefer-double"]*/
/*
  This file is a part of Appolus
  Author: Angel Labrada Mass贸
 */

// ===============================================================
// Import Modules
// ===============================================================
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const params = require('../../config/parameters')

// Load input validation
const validateRegisterInput = require("../validators/signup")
const validateLoginInput = require("../validators/signin")

// Load User model
const User = require("../models/Users")

function signUp (req, res) {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body)

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" })
    } else {
      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    }
  })
}

function AddUser (req, res) {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body)

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" })
    } else {
      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles,
        bio: req.body.bio,
        occupation: req.body.occupation,
        factory: req.body.factory,
        phone: req.body.phone,
        address: req.body.address
      })

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    }
  })
}

function signIn (req, res) {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body)

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" })
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          username: user.username,
          name: user.name,
          roles: user.roles,
          avatar: user.avatar,
          occupation: user.occupation,
          factory: user.factory,
          phone: user.phone,
          address: user.address
        }

        // Sign token
        jwt.sign(
          payload,
          params.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        )
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" })
      }
    })
  })
}

// Get all users
const getUserList = (req, res) => {
  User.find({}, (err, users) => {
    if (err)
      return res.status(500).send({ message: `Error to the request resolve: ${err}` })

    if (!users)
      return res.status(404).send({ message: `Users don't exist` })

    res.status(200).send({ users })
  })
}

// Update User by Id
const updateUser = async (req, res) => {
  const { name, username, email, roles, bio, avatar } = req.body
  const newUser = { name, username, email, roles, bio, avatar }
  await User.findByIdAndUpdate(req.params.id, newUser)
  res.json({status: "User Updated"})
}

// Delete User by Id
const deleteUser = async (req, res) => {
  await User.findByIdAndRemove(req.params.id);
  res.json({status: 'User Deleted'});
}


module.exports = {
  signUp,
  signIn,
  AddUser,
  getUserList,
  updateUser,
  deleteUser
}
