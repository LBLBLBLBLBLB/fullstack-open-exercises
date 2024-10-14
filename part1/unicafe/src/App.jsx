import { useState } from "react";

const Button = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const averageFeedback = total > 0 ? (good - bad) / total : 0;
  const positivePercentage = total > 0 ? (good / total) * 100 : 0;

  return (
    <div>
      <h2>Statistics</h2>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <td>Good</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>Neutral</td>
              <td>{neutral}</td>
            </tr>
            <tr>
              <td>Bad</td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{total}</td>
            </tr>
            <tr>
              <td>Average</td>
              <td>{averageFeedback.toFixed(1)}</td>
            </tr>
            <tr>
              <td>Positive</td>
              <td>{`${positivePercentage.toFixed(1)} %`}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (setName, name) => {
    const handler = () => {
      setName(name + 1);
    };
    return handler;
  };

  return (
    <>
      <h2>give Feedback</h2>
      <div>
        <Button onClick={handleClick(setGood, good)} text="good" />
        <Button onClick={handleClick(setNeutral, neutral)} text="neutral" />
        <Button onClick={handleClick(setBad, bad)} text="bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
