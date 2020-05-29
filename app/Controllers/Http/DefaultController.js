'use strict'

class DefaultController {

    async index ({ view }) {
        return view.render('site/index')
    }

    async cadastro ({ view }) {
        return view.render('site/cadastro')
    }

    async login ({ response, view, auth }) {
        if (auth.user) {
            response.redirect('/admin/dashboard')
        }
        return view.render('admin/login')
    }
}

module.exports = DefaultController