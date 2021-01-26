const express = require('express')
const BlogPost = require('../models/blogModel');
const User = require('../models/userModel')
const sessionChecker = require('../middleware/sessionCheck')
const multer = require('multer')  //for image upload
const sharp = require('sharp') 
const upload = multer({
    // 'dest': 'images',  //saves in this folder
    'limits': { 
        'fileSize':1000000   //1 mb
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|PNG)$/)) {   //only these files types
            return cb(new Error('please upload an image'))
        }
        cb(undefined, true)
    }
})

const router = new express.Router()

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

//upload image if you want
// router.post('/api/blogpost',sessionChecker, async (req, res) => {
    router.post('/api/blogpost', upload.single('upload'), async (req, res) => {   //uses upload header in key
    try {
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
        
        const blogpost = BlogPost.build({
            ...req.body,
            imageUrl: buffer
        })
        await blogpost.save()
        res.status(201).send(blogpost)
    } catch (e) {
        res.status(400).send(e)
    }
})

//turn route into link for image
router.get('/api/blogpost/:id/avatar', async (req, res) => {
    try {
        const blogpost = await BlogPost.findOne({ where: { id: req.params.id } });

        if(!blogpost || !blogpost.imageUrl) {
            throw Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(blogpost.imageUrl)

    } catch (e) {
        res.status(404).send()
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