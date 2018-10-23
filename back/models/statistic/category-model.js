const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CategorySchema = new Schema({
  category_title: {
    type: String,
    unique: true
  }
})
const CategoryModel = mongoose.model('categorys', CategorySchema)
module.exports = CategoryModel
