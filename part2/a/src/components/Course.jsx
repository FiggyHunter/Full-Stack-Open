import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

export default function Course({ course }) {
  return (
    <>
      <Header name={course.name} />
      <Content course={course} />
      <Total parts={course.parts} />
    </>
  );
}
