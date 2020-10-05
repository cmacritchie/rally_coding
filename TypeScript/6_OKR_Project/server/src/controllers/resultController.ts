import { RequestHandler } from 'express';
import Result  from '../models/resultModel';

export const createResult: RequestHandler = async (req, res) =>{
    const result = new Result({
        ...req.body
    })

    try {
        await result.save();
        res.status(201).send(result);
    } catch (e) {
        res.status(400).send(e)
    }
};

export const getResult: RequestHandler = async (req, res) => {
    try {
        const result = await Result.find({})
        res.send(result)
    }
    catch(e) {
        res.status(500).send()
    }
}

export const getResultById: RequestHandler = async (req, res) => {
    const _id = req.params.id

    try {
        const result = await Result.findById(_id)
        
        if(!result) {
            return res.status(404).send()
        }
        res.send(result)
    }
    catch (e) {
        res.status(500).send()
    }
}

export const patchResult: RequestHandler = async (req, res) => {
    const _id = req.params.id;
    
    try {
        const result = await Result.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true})

        if(!result) {
            return res.status(404).send()
        }
        res.send(result)
    } catch (e) {
        res.status(400).send(e)
    }
}

export const deleteResult: RequestHandler = async (req, res) => {
    try {
        const result = await Result.findByIdAndDelete(req.params.id)

        if(!result) {
            res.status(404).send()
        }

        res.send(result)
    }
    catch (e) {
        res.status(500).send()
    }
}
