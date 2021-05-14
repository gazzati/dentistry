const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const PORT = 8000
const MONGO_DB_CONNECT = 'mongodb+srv://nastya:nastya99@cluster0.slh8i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

//Connect to DB
mongoose.connect(
    MONGO_DB_CONNECT,
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true},
    () => console.log('Connected to db!')
)

//Import Routes
const authRoute = require('./routes/auth')
const procedureRoute = require('./routes/procedure')
const reviewRoute = require('./routes/review')
const doctorRoute = require('./routes/doctor')

//Middleware
app.use(express.json())
app.use(cors({origin: true, credentials: true}))

//Route Middlewares
app.use('/auth', authRoute)
app.use('/procedures', procedureRoute)
app.use('/reviews', reviewRoute)
app.use('/doctors', doctorRoute)

app.listen(PORT, () => console.log('Server Up and running'))
