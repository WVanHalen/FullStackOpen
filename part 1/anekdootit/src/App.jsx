import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const [most, setMost] = useState(0);

  const handleVote = () => {
    const copy = { ...points };
    copy[selected] += 1;
    if (copy[selected] > copy[most]) {
      setMost(selected);
    }
    setPoints(copy);
  };

  const handleNext = () => {
    let numero = Math.floor(Math.random() * anecdotes.length);
    setSelected(numero);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleNext} text="next anecdode" />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[most]}</p>
      <p>has {points[most]} votes</p>
    </div>
  );
};

export default App;
