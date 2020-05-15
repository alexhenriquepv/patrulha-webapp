'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BeneficiariosSchema extends Schema {
  up () {
    this.create('beneficiarios', (table) => {
      table.increments()
      table.timestamps()
      table.string('nome', 80).notNullable()
      table.string('contato', 11).nullable()
      table.string('cpf', 11).nullable()
      table.string('rg', 12).nullable()
      table.string('estado_civil', 10).nullable()
      table.string('escolaridade', 50).nullable()
      table.string('profissao', 40).nullable()
      table.string('ocupacao', 12).nullable()
      table.string('coordenadas', 17).nullable()
      table.string('cep', 8).nullable()
      table.string('cidade', 50).nullable()
      table.string('bairro', 50).nullable()
      table.string('rua', 50).nullable()
      table.string('complemento', 50).nullable()
      table.string('ponto_referencia', 50).nullable()
      table.string('condicao_moradia', 15).nullable()
      table.boolean('com_deficiencia').default(false)
      table.text('descricao').notNullable()
    })
  }

  down () {
    this.drop('beneficiarios')
  }
}

module.exports = BeneficiariosSchema
