import React, { useState, useEffect } from "react";
import { INSTANCE_URL } from "../config/dev.js";
import AddTest from "./AddTest";
import Test from "./Test";

const Course = props => {
  const { name, domain, description, id } = props.course;
  const { getCourses } = props;
  const [tests, setTests] = useState([]);
  const [testComponents, setTestComponents] = useState([]);
  const [error, setError] = useState(false);

  const deleteCourse = () => {
    fetch(INSTANCE_URL + "/api/course?id=" + id, {
      method: "DELETE",
      headers: {
        "Data-Type": "json",
        "Content-Type": "application/json;"
      }
    })
      .then(res => getCourses())
      .catch(error => console.log(error));
  };

  const buildTestComponents = () => {
    const testComponents = tests.map((test, index) => {
      let even;
      if (index % 2 === 0) {
        even = true;
      } else {
        even = false;
      }
      return <Test key={test.id} test={test} index={index} even={even} />;
    });
    setTestComponents(testComponents);
  };

  const getTests = () => {
    fetch(INSTANCE_URL + "/api/test?course_id=" + id, {
      method: "GET",
      headers: {
        "Data-Type": "json",
        "Content-Type": "application/json;"
      }
    })
      .then(res => res.json())
      .catch(error => setError(true))
      .then(body => {
        if (tests.toString() !== body.toString()) {
          setTests(body);
        }
      })
      .then(buildTestComponents);
  };

  useEffect(
    () => {
      getTests();
    },
    [tests]
  );

  return (
    <div className="course">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center"
        }}
      >
        <div>
          <p>Name: {name}</p>
          <p>Domain: {domain}</p>
          <p>Description: {description}</p>
        </div>
        <div onClick={deleteCourse} style={{ cursor: "pointer" }}>
          X
        </div>
      </div>
      <div>
        {testComponents}
        <AddTest getTests={getTests} id={id} />
      </div>
    </div>
  );
};

export default Course;
