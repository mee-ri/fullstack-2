// Otetaan express-moduuli käyttöön
var express = require("express");
var app = express();

// Määritellään porttivaihtoehdot
const port = process.env.PORT || 3000;

// Otetaan käyttöön body-parser -objekti lomakedatan lukemista varten
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Otetaan Mongoose-moduuli käyttään
var mongoose = require("mongoose");

// Otetaan mongoose_schema -moduuli käyttöön
const Customer = require("./modules/model");

// Haetaan ympäristömuuttujat .env tiedostosta
require("dotenv").config();

// Määritellään käyttäjätunnus ja salasana .env tiedostosta
var user = process.env.DB_USER;
var password = process.env.DB_PASSWORD;

// Määritellään yhteysosoite
const uri =
  "mongodb+srv://" +
  user +
  ":" +
  password +
  "@cluster0.cajdqha.mongodb.net/sales?retryWrites=true&w=majority";

// Luodaan yhteys Mongoosen avulla
const client = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Luodaan reitit

// Tulostetaan kaikki dokumentit collectionista GET-pyynnöllä
app.get("/api/getall", async (req, res) => {
  async function connect() {
    try {
      const asiakkaat = await Customer.find({});
      console.log("Kaikki asiakkaat haettu");
      res.send(asiakkaat);
    } catch (e) {
      res.status(500).json("Connection error");
      console.error(e);
    }
  }
  connect();
});

// Tulostetaan yksi dokumentti collectionista GET-pyynnöllä
app.get("/api/:id", async (req, res) => {
  var asiakasnumero = req.params.id;
  async function connect() {
    try {
      const tiettyAsiakas = await Customer.findById(asiakasnumero);
      res.status(200).json(tiettyAsiakas);
      res.send(tiettyAsiakas);
    } catch (e) {
      console.error(e);
    }
  }
  connect();
});

// Ladataan polkuun /add html-sivu, jossa pääsee lisäämään uuden dokumentin collectioniin
app.get("/add", function (req, res) {
  res.sendFile(__dirname + "/addcustomer.html");
});

// Luodaan uusi dokumentti collectioniin POST-pyynnöllä
app.post("/add", async (req, res) => {
  var asiakasnro = req.body.customerId;
  var etunimi = req.body.firstname;
  var sukunimi = req.body.lastname;
  var puhelin = req.body.phone;
  var sposti = req.body.email;
  var ika = req.body.age;

  const uusiAsiakas = new Customer({
    customer_id: asiakasnro,
    firstname: etunimi,
    lastname: sukunimi,
    phone: puhelin,
    email: sposti,
    age: ika,
  });

  try {
    await uusiAsiakas.save();
    res.status(201).json({ message: "New document succesfully added" });
    console.log("New document succesfully added");
  } catch (e) {
    console.error(e);
  }
});

// Päivitetään dokumenttia, jolla tietty id, PUT-pyynnöllä
app.put("/api/update/:id", async (req, res) => {});

// Poistetaan dokumentti, jolla tietty id, DELETE-pyynnöllä
app.delete("/api/poista/:id", async (req, res) => {
  var id = req.params.id;
  async function connect() {
    try {
      const poisto = await Customer.findByIdAndDelete(id);
      res.json("Deleted " + id + " " + results.title, 200);
    } catch (e) {
      console.error(e);
    }
  }
  connect();
});

app.get("*", function (req, res) {
  res.send("Page not found :(", 404);
});

app.listen(port, function () {
  console.log(`Server running on http://localhost:${port}`);
});
