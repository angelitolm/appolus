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
// Define UserSchema
// ===============================================================
const UserSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, lowercase: true, require: true },
  username: { type: String, lowercase: true, require: true },
  password: { type: String, require: true },
  enabled: { type: Boolean, default: true },
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date,
  locked: { type: Boolean, default: false },
  expired: Date,
  expiresAt: Date,
  roles: { type: String },
  bio: { type: String },
  credentialsExpired: Date,
  credentialExpireAt: Date,
  factory: { type: String },
  occupation: { type: String },
  phone: { type: Number },
  address: { type: String },
  locale: { type: String },
  avatar: { type: String }
})

const User = mongoose.model('Users', UserSchema)
module.exports = User
