'use strict'

const Beneficiario = use('App/Models/Beneficiario')

class BeneficiarioController {

    async index ({ response }) {
        const data = await Beneficiario.query()
            .select('id' ,'nome','coordenadas')
            .fetch()

        response.json(data)
    }
}

module.exports = BeneficiarioController
