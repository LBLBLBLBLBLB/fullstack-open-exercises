const Total = ({ parts }) => {
  const exercisesArr = parts.map((part) => part.exercises);
  const sumOfExercises = exercisesArr.reduce((a, b) => a + b, 0);
  return (
    <>
      <p>
        <strong>total of {sumOfExercises} exercises</strong>
      </p>
    </>
  );
};

export default Total;
