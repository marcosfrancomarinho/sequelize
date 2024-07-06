const express = require('express')
const cors = require('cors')
const login = require('./routers/login')
const signUp = require('./routers/signup')
const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())

app.use('/login', login)
app.use('/signup', signUp)

app.listen(PORT, () => {
    console.log('Server online')
}) 