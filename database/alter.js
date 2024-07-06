const CheckErrors = require('./check')
const Usuarios = require('./model')
const { hasUserId } = require('./select')
const check = new CheckErrors()

async function updateDatasUser(id, password) {
    try {
        const response = await hasUserId(id)
        check.hasUser(response)
        check.hasPassword(password)
        await Usuarios.update(
            { password: password },
            {
                where: {
                    id: id
                }
            }
        )
        return {
            status: 'senha alterada com sucesso',
            itsUpdate: true
        }
    } catch (error) {
        throw error
    }
}

module.exports = updateDatasUser