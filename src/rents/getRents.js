const fetch = require("node-fetch")
const {getRentsHeaders} = require("../settings/apiSettings")


// Récupérer la liste des logements disponibles 

const getRents  = async ( data, headersSettings = getRentsHeaders) =>{
    
    const resp = await fetch("https://trouverunlogement.lescrous.fr/api/fr/search/bb452681-c0f2-11ea-8c39-005056941f86", { method: "POST", body: JSON.stringify(data), headersSettings})
    const returnData = await resp.json()

    return returnData

} 



module.exports = getRents







