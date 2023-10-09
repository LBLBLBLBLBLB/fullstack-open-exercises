import Part from "./Part";
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, i) => (
        <Part parts={part} key={i} />
      ))}
    </div>
  );
};
export default Content;
