import { useState } from "react";

const Button = ({ text, functionRef }) => {
  return <button onClick={functionRef}> {text} </button>;
};

const Stats = ({ good, neutral, bad }) => {
  return (
    <>
      <h2> Statistics </h2>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
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
