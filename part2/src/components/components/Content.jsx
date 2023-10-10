import Part from "./components/Part";

const Content = ({ parts }) => {
  console.log(parts[0].exercises);
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};
export default Content;
