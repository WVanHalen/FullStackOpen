export interface HeaderProps {
  name: string;
}

export interface ContentProps {
  courseParts: CoursePart[];
}

export interface TotalProps {
  totalExercises: number;
}

interface CoursePart {
  name: string;
  exerciseCount: number;
}
