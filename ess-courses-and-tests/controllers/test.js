const test = require("../models").test;

module.exports = {
  //Create test with supplied values.
  create(req, res) {
    console.log(req.body);
    return test
      .create({
        course_id: req.body.course_id,
        name: req.body.name,
        num_of_questions: req.body.num_of_questions,
        duration: req.body.duration
      })
      .then(test => res.status(201).send(test))
      .catch(error => res.status(400).send(error));
  },
  //Retrieve all tests matching course_id.
  findAll(req, res) {
    return test
      .findAll({ where: { course_id: req.query.course_id } })
      .then(test => res.status(200).send(test))
      .catch(error => res.status(404).send(res));
  },
  //Update test by id.
  update(req, res) {
    return test
      .update(
        {
          name: req.body.name,
          num_of_questions: req.body.num_of_questions,
          duration: req.body.duration
        },
        { where: { id: req.query.id } }
      )
      .then(test => res.status(200).send(test))
      .catch(error => res.status(404).send(error));
  },
  //Delete test by id.
  destroy(req, res) {
    return test
      .destroy({
        where: { id: req.query.id }
      })
      .then(test => res.status(204).end())
      .catch(error => res.status(404).send());
  }
};
