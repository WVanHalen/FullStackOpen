import { useState } from "react";

const Statistics = (props) => {
  if (props.all == 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <table>
      <thead>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.all} />
        <StatisticLine
          text="average"
          value={(props.good - props.bad) / props.all}
        />
        <StatisticLine
          text="positive"
          value={(props.good / props.all) * 100 + "%"}
        />
      </thead>
    </table>
  );
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

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
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
};

export default App;
