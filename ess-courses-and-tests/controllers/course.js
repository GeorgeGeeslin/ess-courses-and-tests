const course = require("../models").course;

module.exports = {
  //Create test with supplied values.
  create(req, res) {
    return course
      .create({
        name: req.body.name,
        domain: req.body.domain,
        description: req.body.description
      })
      .then(course => res.status(201).send(course))
      .catch(error => res.status(400).send(error));
  },
  //Retrieve all courses, or provide id to retrieve a single course.
  findAll(req, res) {
    let whereCondition = {};
    if (req.query.id) {
      whereCondition = { where: { id: req.query.id } };
    }
    return course
      .findAll(whereCondition)
      .then(course => res.status(200).send(course))
      .catch(error => res.status(404).send(error));
  },
  //Update course by id.
  update(req, res) {
    return course
      .update(
        {
          name: req.body.name,
          domain: req.body.domain,
          description: req.body.description
        },
        { where: { id: req.query.id } }
      )
      .then(course => res.status(200).send(course))
      .catch(error => res.status(404).send(error));
  },
  //Delete course by id. Associated tests will be deleted as well due to foreign key cascade on delete.
  destroy(req, res) {
    return course
      .destroy({
        where: { id: req.query.id }
      })
      .then(course => res.status(204).end())
      .catch(error => res.status(404).send(error));
  }
};
