'use strict'

const fetch = use('node-fetch')
const {URL} = use('url')
const BeneficiarioHook = exports = module.exports = {}

BeneficiarioHook.getAdressCoordinates = async (modelInstance) => {
    if (modelInstance.cep && modelInstance.rua && modelInstance.bairro) {
        const service_url = new URL("http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates")
        service_url.searchParams.append('countryCode', 'BR')
        service_url.searchParams.append('region', 'Amazonas')
        service_url.searchParams.append('city', 'Manaus')
        service_url.searchParams.append('postal', modelInstance.cep)
        service_url.searchParams.append('address', modelInstance.rua)
        service_url.searchParams.append('neighborhood', modelInstance.bairro)
        service_url.searchParams.append('outFields', 'addr_type')
        service_url.searchParams.append('f', 'pjson')
        
        try {
            const res = await fetch(service_url)
            const data = await res.json()
            
            if (data.candidates) {
                let candidate

                if (data.candidates[0].score > 85) {
                    candidate = data.candidates[0]
                }

                if (candidate) {
                    const coords = candidate.location.x.toFixed(6) + ";" + candidate.location.y.toFixed(6)
                    modelInstance.coordenadas = coords
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }
}
