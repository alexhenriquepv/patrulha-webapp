'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'DefaultController.index').as('site.index')
Route.get('cadastro', 'DefaultController.cadastro').as('site.cadastro')

Route.get('admin', 'BeneficiarioController.index')

Route.group(() => {
    Route.resource('beneficiarios', 'BeneficiarioController')
        .validator(new Map([
            [['beneficiarios.store'], ['StoreBeneficiario']]
        ]))

    Route.get('mapa', 'BeneficiarioController.mapa').as("beneficiarios.mapa")
    Route.get('seed', 'BeneficiarioController.seed')
})
.prefix('admin')

Route.group(() => {
    Route.get('beneficiarios', 'BeneficiarioController.index')
})
.namespace('Api')
.prefix('api')