'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

class ExceptionHandler extends BaseExceptionHandler {

  async handle (error, { response }) {
    const message = error.name
    response.status(error.status).send(message)
  }

  async report (error, { request }) {
    console.log(request.method() + ":" + request.url())
    console.log(error.message)
  }
}

module.exports = ExceptionHandler
