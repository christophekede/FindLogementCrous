const {getRents, getPlaceCoords} = require("./rents")


data = {
    idTool: "bb452681-c0f2-11ea-8c39-005056941f86",
    need_aggregation: true,
    page: 1,
    pageSize: 24,
    precision: 3,
   // location: [{lon: 0.9894, lat: 49.8701}, {lon: 4.9836, lat: 46.87}],
    sector:null,
    occupationModes:["alone"]
  
}


const run = async ()=>{
    const coordsCity =  await getPlaceCoords("beauvais")

     const rents = await getRents({...data, location:coordsCity})
     console.log(rents)
   
  

}
run()