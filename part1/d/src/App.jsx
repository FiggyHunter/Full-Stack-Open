import { useState } from "react";

const Button = ({ text, functionRef }) => {
  return <button onClick={functionRef}> {text} </button>;
};

const Stats = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / total || 0;
  const positive = (good / total) * 100 || 0;

  return (
    <>
      <h2> Statistics </h2>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {total}</p>
      <p>Average {average}</p>
      <p>Positive {positive} %</p>
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
