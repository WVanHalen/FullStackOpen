import { TotalProps } from "../types";

const Total = (props: TotalProps) => {
  return (
    <div>
      <b>Total number of exercises: {props.totalExercises}</b>
    </div>
  );
};

export default Total;
