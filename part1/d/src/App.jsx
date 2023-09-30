import { useState } from "react";

const Button = ({ text, functionRef }) => {
  return <button onClick={functionRef}> {text} </button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  );
};

const Stats = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / total || 0;
  const positive = (good / total) * 100 || 0;

  return (
    <>
      {total !== 0 && (
        <>
          <h2>Statistics</h2>
          <table>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={total} />
            <StatisticLine text="avetage" value={average} />
            <StatisticLine text="positive" value={positive + " %"} />
          </table>
        </>
      )}
      {total === 0 && <p> No feedback given. </p>}
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood((prevGood) => prevGood + 1);
  };

  const handleNeutral = () => {
    setNeutral((prevNeutral) => prevNeutral + 1);
  };

  const handleBad = () => {
    setBad((prevBad) => prevBad + 1);
  };

  return (
    <>
      <Button text={"good"} functionRef={handleGood} />
      <Button text={"neutral"} functionRef={handleNeutral} />
      <Button text={"bad"} functionRef={handleBad} />
      <Stats good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
