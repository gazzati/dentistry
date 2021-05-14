const express = require('express')
const Book = require('../model/Book')
const User = require('../model/User')

const router = express.Router()

//BOOKS
router.get('/', async (req, res) => {
    const {term} = req.query
    const searchFilter = {$regex: term ? `${term}` : '.*', $options: 'i'}

    const allBooks = await Book.find({
        $or: [
            {
                title: searchFilter
            },
            {
                description: searchFilter
            },
            {
                publisher: searchFilter
            }
        ]
    })

    res.send({
        message: 'OK',
        data: allBooks
    })
})

//MY BOOKS
router.post('/my', async (req, res) => {
    const {userId} = req.body
    const user = await User.findById(userId)
    let books = []

    for(let i = 0; i < user.books.length; i++) {
        const book = await Book.findById(user.books[i])
        books.push(book)
    }

    res.send({
        message: 'OK',
        data: books
    })
})

//ADD TO MY BOOKS
router.post('/add', async (req, res) => {
    const { userId, bookId } = req.body

    await User.findByIdAndUpdate(userId,
        {// @ts-ignore
            $push: {
                books: bookId
            }
        }
    )

    const user = await User.findById(userId)

    res.send({
        message: 'OK',
        data: user
    })
})

//REMOVE FROM MY BOOKS
router.delete('/remove', async (req, res) => {
    const { userId, bookId } = req.body

    const oldUser = await User.findById(userId)
    oldUser.books = oldUser.books.filter(book => book.toString() !== bookId)
    await oldUser.save()

    const user = await User.findById(userId)

    res.send({
        message: 'OK',
        data: user
    })
})

module.exports = router
