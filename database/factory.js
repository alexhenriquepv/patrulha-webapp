'use strict'

const Factory = use('Factory')

Factory.blueprint('App/Models/Usuario', (faker, i, data) => {
  return {
    cpf: data.cpf,
    nome: data.nome,
    senha: data.senha
  }
})

Factory.blueprint('App/Models/Beneficiario', (faker, i, data) => {
  return {
    genero: data.genero,
    nome: data.nome,
    descricao: data.descricao,
    cep: data.cep,
    cidade: data.cidade,
    bairro: data.bairro,
    rua: data.rua
  }
})

Factory.blueprint('configs', (faker, i, data) => {
  return {
    name: data.name,
    value: data.value
  }
})
