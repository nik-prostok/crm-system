const Product = require("../../models/menu/ProductModel");
ObjectId = require("mongodb").ObjectID;

module.exports = {
  create: (req, res) => {
    let RequestProduct = JSON.parse(req.body.product);
    if (req.files["avatar"]) {
      RequestProduct.photo =
        "http://localhost:8081/static/" + req.files["avatar"][0].filename;
    }
    console.log(RequestProduct);
    Product.ProductModel.create(RequestProduct, function(err) {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    });
  },
  fetch: (req, res) => {
    let products = Product.ProductModel.find()
      .populate("shop")
      .populate("category")
      .exec((err, arr) => {
        if (err) {
          console.log(err);
          res.sendStatus(400);
        } else {
          res.send(arr);
        }
      });
  },
  get: (req, res) => {
    let product = Product.ProductModel.findOne({ _id: req.params.id })
      .populate("shop")
      .populate("category")
      .exec((err, product) => {
        if (err) {
          console.log(err);
          res.sendStatus(400);
        } else {
          res.send(product);
        }
      });
  },
  delete: (req, res) => {
    console.log(req.params.id);
    Product.ProductModel.findByIdAndRemove(req.params.id, err => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    });
  },
  update: (req, res) => {
    let RequestProduct = JSON.parse(req.body.product);
    if (req.files["avatar"]) {
      RequestProduct.photo =
        "http://localhost:8081/static/" + req.files["avatar"][0].filename;
    }
    Product.ProductModel.findByIdAndUpdate(
      req.params.id,
      { $set: RequestProduct },
      err => {
        if (err) {
          console.log(err);
          res.sendStatus(400);
        } else {
          res.sendStatus(200);
        }
      }
    );
  }
};
