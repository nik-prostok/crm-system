var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  title: {
    type: String,
    reqired: true
  },
  bar_code: {
    type: String
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  shop: {
    type: Schema.Types.ObjectId,
    ref: "Shop",
    required: true
  },

  isMod: {
    type: Boolean,
    required: true,
    default: false
  },

  color: {
    type: String
  },
  photo: {
    type: String
  },

  weight_goods: {
    type: Boolean,
    required: true
  },
  no_dicsount: {
    type: Boolean,
    required: true
  },
  types: {
    type: Boolean,
    required: true,
    default: true
  },
  isHidden: {
    type: Boolean
  },

  self_cost: {
    type: Number
  },
  SKU: {
    type: Number
  },
  price: {
    type: Number
  },
  profit: {
    type: Number
  },
  markup: {
    type: Number
  },

  modification: [
    {
      bar_code: String,
      title_mode: String,
      self_cost: Number,
      markup: Number,
      price: Number,
      profit: Number,
      types: {
        type: Boolean,
        default: false
      },
      isMod: {
        type: Boolean,
        required: true,
        default: true
      }
    }
  ]
});

module.exports = {
  ProductModel: mongoose.model("Product", ProductSchema)
};
