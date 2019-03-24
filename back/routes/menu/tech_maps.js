const techMaps = require("../../controllers/menu/techMaps");
const verify = require("../../controllers/verify");
const uuidv1 = require("uuid/v1");

let multer = require("multer");

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public");
  },
  filename: function(req, file, cb) {
    cb(null, uuidv1() + ".jpg");
  }
});

let upload = multer({ storage: storage });

let cpUpload = upload.fields([{ name: "avatar", maxCount: 1 }]);

//Маршруты для регистрации и управления tech_maps
module.exports = function(app) {
  app.post("/api/map", verify, cpUpload, techMaps.create);
  app.get("/api/map", verify, techMaps.fetch);
  app.get("/api/map/:id", verify, techMaps.get);
  app.delete("/api/map/:id", verify, techMaps.delete);
  app.put("/api/map/:id", verify, cpUpload, techMaps.update);
  app.post("/api/map/:id", verify, techMaps.copy);
};
