const Persons = ({ persons, suodatin }) => {
  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(suodatin.toLowerCase())
        )
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
    </div>
  );
};

export default Persons;
