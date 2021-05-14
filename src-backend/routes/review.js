const express = require('express')
const User = require('../model/User')
const Review = require('../model/Review')
const router = express.Router()

router.get('/', async (req, res) => {
    let reviews = []

    const allReviews = await Review.find()
    for(let i = 0; i < allReviews.length; i++) {
        const user = await User.findById(allReviews[i].userId)
        reviews.push({...allReviews[i]._doc, author: `${user.name} ${user.surname}`})
    }

    res.send({
        message: 'OK',
        data: reviews
    })
})

router.post('/add', async (req, res) => {
    const { userId, text, mark } = req.body

    const review = new Review({
        userId,
        text,
        mark,
        date: new Date()
    })

    try {
        await review.save()

        let freshReviews = []
        const allReviews = await Review.find()
        for(let i = 0; i < allReviews.length; i++) {
            const user = await User.findById(allReviews[i].userId)
            freshReviews.push({...allReviews[i]._doc, author: `${user.name} ${user.surname}`})
        }

        res.status(200).json({
            message: 'Review was added',
            data: freshReviews
        })
    } catch (err) {
        res.send({ message: err })
    }
})

module.exports = router
