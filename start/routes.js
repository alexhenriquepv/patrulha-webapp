'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'DefaultController.index').as('site.index').middleware('themedata')
Route.get('cadastro', 'DefaultController.cadastro').as('site.cadastro').middleware('themedata')

Route.group(() => {
    Route.get('/', 'BeneficiarioController.index')

    Route.resource('beneficiarios', 'BeneficiarioController')
        .validator(new Map([
            [['beneficiarios.store'], ['StoreBeneficiario']]
        ]))

    Route.get('mapa', 'BeneficiarioController.mapa').as("beneficiarios.mapa")

    Route.get('sitemanager', 'SiteManagerController.index').as("sitemanager.index").middleware('themedata')
    Route.post('sitemanager', 'SiteManagerController.store').as("sitemanager.store")
    
    Route.get('filemanager', 'FileManagerController.index').as("filemanager.index")
    Route.post('filemanager', 'FileManagerController.store').as("filemanager.store")
    Route.get('filemanager/show/:name', 'FileManagerController.show').as("filemanager.show")
    Route.delete('filemanager/:name', 'FileManagerController.destroy').as("filemanager.destroy")

    Route.get('seed', 'BeneficiarioController.seed')
})
.namespace('Admin')
.prefix('admin')

Route.group(() => {
    Route.get('beneficiarios', 'BeneficiarioController.index')
})
.namespace('Api')
.prefix('api')