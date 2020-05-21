'use strict'

const Factory = use('Factory')

class BeneficiarioSeeder {
  async run () {
    const items = [
      { genero: "M", nome: 'João Macedo', descricao: 'solicitacao 1', cep: '69087303', cidade: 'Manaus', bairro: 'Novo Reino', rua: 'Rua Jacunda' },
      { genero: "F", nome: 'Alessandra Nunes', descricao: 'solicitacao 2', cep: '69087240', cidade: 'Manaus', bairro: 'Tancredo Neves', rua: 'Beco Bela Vista' },
      { genero: "L", nome: 'Lívia Costa', descricao: 'solicitacao 3', cep: '69087380', cidade: 'Manaus', bairro: 'Tancredo Neves', rua: 'Rua Trinta e Um de Maio' },
      { genero: "F", nome: 'Filomena cascaes', descricao: 'solicitacao 4', cep: '69088270', cidade: 'Manaus', bairro: 'Jorge Teixeira', rua: 'Rua dos Lírios' },
      { genero: "M", nome: 'Maurício Marreiro', descricao: 'solicitacao 5', cep: '69088495', cidade: 'Manaus', bairro: 'Jorge Teixeira', rua: 'Rua L' },
      { genero: "F", nome: 'Bernadinha Furtado', descricao: 'solicitacao 6', cep: '69099256', cidade: 'Manaus', bairro: 'Cidade Nova', rua: 'Santa Mirtes' },
      { genero: "L", nome: 'Leandro Moreira', descricao: 'solicitacao 7', cep: '69099311', cidade: 'Manaus', bairro: 'Cidade de Deus', rua: 'Travessa São João' },
      { genero: "F", nome: 'Crycia Lopes', descricao: 'solicitacao 8', cep: '69099790', cidade: 'Manaus', bairro: 'Cidade de Deus', rua: 'Rua Rosário do Sul' },
    ]

    try {
      for (let i in items) {
        await Factory.model('App/Models/Beneficiario').create(items[i])
      }

      console.log('seed beneficiarios ok')
    }
    catch (err) {
      console.log(err)
    }
  }
}

module.exports = BeneficiarioSeeder
