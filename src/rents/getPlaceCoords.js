const fetch = require("node-fetch");

const { getPlaceCoordsHeaders } = require("../settings/apiSettings");

/**
 *
 * @param {*} city
 * @param {*} headersSettings
 *
 * @return exemple : [{lon: 0.9894, lat: 49.8701}, {lon: 4.9836, lat: 46.87}]
 */
const getPlaceCoords = async (city, headersSettings = getPlaceCoordsHeaders) => {
  const resp = await fetch(
    `https://trouverunlogement.lescrous.fr/photon/api?q=${city}&limit=18&lang=fr`,
    { method: "GET", headersSettings }
  );
  const returnData = await resp.json();

  let coordsArrayParsed = [];
  if (returnData.features[0]) {
    const coordsArray = returnData.features[0].properties.extent || [];
    coordsArrayParsed =
      [
        { lon: coordsArray[0], lat: coordsArray[1] },
        { lon: coordsArray[2], lat: coordsArray[3] },
      ] || [];
  }

  return coordsArrayParsed;
};

module.exports = getPlaceCoords;
