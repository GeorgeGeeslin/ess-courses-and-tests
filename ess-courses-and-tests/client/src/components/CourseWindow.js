import React from "react";

const CourseWindow = props => {
  const { courseComponents } = props;

  return (
    <div className="courseWindow">
      {props.error && (
        <p style={{ color: "red" }}>
          Unable to retreive courses. Please try again
        </p>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        {courseComponents == false ? (
          <p style={{ marginLeft: "5px" }}>
            No Courses Found. Use the form to add some.
          </p>
        ) : (
          courseComponents
        )}
      </div>
    </div>
  );
};

export default CourseWindow;
