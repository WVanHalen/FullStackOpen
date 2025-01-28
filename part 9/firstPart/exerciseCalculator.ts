import { isNotNumber } from "./utils";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  exercises: number[];
  target: number;
}

const parseArguments = (args: string[]): ExerciseValues => {
  const data = args.splice(2);
  const processedData: number[] = [];
  for (const value of data) {
    if (isNotNumber(value)) throw new Error("Provided values are not numbers!");
    processedData.push(Number(value));
  }

  return {
    exercises: processedData.slice(0, -1),
    target: processedData[processedData.length - 1],
  };
};

const calculateExercises = (exercises: number[], target: number): Result => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter((hours) => hours > 0).length;
  const average = exercises.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  let rating = 0;
  let ratingDescription = "";
  if (average < target / 2) {
    rating = 1;
    ratingDescription = "Bad";
  } else if (average < target) {
    rating = 2;
    ratingDescription = "Meh";
  } else {
    rating = 3;
    ratingDescription = "Good";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (require.main === module) {
  try {
    const { exercises, target } = parseArguments(process.argv);
    console.log(exercises, target);
    console.log(calculateExercises(exercises, target));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}

export default calculateExercises;
