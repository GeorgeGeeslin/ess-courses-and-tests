import React, { useState } from "react";
import { INSTANCE_URL } from "../config/dev.js";

const AddCourse = props => {
  const { getCourses } = props;
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const addCourse = e => {
    e.preventDefault();
    setError("");
    fetch(INSTANCE_URL + "/api/course", {
      method: "POST",
      headers: {
        "Data-Type": "json",
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        name,
        domain,
        description
      })
    })
      .then(res => {
        setName("");
        setDomain("");
        setDescription("");
        setError(false);
      })
      .catch(res => {
        setName("");
        setDomain("");
        setDescription("");
        setError(true);
      })
      .finally(getCourses());
  };

  return (
    <div className="addCourse">
      <h2 style={{ textAlign: "center" }}>Create a new Course</h2>
      <form onSubmit={addCourse}>
        <div className="inputGroup">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={e => setName(e.target.value)}
            required
            value={name}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="domain">Domain</label>
          <input
            type="text"
            name="domain"
            onChange={e => setDomain(e.target.value)}
            value={domain}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <input type="submit" value="Add Course" className="addCourseButton" />
      </form>
      {error && (
        <div>
          <p style={{ color: "red" }}>Something went wrong. Please try again</p>
        </div>
      )}
    </div>
  );
};

export default AddCourse;
