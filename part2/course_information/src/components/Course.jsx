import Header from "./components/Header";
import Content from "./components/Content";

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};
export default Course;
