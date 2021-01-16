const express = require('express')
const ToDo = require('../models').ToDo

const router = new express.Router()

router.post('/api/todo', async (req, res) => {
    const todo = await new Todo.build({
        ...req.body,
    })


    try {
        await todo.save()
        res.status(201).send(programming)
    } catch (e) {
        res.status(400).send(e)
    }
})

// router.post('/api/user', async (req, res) => {
    
// })

module.exports = router