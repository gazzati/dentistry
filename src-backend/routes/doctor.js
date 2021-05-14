const express = require('express')
const User = require('../model/User')
const router = express.Router()

router.get('/', async (req, res) => {
    const doctors = await User.find({role: 'doctor'})

    res.json({
        message: 'OK',
        data: doctors
    })
})

module.exports = router
