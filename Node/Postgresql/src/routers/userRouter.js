const express = require('express');
const User = require('../models/userModel');
const BlogPost = require('../models/blogModel');

const router = new express.Router()

router.get('/api/user', async (req, res) => {
    try {
      const users = await User.findAll();
      return res.send({ users });
    } catch (error) {
      return res.send(error);
    }
})

router.get('/api/user/:id', async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });

        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/api/user', async (req, res) => {
    const user = User.build({
        ...req.body
    })
    try {
        await user.save()
        console.log(user.dataValues)
        req.session.user = user.dataValues.name
        console.log('session', req.session)
        // console.log('session', req.session)
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/api/user/:id', async (req, res) => {
    try {
        const updatedUser = await User.update({ ...req.body }, {returning: true, where: {id: req.params.id}})
        return res.send(updatedUser)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/api/user/:id', async (req, res) => {
    try {
        const userDelete = await User.destroy({ where: { id: req.params.id } })
        console.log(userDelete)
        res.sendStatus(200)
    } catch (e) {
        res.status()
    }
})

router.get('/api/userposts/:id', async (req, res) => {
    try {
        const userPosts = await User.findOne({ include: [{model:BlogPost}], where: { id: req.params.id } });
        console.log(userPosts)
        return res.send(userPosts);
    } catch (e) {
        return res.send(e);
    }
})

router.post('/api/login', async (req, res) => {
    const { name, password } = req.body;
    const user = await User.findOne({ where: { name }})
    if(!user) {
        return res.status(404).send()
    }
    else if(!user.validPassword(password)) {
        return res.status(404).send()
    }
    else {
        req.session.user = user.dataValues
        return res.status(200).send(user.toJSON())
    }
})


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