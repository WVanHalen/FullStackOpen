/* eslint-disable react/prop-types */
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from "../queries";
import Select from "react-select";

const EditBirthyear = ({ authors }) => {
  const [born, setBorn] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const options = authors.map((author) => {
    return {
      value: author.name,
      label: author.name,
    };
  });

  const [editAuthor] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({
      variables: { name: selectedOption.value, setBornTo: parseInt(born) },
    });

    setSelectedOption(null);
    setBorn("");
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default EditBirthyear;
