'use strict'

class DefaultController {

    async index ({ view }) {
        return view.render('site/index')
    }

    async cadastro({ view }) {
        return view.render('site/cadastro')
    }
}

module.exports = DefaultController
