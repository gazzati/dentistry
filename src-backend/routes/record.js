const express = require('express')
const Procedure = require('../model/Procedure')
const User = require('../model/User')
const Record = require('../model/Record')
const router = express.Router()

router.get('/', async (req, res) => {
    const {userId, isDoctor} = req.query
    let records = []

    const allRecords = await Record.find(isDoctor ? {doctorId: userId} : {userId})

    for(let i = 0; i < allRecords.length; i++) {
        const user = await User.findById(allRecords[i].userId)
        const doctor = await User.findById(allRecords[i].doctorId)
        const procedure = await Procedure.findById(allRecords[i].procedureId)
        records.push({
            _id: allRecords[i]._id,
            user,
            doctor,
            procedure,
            date: allRecords[i].date
        })
    }

    res.send({
        message: 'OK',
        data: records
    })
})

router.post('/add', async (req, res) => {
    const { procedureId, userId, doctorId, date } = req.body

    const record = new Record({
        procedureId,
        userId,
        doctorId,
        date
    })

    try {
        await record.save()

        res.status(200).json({
            message: 'Record was added'
        })
    } catch (err) {
        res.send({ message: err })
    }
})

router.post('/remove', async (req, res) => {
    const { recordId } = req.body

    await Record.deleteOne({ _id: recordId }, {}, (err) => {
        if (err) res.send({ message: err })

        res.status(200).json({
            message: 'Record was deleted'
        })
    })
})

module.exports = router
