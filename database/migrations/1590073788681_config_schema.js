'use strict'

const Schema = use('Schema')

class ConfigSchema extends Schema {
  up () {
    this.create('configs', (table) => {
      table.increments()
      table.string('name', 10).notNullable()
      table.text('value', 10).nullable()
    })
  }

  down () {
    this.drop('configs')
  }
}

module.exports = ConfigSchema
