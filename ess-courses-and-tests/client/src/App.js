import React, { Component } from "react";
import Header from "./components/Header";
import CourseWindow from "./components/CourseWindow";
import AddCourse from "./components/AddCourse";
import Course from "./components/Course";
import { INSTANCE_URL } from "./config/dev.js";

export default class App extends Component {
  state = {
    courses: [],
    courseComponents: [],
    coursesError: false
  };

  componentDidMount() {
    this.getCourses();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.courses !== prevState.courses) {
      console.log("new courses on update!");
      this.buildCourseComponents(this.state.courses);
    }
  }

  buildCourseComponents = courses => {
    if (this.state.courses.length > 0) {
      console.log("building course components");
      const courseComponents = courses.reverse().map((course, index) => {
        return (
          <Course getCourses={this.getCourses} course={course} key={index} />
        );
      });
      this.setState({ courseComponents: courseComponents });
    } else {
      this.setState({ courseComponents: [] });
    }
  };

  getCourses = () => {
    console.log("getting courses...");
    fetch(INSTANCE_URL + "/api/course", {
      method: "GET",
      headers: {
        "Data-Type": "json",
        "Content-Type": "application/json;"
      }
    })
      .then(res => res.json())
      .then(body => {
        console.log("courses retrived", body);
        console.log("set courses as state in App");
        if (body !== undefined) {
          this.setState({
            courses: body,
            coursesError: false
          });
        }
      })
      .catch(error => this.setState({ coursesError: true }));
  };

  render() {
    const { courseComponents, coursesError } = this.state;
    return (
      <div>
        <Header />
        <div className="mainWrapper">
          <CourseWindow
            error={coursesError}
            courseComponents={courseComponents}
          />
          <AddCourse getCourses={this.getCourses} />
        </div>
      </div>
    );
  }
}
