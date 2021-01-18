const express = require('express')
const BlogPost = require('../models/blogModel')

const router = new express.Router()

router.get('/api/blogpost', BlogPost.fetchAll)
router.get('/api/blogpost/:id', BlogPost.fetchOne)
router.post('/api/blogpost', BlogPost.post)
router.patch('/api/blogpost/:id', BlogPost.patch)
router.delete('/api/blogpost/:id', BlogPost.delete)
// router.get('/api/userposts/:id', BlogPost.fetchUserPosts)

module.exports = router