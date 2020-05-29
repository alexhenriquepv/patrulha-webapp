'use strict'

const Factory = use('Factory')

class UsuarioSeeder {
  async run () {
    const items = [
      { cpf: "92513255291", nome: 'Alex Paiva', senha: '1234' },
    ]

    try {
      for (let i in items) {
        await Factory.model('App/Models/Usuario').create(items[i])
      }

      console.log('seed usuarios ok')
    }
    catch (err) {
      console.log(err)
    }
  }
}

module.exports = UsuarioSeeder
