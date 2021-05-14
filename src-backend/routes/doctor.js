const express = require('express')
const User = require('../model/User')
const router = express.Router()

router.post('/registration', async (req, res) => {

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
    })

    await user.save()

    res.json({
        message: 'Успешная регистрация!',
        data: user
    })
})

router.post('/login', async (req, res) => {

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.json({ message: 'Email не найден' })

    if (req.body.password !== user.password) return res.json({ message: 'Неверный пароль' })

    res.json({
        message: 'Успешная автризация!',
        data: user
    })
})

module.exports = router
