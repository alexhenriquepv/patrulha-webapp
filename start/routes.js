'use strict'

const Route = use('Route')

Route.get('/', 'DefaultController.index').as('site.index').middleware('themedata')
Route.get('cadastro', 'DefaultController.cadastro').as('site.cadastro').middleware('themedata')

Route.get('admin', 'DefaultController.login')
Route.post('admin/login', 'AuthController.login').namespace('Admin').middleware('guest')

Route.group(() => {
    Route.get('logout', 'AuthController.logout').as('logout')
    Route.get('dashboard', 'BeneficiarioController.index')

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
})
.namespace('Admin')
.prefix('admin')
.middleware('auth')

Route.group(() => {
    Route.get('beneficiarios', 'BeneficiarioController.index')
})
.namespace('Api')
.prefix('api')