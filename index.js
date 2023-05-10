// Otetaan express-moduuli käyttöön
var express = require("express");
var app = express();

// Otetaan käyttöön body-parser -objekti lomakedatan lukemista varten
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Määritellään porttivaihtoehdot
const port = process.env.PORT || 3000;

//Otetaan MongoDB-moduuli käyttöön
const MongoClient = require("mongodb").MongoClient;

// Otetaan Mongoose-moduuli käyttään
var mongoose = require("mongoose");

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
  "@cluster0.cajdqha.mongodb.net/?retryWrites=true&w=majority";

// Luodaan yhteysolio
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Luodaan yhteysfunktio
async function connect() {
  try {
    await client.connect();
    console.log("Connected to database successfully");
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

// Kutsutaan ylläolevaa funktiota ja luodaan yhteys
connect();

// Yhdistetään tietokantaan
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log("Yhteys onnistuneesti muodostettu MongoDB-tietokantaan!");
