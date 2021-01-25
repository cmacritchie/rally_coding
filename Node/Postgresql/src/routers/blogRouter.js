const express = require('express')
const BlogPost = require('../models/blogModel');
const User = require('../models/userModel');
const sessionChecker = require('../middleware/sessionCheck');
const multer = require('multer');
const upload = multer({
    // 'dest': 'images',
    'limits': {
        'fileSize':1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|PNG)$/)) {
            return cb(new Error('please upload an image'))
        }
        cb(undefined, true)
    }
})

const router = new express.Router()


//router test image upload with Multer
//put in sessionchecker before
router.post('/upload', upload.single('upload'), async (req, res) => {
    const user = await User.findOne({ where: { id: req.session.user.id }})
    await user.update()
    req.file.buffer
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message})
})


router.get('/api/blogpost', async (req, res) => {
    try {
        // console.log("fetch all", User)
    //   const blogposts = await BlogPost.findAll({ include:  [{all: true}] });
      const blogposts = await BlogPost.findAll({ include:  [{ model: User, attributes: ['name'] }] });
    //   console.log('blog posts', blogposts)
      return res.send(blogposts);
    } catch (e) {
        
      return res.status(404).send(e)
    }
});

router.get('/api/blogpost/:id', async (req, res) => {
    try {
        const blogpost = await BlogPost.findOne({ where: { id: req.params.id } });
        if(!blogpost) {
            return res.status(404).send()
        }
        return res.send(blogpost);
    } catch (e) {
      return res.send(e);
    }
})

router.post('/api/blogpost',sessionChecker, async (req, res) => {
    console.log("in blogpost", req.body)
    try {
        const blogpost = BlogPost.build({
            ...req.body
        })
        await blogpost.save()
        // console.log("saved", blogpost)
        res.status(201).send(blogpost)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/api/blogpost/:id', async (req, res) => {
    console.log('where', req.params.id)
    console.log({...req.body})
    try {
        const existingBp = await BlogPost.findOne({ where: { id: req.params.id, UserId:req.session.user.id } });
        const updatedBp =  await existingBp.update(req.body)
        console.log('update', updatedBp)
        return res.send(updatedBp)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/api/blogpost/:id', sessionChecker, async (req, res) => {
    try {
        await BlogPost.destroy({ where: { id: req.params.id, UserId: req.session.user.id  } })
        res.sendStatus(200)
    } catch (e) {
        res.sendStatus(404)
    }
})


module.exports = router