import express from "express";
import { isNotNumber } from "./utils";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { weight, height } = req.query;
  if (!weight || !height || isNotNumber(weight) || isNotNumber(height)) {
    res.status(400).json({
      error: "Malformatted parameters",
    });
  } else {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({ weight, height, bmi });
  }
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body as {
    daily_exercises: number[];
    target: number;
  };
  if (!daily_exercises || !target) {
    res.status(400).send({ error: "Parameters missing" });
    return;
  }
  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((exercise) => isNotNumber(exercise)) ||
    isNotNumber(target)
  ) {
    res.status(400).send({ error: "Malformatted parameters" });
    return;
  }
  const result = calculateExercises(daily_exercises, target);
  res.send(result);
  return;
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
