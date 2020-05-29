'use strict'

class AuthController {

    async login ({ request, response, auth }) {
        const { usuario, senha } = request.only(["usuario", "senha"])
        const cpf = usuario.replace(/\.|\-/g,'')
        await auth.attempt(cpf, senha)
        response.send({ message: 'login ok', auth: true }) 
    }

    async logout ({ response, auth }) {
        await auth.logout()
        response.redirect('/')
    }
}

module.exports = AuthController