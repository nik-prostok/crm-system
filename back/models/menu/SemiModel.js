var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SemiSchema = new Schema({
  title: {
    type: String,
    reqired: true
  },
  process_cooking: [
    {
      type: Number
    }
  ],
  sum_mass: {
    type: Number
  },
  price: {
    type: Number
  },
  ingridients: [
    {
      ingridient: {
        type: Schema.Types.ObjectId,
        ref: "Ing"
      },
      bind: {
        type: Boolean
      },
      netto: {
        type: Schema.Types.Decimal128
      },
      brutto: {
        type: Schema.Types.Decimal128
      },
      method_cooking: [
        {
          _id: {
            type: Number
          },
          title: {
            type: String
          }
        }
      ]
    }
  ]
});

module.exports = {
  SemiModel: mongoose.model("Semi", SemiSchema)
};
