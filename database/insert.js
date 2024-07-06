const CheckErrors = require("./check");
const sequelize = require("./main");
const Usuarios = require("./model");
const check = new CheckErrors()


async function insertDatasOfUsers(name, email, password) {
    try {
        check.hasEmailPasswordName(name, email, password)
        await Usuarios.create({
            name: name,
            password: password,
            email: email
        })
        return {
            status: 'Usuario criado com sucesso',
            itsCreate: true
        }
    } catch (error) {
        check.uniqueEmail(error)
        throw error
    }
}

module.exports = insertDatasOfUsers