import { useState } from "react";
const Button = ({ text, functionRef }) => {
  return <button onClick={functionRef}> {text} </button>;
};
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [points, setPoints] = useState([1, 4, 6, 3, 4, 7, 8, 9]);

  const [selected, setSelected] = useState(
    Math.floor(Math.random() * anecdotes.length)
  );

  const getRandomAnecdoteIndex = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * anecdotes.length);
    } while (randomIndex === selected);

    setSelected(randomIndex);
  };

  const changeAnedocte = () => {
    getRandomAnecdoteIndex();
  };

  const addPoints = () => {
    setPoints((prevPoints) => {
      const newPoints = [...prevPoints];
      newPoints[selected]++;
      return newPoints;
    });
  };

  return (
    <>
      <h1>Anecdote of the Day</h1>
      <div>{anecdotes[selected]}</div>
      <div> has {points[selected]} points</div>
      <Button text="Vote" functionRef={addPoints} />
      <Button text="Next Anecdote" functionRef={changeAnedocte} />

      <h1>Anecdote with the most votes</h1>
      <p>
        {anecdotes[points.findIndex((point) => point === Math.max(...points))]}{" "}
        has {Math.max(...points)} points
      </p>
    </>
  );
};

export default App;
