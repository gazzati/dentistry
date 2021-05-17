const express = require('express')
const User = require('../model/User')
const router = express.Router()

router.post('/', async (req, res) => {
    const {doers} = req.body
    const doctors = await User.find({role: 'doctor'})

    res.json({
        message: 'OK',
        data: doctors.filter(doctor => doers.includes(doctor.specialty))
    })
})

module.exports = router
