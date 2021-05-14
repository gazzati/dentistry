const express = require('express')
const User = require('../model/User')

const router = express.Router()


//REGISTRATION
router.post('/registration', async (req, res) => {

    //Create a new user
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        books: []
    })

    await user.save()

    res.json({
        message: 'Registration success!',
        data: user
    })
})

//LOGIN
router.post('/login', async (req, res) => {

    //Checking if the email exists
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.json({ message: 'Email is not found' })

    if (req.body.password !== user.password) return res.json({ message: 'Invalid password' })

    res.json({
        message: 'Authorization success!',
        data: user
    })
})

module.exports = router
