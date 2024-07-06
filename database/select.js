const { Op } = require("sequelize");
const Usuarios = require("./model");
const sequelize = require("./main");
const CheckErrors = require("./check");
const check = new CheckErrors()

async function hasUserId(id) {
    try {
        check.hasId(id)
        const datas = await Usuarios.findByPk(id, {
            raw: true,
            attributes: ['name', 'email', 'id']
        })
        if (!datas) return {
            response: datas,
            status: check.messageError.notFoundUser
        }
        return datas
    } catch (error) {
        throw error
    }
}

async function hasUserName(name) {
    check.hasName(name)
    try {
        const datas = await Usuarios.findAll({
            raw: true,
            attributes: ['name', 'id', 'email'],
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        })
        if (datas.length === 0) return {
            users: null,
            status: check.messageError.notFoundUser
        }
        return {
            itsHas: true,
            users: [...datas]
        }
    } catch (error) {
        throw error
    }
}

async function checkUser(email, password) {
    try {
        check.hasEmailPassword(email, password)
        const datas = await Usuarios.findOne({
            attributes: ['email', 'password'],
            where: {
                email: {
                    [Op.eq]: email
                }
            },
        })
        if (!datas) return {
            response: datas,
            status: check.messageError.notFoundUser
        }
        check.itsPasswordValidate(datas, password)
        return {
            itsLogin: true,
            msg: "usuário logado com sucesso"
        }
    } catch (error) {
        throw error
    }
}
module.exports = {
    hasUserId,
    hasUserName,
    checkUser
}


