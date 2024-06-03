require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/person");

app.use(express.json());
app.use(express.static("dist"));
app.use(cors());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post_data"
  )
);

morgan.token("post_data", (request) => {
  return request.method === "POST" ? JSON.stringify(request.body) : "";
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/info", (request, response) => {
  const currentDate = new Date();
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p> <p>${currentDate}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;

  if (!name) {
    return response.status(400).json({
      error: "Name missing",
    });
  }

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
