const Header = ({ header }) => {
  console.log(header);
  return (
    <>
      <h2>{header}</h2>
    </>
  );
};

const Content = ({ content }) => {
  console.log("content", content);

  const total = content.reduce((sum, part) => sum + part.exercises, 0);
  console.log("total number of exercises", total);

  return (
    <div>
      {content.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <b>total of {total} exercises</b>
    </div>
  );
};

const Part = ({ part }) => {
  console.log("part", part);
  return (
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      <Content content={course.parts} />
    </div>
  );
};

export default Course;
