'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

class ExceptionHandler extends BaseExceptionHandler {

  async handle (error, { response }) {
    let message = error.name
    
    switch(error.name) {
      case 'InvalidSessionException':
        return response.redirect('/admin')
      case 'UserNotFoundException':
        message = 'O usuário informado não existe'
        break
      case 'PasswordMisMatchException':
        message = 'A senha informada é inválida'
        break
    }

    response.status(error.status).send(message)
  }

  async report (error, { request }) {
    console.log(request.method() + ":" + request.url())
    console.log(error.message)
  }
}

module.exports = ExceptionHandler
