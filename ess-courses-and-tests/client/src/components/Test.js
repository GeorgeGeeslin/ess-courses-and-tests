import React from "react";
import { INSTANCE_URL } from "../config/dev.js";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Test = props => {
  const { name, numQuestions, durration, id } = props.test;
  const { index, getTests, even } = props;

  const deleteTest = () => {
    fetch(INSTANCE_URL + "/api/test?id=" + id, {
      method: "DELETE",
      headers: {
        "Data-Type": "json",
        "Content-Type": "application/json;"
      }
    })
      .then(res => getTests())
      .catch(error => console.log(error));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        paddingBottom: "8px",
        paddingTop: "8px"
      }}
      className={even ? "evenTest" : undefined}
    >
      <div>Name: {name}</div>
      <div>Num of Questions: {numQuestions}</div>
      <div>Durration: {durration}</div>
      <IoIosCloseCircleOutline
        style={{ fontSize: "1.5em", cursor: "pointer" }}
        onClick={deleteTest}
      />
    </div>
  );
};

export default Test;
