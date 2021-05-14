const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const PORT = 4000
const DB_CONNECT = 'mongodb+srv://gazzaevtimur:timur99@cluster0.xbdsh.mongodb.net/library?retryWrites=true&w=majority'

//Connect to DB
mongoose.connect(
    DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true },
    () => console.log('Connected to db!')
)

//Import Routes
const authRoute = require('./routes/auth')
const booksRoute = require('./routes/book')


app.get("/", (req, res) => {
    res.send("aloha")
})

//Middleware
app.use(express.json())
app.use(cors({ origin: true, credentials: true }))

//Route Middlewares
app.use('/auth', authRoute)
app.use('/books', booksRoute)

app.listen(PORT, () => console.log('Server Up and running'))
