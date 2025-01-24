interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values are not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / Math.pow(height / 100, 2);
  if (bmi < 18.5) return "Underweight";
  if (bmi <= 24.9) return "Normal range";
  if (bmi <= 29.9) return "Overweight";
  if (bmi >= 30) return "Obese";
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something went wrong";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
