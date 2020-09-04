const User = require('../models/User')
const { response } = require('express')

// get all user
const index = (req, res, next) => {
  User.find()
  .then(response => {
    res.json({
      response
    })
  })
  .catch(error => {
    res.json({
      message: 'An error Occured!'
    })
  })
}

// get user by ID
const show = (req, res, next) => {
  let userID = req.body.userID
  User.findById(userID)
  .then(response => {
    res.json({
      response
    })
  })
  .catch(error => {
    res.json({
      message: 'An error Occured!'
    })
  })
}

// insert a new user
const store = (req, res, next) => {
  let user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    birthDate: req.body.birthDate,
    gender: req.body.gender,
  })
  user.save()
  .then(response => {
    res.json({
      message: 'User Added Successfully!'
    })
  })
  .catch(error => {
    res.json({
      message: 'An error Occured!'
    })
  })
}

// update a user
const update = (req, res, next) => {
  let userID = req.body.userID
  
  let updatedData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    birthDate: req.body.birthDate,
    gender: req.body.gender,
  }

  User.findByIdAndUpdate(userID, {$set: updatedData})
  .then(response => {
    res.json({
      message: 'User updated Successfully!'
    })
  })
  .catch(error => {
    res.json({
      message: 'An error Occured!'
    })
  })
}

// remove user by ID
const destroy = (req, res, next) => {
  let userID = req.body.userID
  User.findByIdAndRemove(userID)
  .then(response => {
    res.json({
      message: 'User removed Successfully!'
    })
  })
  .catch(error => {
    res.json({
      message: 'An error Occured!'
    })
  })
}

module.exports = {
  index, show, store, update, destroy
}