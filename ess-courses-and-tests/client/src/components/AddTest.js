import React, { useState } from "react";
import { INSTANCE_URL } from "../config/dev.js";
import { IoIosAddCircle, IoIosCloseCircle } from "react-icons/io";

const AddTest = props => {
  const { getTests, id } = props;
  const [name, setName] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(false);
  const [formActive, setFormActive] = useState(false);

  const addTest = e => {
    e.preventDefault();
    fetch(INSTANCE_URL + "/api/test", {
      method: "POST",
      headers: {
        "Data-Type": "json",
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        course_id: id,
        name,
        num_of_questions: numQuestions,
        duration
      })
    })
      .then(res => {
        setName("");
        setNumQuestions("");
        setDuration("");
        setError(false);
      })
      .catch(res => {
        setName("");
        setNumQuestions("");
        setDuration("");
        setError(true);
      })
      .finally(getTests());
  };

  return (
    <div className="addTest">
      <p style={{ textAlign: "center" }}>Add A New Test</p>
      {formActive ? (
        <form onSubmit={addTest}>
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
            <label htmlFor="numQuestions">Number of Questions</label>
            <input
              type="number"
              min="0"
              max="9999"
              name="numQuestions"
              onChange={e => setNumQuestions(e.target.value)}
              value={numQuestions}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="duration">Duration</label>
            <input
              type="text"
              name="duration"
              onChange={e => setDuration(e.target.value)}
              value={duration}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <input type="submit" value="Add Test" className="addTestButton" />
            <IoIosCloseCircle
              style={{ fontSize: "2em", cursor: "pointer" }}
              onClick={() => setFormActive(false)}
            />
          </div>
        </form>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "2em",
            cursor: "pointer"
          }}
          onClick={() => setFormActive(true)}
        >
          <IoIosAddCircle />
        </div>
      )}
      {error && (
        <div>
          <p style={{ color: "red" }}>Something went wrong. Please try again</p>
        </div>
      )}
    </div>
  );
};

export default AddTest;
