import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const addContact = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };

      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setNewFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={newFilter} handler={handleFilterChange} />

      <h3>add a new</h3>

      <PersonForm
        addContact={addContact}
        name={newName}
        number={newNumber}
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} suodatin={newFilter} />
    </div>
  );
};

export default App;
