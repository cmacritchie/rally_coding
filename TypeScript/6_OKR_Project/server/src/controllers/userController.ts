import { RequestHandler } from 'express';
import User  from '../models/userModel';

export const createUser: RequestHandler = async (req, res) =>{
    const user = new User({
        ...req.body
    })

    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e)
    }
};

export const getUsers: RequestHandler = async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    }
    catch(e) {
        res.status(500).send()
    }
}

export const getUserById: RequestHandler = async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    }
    catch (e) {
        res.status(500).send()
    }
}

export const patchUser: RequestHandler = async (req, res) => {
    const _id = req.params.id;
    
    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true})

        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
}

export const deleteUser: RequestHandler = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user) {
            res.status(404).send()
        }

        res.send(user)
    }
    catch (e) {
        res.status(500).send()
    }
}
