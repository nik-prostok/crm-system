const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ProductSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  count:String,
  gross_turnover: String,
  discount: String,
  receipts: String,
  profit: String,
  category_id: String
})
const ProductModel = mongoose.model('products', ProductSchema)
module.exports = ProductModel
