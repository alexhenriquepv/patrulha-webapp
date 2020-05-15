'use strict'

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Beneficiario', (faker, i, data) => {
  return {
    nome: data.nome,
    descricao: data.descricao,
  }
})
