'use strict'

const Schema = use('Schema')

class UsuariosSchema extends Schema {
  up () {
    this.create('usuarios', (table) => {
      table.increments()
      table.timestamps()
      table.string('cpf', 11).notNullable()
      table.string('nome', 60).notNullable()
      table.string('senha', 60).notNullable()
      table.string('senha_temp', 60).nullable()
    })
  }

  down () {
    this.drop('usuarios')
  }
}

module.exports = UsuariosSchema
