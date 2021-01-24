const express = require('express')
const BlogPost = require('../models/blogModel')
const sessionChecker = require('../middleware/sessionCheck');

const router = new express.Router()

router.get('/api/blogpost', BlogPost.fetchAll)
router.get('/api/blogpost/:id', BlogPost.fetchOne)
router.post('/api/blogpost',sessionChecker, BlogPost.post)
router.patch('/api/blogpost/:id', BlogPost.patch)
router.delete('/api/blogpost/:id', BlogPost.delete)
// router.get('/api/userposts/:id', BlogPost.fetchUserPosts)

module.exports = router