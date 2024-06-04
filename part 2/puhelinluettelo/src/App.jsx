import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addContact = (event) => {
    event.preventDefault();
    const personToAdd = persons.filter((person) => person.name === newName);
    const updatedPerson = { ...personToAdd[0], number: newNumber };
    console.log("person to add", personToAdd);
    console.log("updated person", updatedPerson);

    if (personToAdd.length !== 0) {
      if (
        window.confirm(
          `${updatedPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        console.log("Päivityksessä mennään");
        personService
          .update(updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : returnedPerson
              )
            );
            setMessage(`Updated number for ${updatedPerson.name}`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setMessage(
              `Information of ${updatedPerson.name} has already been removed from server`
            );
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setPersons(
              persons.filter((person) => person.id !== updatedPerson.id)
            );
          });
        setNewName("");
        setNewNumber("");
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(nameObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setMessage(`Added ${newName}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.log(error.response.data);
          setMessage(error.response.data.error);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
  };

  const removePerson = (id) => {
    console.log(id);
    const personToRemove = persons.filter((person) => person.id === id);
    console.log(personToRemove);
    const name = personToRemove[0].name;
    console.log(name, id);
    if (window.confirm(`Delete ${name}?`)) {
      console.log("Go now, and never come back");
      personService.remove(id);
      setPersons(persons.filter((person) => person.id !== id));
      setMessage(`Deleted ${name}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setNewFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

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

      <Persons
        persons={persons}
        suodatin={newFilter}
        removePerson={removePerson}
      />
    </div>
  );
};

export default App;
