const Persons = ({ persons, suodatin, removePerson }) => {
  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(suodatin.toLowerCase())
        )
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number}{" "}
            <button onClick={() => removePerson(person.id)}>delete</button>
          </p>
        ))}
    </div>
  );
};

export default Persons;
