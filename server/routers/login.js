const express = require('express')
const router = express.Router()
const { checkUser } = require('../../database/select')
const CheckErrors = require('../../database/check')
const check = new CheckErrors()

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body
        check.hasEmailPassword(email, password)
        const response = await checkUser(email, password)
        res.status(200).type('json').send(response)
    } catch (error) {
        res.status(400).type('json').send(error.message)
    }
})

module.exports = router