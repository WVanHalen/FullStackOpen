import { ContentProps } from "../types";
import Part from "./part";

const Content = (props: ContentProps) => {
  const { courseParts } = props;

  return (
    <div>
      {courseParts.map((part) => (
        <Part part={part} />
      ))}
    </div>
  );
};

export default Content;
