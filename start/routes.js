'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'DefaultController.index').as('site.index')
Route.get('cadastro', 'DefaultController.cadastro').as('site.cadastro')

Route.group(() => {
    Route.get('/', 'BeneficiarioController.index')

    Route.resource('beneficiarios', 'BeneficiarioController')
        .validator(new Map([
            [['beneficiarios.store'], ['StoreBeneficiario']]
        ]))

    Route.get('mapa', 'BeneficiarioController.mapa').as("beneficiarios.mapa")

    Route.get('filemanager', 'FileManagerController.index').as("filemanager.index")
    Route.post('filemanager', 'FileManagerController.sendfile').as("filemanager.sendfile")
    Route.get('filemanager/show/:name', 'FileManagerController.showfile').as("filemanager.showfile")

    Route.get('seed', 'BeneficiarioController.seed')
})
.namespace('Admin')
.prefix('admin')

Route.group(() => {
    Route.get('beneficiarios', 'BeneficiarioController.index')
})
.namespace('Api')
.prefix('api')