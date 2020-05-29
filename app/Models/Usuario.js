'use strict'

const Model = use('Model')
const Hash = use('Hash')

class Usuario extends Model {
    static boot () {
        super.boot()

        this.addHook('beforeCreate', async (instance) => {
            instance.senha = await Hash.make(instance.senha)
        })
    }
}

module.exports = Usuario
