const express = require('express')
const router = express.Router()
const insertDatasOfUsers = require('../../database/insert')
const CheckErrors = require('../../database/check')
const check = new CheckErrors()

router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body
        check.hasEmailPasswordName(name, email, password)
        await insertDatasOfUsers(name, email, password)
        res.status(200).type('json').send({
            message: 'usuario cadastrado com sucesso',
            itsRegister: true
        })
    } catch (error) {
        res.status(400).type('json').send(error.message)
    }
})

module.exports = router