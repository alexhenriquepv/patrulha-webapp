'use strict'

class StoreBeneficiario {
  get rules () {
    return {
      nome: "required",
      descricao: "required"
    }
  }

  get messages () {
    return {
      'nome.required': "O campo nome é obrigatório",
      'descricao.required': "O campo descrição é obrigatório"
    }
  }
}

module.exports = StoreBeneficiario