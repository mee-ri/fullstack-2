// Otetaan Mongoose-moduuli käyttään
var mongoose = require("mongoose");

// Määritellään Schema
const customerSchema = new mongoose.Schema({
  customer_id: Number,
  firstname: String,
  lastname: String,
  phone: String,
  email: String,
  age: Number,
});

// Luodaan Customer-niminen malli
module.exports = mongoose.model("Customer", customerSchema, "customers");
