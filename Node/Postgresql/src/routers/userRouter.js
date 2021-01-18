const express = require('express')
const User = require('../models/userModel')

const router = new express.Router()

router.get('/api/user', User.fetchAll)
router.get('/api/user/:id', User.fetchOne)
router.post('/api/user', User.post)
router.patch('/api/user/:id', User.patch)
router.delete('/api/user/:id', User.delete)
router.get('/api/userposts/:id', User.fetchUserPosts)

module.exports = router