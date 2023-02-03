const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const todoSchema = require('../schemas/todoSchema')
const Todo = new mongoose.model("Todo", todoSchema)

// Get all the todos
router.get('/', async (req, res) => {

})

// Get a todo by id
router.get('/:id', async (req, res) => {

})

// post a todo
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body)
    await newTodo.save((err) => {
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
router.post('/all', async (req, res) => {
    await Todo.insertMany(req.body, (err) => {
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
router.put('/:id', async (req, res) => {

})

// delete todo
router.delete('/:id', async (req, res) => {

})

module.exports = router
