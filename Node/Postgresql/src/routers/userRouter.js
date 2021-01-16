const express = require('express')


const router = new express.Router()

router.post('/api/test', async (req, res) => {
    const testResponse = {
        message: 'hello world'
    }
    
    try {
        res.status(201).send(testResponse)
    } catch(e) {
        res.status(400).send(e)
    }
})

// router.post('/api/user', async (req, res) => {
    
// })

module.exports = router