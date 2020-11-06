// Headers de la requete POST https://trouverunlogement.lescrous.fr/api/fr/search/bb452681-c0f2-11ea-8c39-005056941f86
// Pour récupérer la liste des logements disponibles

const commonHeaders = {
  "User-Agent":
    "Request-Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36",
  Host: "trouverunlogement.lescrous.fr",
  origin: "https://trouverunlogement.lescrous.fr/",
  Connection: "keep-alive",
  Pragma: "no - cache",
  "Cache-Control": "no- cache",
  DNT: 1,
  "Upgrade-Insecure-Requests": 1,
  Accept:
    "text / html, application / xhtml + xml, application / xml; q = 0.9, image / avif, image / webp, image / apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  "Sec-Fetch-Site": "same-origin",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Dest": "empty",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "fr - FR, fr; q = 0.9, en - US; q = 0.8, en; q = 0.7",
};

const getRentsHeaders = {
  ...commonHeaders,
  "Content-Type": "application/json",
};

const getPlaceCoordsHeaders = {
  ...commonHeaders,
  Accept: "*/*",
};

module.exports = {
  getRentsHeaders,
  getPlaceCoordsHeaders,
};
