'use strict'

const Model = use('Model')

class Beneficiario extends Model {

    static boot () {
        super.boot()
        this.addHook('beforeCreate', 'BeneficiarioHook.getAdressCoordinates')
    }

}

module.exports = Beneficiario
