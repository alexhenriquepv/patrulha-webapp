'use strict'

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class BeneficiarioSeeder {
  async run () {

    const items = [
      { nome: 'João Macedo', descricao: 'solicitacao 1', cep: '69087303', cidade: 'Manaus', bairro: 'Novo Reino', rua: 'Rua Jacunda' },
      { nome: 'Alessandra Nunes', descricao: 'solicitacao 2', cep: '69087240', cidade: 'Manaus', bairro: 'Tancredo Neves', rua: 'Beco Bela Vista' },
      { nome: 'Lívia Costa', descricao: 'solicitacao 3', cep: '69087380', cidade: 'Manaus', bairro: 'Tancredo Neves', rua: 'Rua Trinta e Um de Maio' },
      { nome: 'Filomena cascaes', descricao: 'solicitacao 4', cep: '69088270', cidade: 'Manaus', bairro: 'Jorge Teixeira', rua: 'Rua dos Lírios' },
      { nome: 'Maurício Marreiro', descricao: 'solicitacao 5', cep: '69088495', cidade: 'Manaus', bairro: 'Jorge Teixeira', rua: 'Rua L' },
      { nome: 'Bernadinha Furtado', descricao: 'solicitacao 6', cep: '69099256', cidade: 'Manaus', bairro: 'Cidade Nova', rua: 'Santa Mirtes' },
      { nome: 'Leandro Moreira', descricao: 'solicitacao 7', cep: '69099311', cidade: 'Manaus', bairro: 'Cidade de Deus', rua: 'Travessa São João' },
      { nome: 'Crycia Lopes', descricao: 'solicitacao 8', cep: '69099790', cidade: 'Manaus', bairro: 'Cidade de Deus', rua: 'Rua Rosário do Sul' },
    ]

    for (let i in items) {
      await Factory.model('App/Models/Beneficiario').create(items[i])
    }
  }
}

module.exports = BeneficiarioSeeder
