const courseController = require("../controllers").course;
const testController = require("../controllers").test;

module.exports = app => {
  //Routes to handle CRUD for course model.
  app.post("/api/course", courseController.create);
  app.get("/api/course", courseController.findAll);
  app.put("/api/course", courseController.update);
  app.delete("/api/course", courseController.destroy);

  //Routes to handle CRUD for test model.
  app.post("/api/test", testController.create);
  app.get("/api/test", testController.findAll);
  app.put("/api/test", testController.update);
  app.delete("api/test", testController.destroy);
};
