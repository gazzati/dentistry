const express = require('express')
const Procedure = require('../model/Procedure')
const User = require('../model/User')
const router = express.Router()

router.get('/', async (req, res) => {
    const {term} = req.query
    const searchFilter = {$regex: term ? `${term}` : '.*', $options: 'i'}

    const allProcedures = await Procedure.find({
        $or: [
            {
                title: searchFilter
            },
            {
                description: searchFilter
            }
        ]
    })

    res.send({
        message: 'OK',
        data: allProcedures
    })
})

router.post('/my', async (req, res) => {
    const {userId} = req.body
    const user = await User.findById(userId)
    let procedures = []

    for(let i = 0; i < user.procedures.length; i++) {
        const procedure = await Procedure.findById(user.procedures[i])
        procedures.push(procedure)
    }

    res.send({
        message: 'OK',
        data: procedures
    })
})

module.exports = router
