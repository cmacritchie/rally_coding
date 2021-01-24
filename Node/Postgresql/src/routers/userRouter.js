const express = require('express')
const User = require('../models/userModel')

const router = new express.Router()

router.get('/api/user', User.fetchAll)
router.get('/api/user/:id', User.fetchOne)
router.post('/api/user', User.post)
router.patch('/api/user/:id', User.patch)
router.delete('/api/user/:id', User.delete)
router.get('/api/userposts/:id', User.fetchUserPosts)
router.post('/api/login', User.login)
router.get('/api/me', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        const user = User.build(req.session.user)
        console.log("here's the user", user)
        return res.status(200).send(user.toJSON()) //check with tracker app, should be fine
    }
    console.log('not so good')
    return res.sendStatus(404)
})

router.post('/api/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.status(200).send({ loggedOut: true })
    }
    else {
        res.status(404).send({ loggedOut: false })
    }
})

module.exports = router