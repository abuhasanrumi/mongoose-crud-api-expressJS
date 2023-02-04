const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const todoSchema = require('../schemas/todoSchema')
const Todo = new mongoose.model("Todo", todoSchema)

// Get all the todos
router.get('/', (req, res) => {
    Todo.find({ status: 'active' }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "Server side error"
            })
        } else {
            res.status(200).json({
                result: data
            })
        }
    }).clone()

})

// Get a todo by id
router.get('/:id', async (req, res) => {
    try {
        const data = await Todo.find({ _id: req.params.id })
        res.status(200).json({
            result: data
        })
    } catch {
        res.status(500).json({
            error: "Your input is not supported or invalid"
        })
    }
})

// post a todo
router.post('/', (req, res) => {
    const newTodo = new Todo(req.body)
    newTodo.save((err) => {
        if (err) {
            res.status(500).json({
                error: "Your input is not supported or invalid"
            })
        } else {
            res.status(200).json({
                message: "To do was added"
            })
        }
    })
})

// post multiple todo
router.post('/all', (req, res) => {
    Todo.insertMany(req.body, (err) => {
        if (err) {
            res.status(500).json({
                error: "Your input is not supported or invalid"
            })
        } else {
            res.status(200).json({
                message: "To do's were added"
            })
        }
    })
})

// put todo
router.put('/:id', (req, res) => {
    Todo.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            status: "active"
        }
    }, {
        new: true,
        useFindAndModify: false
    }, (err) => {
        if (err) {
            res.status(500).json({
                error: "Your input is not supported or invalid"
            })
        } else {
            res.status(200).json({
                message: "To do has been updated"
            })
        }
    }).clone()
})

// delete todo
router.delete('/:id', (req, res) => {
    Todo.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: "Your input is not supported or invalid"
            })
        } else {
            res.status(200).json({
                message: "To do was deleted successfully"
            })
        }
    }).clone()
})

module.exports = router
