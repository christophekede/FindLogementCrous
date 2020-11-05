require("dotenv").config();

const { getRents, getPlaceCoords } = require("./rents");
const Mailer = require("./mailer/Mailer");

const data = {
  idTool: "bb452681-c0f2-11ea-8c39-005056941f86",
  need_aggregation: true,
  page: 1,
  pageSize: 24,
  precision: 3,
  // location: [{lon: 0.9894, lat: 49.8701}, {lon: 4.9836, lat: 46.87}],
  sector: null,
  occupationModes: ["alone"],
};

const run = async () => {
  const coordsCity = await getPlaceCoords("amiens");

  const rents = await getRents({ ...data, location: coordsCity });
  const totalRents = rents.results.total;

  // Verifier si des logements ont été trouvés
  if (totalRents > 0) {
    // Traitement pour la notification par mail

    const service = process.env.SERVICE_MAIL;

    const authCredentials = {
      user: process.env.AUTH_MAIL_USER,
      pass: process.env.AUTH_MAIL_PASSWORD,
    };

    const mailer = new Mailer({ withSMTP: true, service, authCredentials });
    mailer
      .sendMail()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  console.log(rents.results.items);
};
run();
