import { useState } from "react";

const Title = ({ title }) => <h2>{title}</h2>;

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr className="table">
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, bad, neutral, all }) => {
  const average = all > 0 ? ((good - bad) / all).toFixed(2) : 0;
  const positive = all > 0 ? ((good * 100) / all).toFixed(2) : 0;

  return (
    <>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={`${positive}%`} />
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setAll(all + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
  };

  return (
    <div>
      <div>
        <Title title="give feedback" />
        <Button text="good" handleClick={handleGood} />
        <Button text="neutral" handleClick={handleNeutral} />
        <Button text="bad" handleClick={handleBad} />
      </div>
      <div>
        <Title title="statistics" />
        {all === 0 ? (
          <p>No feedback given</p>
        ) : (
          <Statistics good={good} bad={bad} neutral={neutral} all={all} />
        )}
      </div>
    </div>
  );
};

export default App;
