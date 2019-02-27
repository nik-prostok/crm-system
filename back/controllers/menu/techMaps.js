const TechMaps = require("../../models/menu/TechMapsModel");
const Modificator = require("../../models/menu/ModificatorModel");

module.exports = {
  create: (req, res) => {
    let TechMapsRequest = JSON.parse(req.body.map);
    if (req.files["avatar"]) {
      TechMapsRequest.photo =
        "http://localhost:8081/static/" + req.files["avatar"][0].filename;
    }
    console.log(TechMapsRequest.modificators);

    let modificators = [];
    TechMapsRequest.modificators.forEach(mod => {
      Modificator.ModificatorModel.create(mod, (err, instance) => {
        if (err) {
          throw err;
        } else {
          modificators.push(instance.id);
        }
      });
    });
    setTimeout(() => {
      console.log(modificators);
      TechMapsRequest.modificators = modificators;
      TechMaps.TechMapsModel.create(TechMapsRequest, function(err) {
        if (err) {
          console.log(err);
          res.sendStatus(400);
        } else {
          res.sendStatus(200);
        }
      });
    }, 500);
  },
  get: (req, res) => {
    TechMaps.TechMapsModel.findById(req.params.id)
      .populate({
        path: "ingridients.ingridient",
        populate: {
          path: "category"
        }
      })
      .populate({
        path: "modificators",
        model: "Modificator",
        populate: {
          path: "ingridients.ingridient",
          model: "Ing",
          populate: {
            path: "category"
          }
        }
      })
      .populate("category")
      .populate("shop")
      .exec((err, arr) => {
        if (err) {
          console.log(err);
          res.sendStatus(400);
        } else {
          res.send(arr);
        }
      });
  },
  fetch: (req, res) => {
    TechMaps.TechMapsModel.find()
      .populate({
        path: "ingridients.ingridient",
        populate: {
          path: "category"
        }
      })
      .populate({
        path: "modificators",
        populate: {
          path: "ingridients",
          populate: {
            path: "category"
          }
        }
      })
      .populate("category")
      .populate("shop")
      .exec((err, arr) => {
        if (err) {
          console.log(err);
          res.sendStatus(400);
        } else {
          res.send(arr);
        }
      });
  },
  delete: (req, res) => {
    console.log(req.params.id);
    TechMaps.TechMapsModel.findByIdAndRemove(req.params.id, err => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    });
  },
  update: (req, res) => {
    let TechMapsRequest = JSON.parse(req.body.map);
    console.log(req.body.map);
    if (req.files["avatar"]) {
      TechMapsRequest.photo =
        "http://localhost:8081/static/" + req.files["avatar"][0].filename;
    }
    console.log(TechMapsRequest.modificators);

    let modificators = [];
    TechMapsRequest.modificators.forEach(mod => {
      Modificator.ModificatorModel.findByIdAndUpdate(mod._id, { '$set': mod }, (err, instance) => {
        if (err) {
          throw err;
        } else {
          modificators.push(instance.id);
        }
      });
    });
    setTimeout(() => {
      console.log(modificators);
      TechMapsRequest.modificators = modificators;
      TechMaps.TechMapsModel.findByIdAndUpdate(req.params.id, { '$set': TechMapsRequest }, function(err) {
        if (err) {
          console.log(err);
          res.sendStatus(400);
        } else {
          res.sendStatus(200);
        }
      });
    }, 500);
  }
};
