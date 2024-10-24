require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(express.static("dist"));

const Person = require("./modules/phonebook");

morgan.token("post-data", (request, response) => {
  if (request.method === "POST") {
    return JSON.stringify(request.body);
  }
  return "";
});
const postLog =
  ":method :url :status :response-time ms - :res[content-length] :post-data";

app.use(
  morgan(postLog, {
    skip: (request, response) => request.method !== "POST",
  })
);

let persons = [];

const generateId = () => {
  return Math.floor(Math.random() * 1000000000);
};

app.get("/api/persons", (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});

app.get("/info", (request, response) => {
  Person.countDocuments({}).then((count) => {
    const time = new Date();
    const info = `Phonebook has info for ${count} people`;
    const infoPage = info + "<br>" + time;

    response.send(infoPage);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((note) => {
    response.json(note);
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  const personExists = persons.find((pers) => pers.name === body.name);
  if (personExists) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = new Person({
    id: generateId(),
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((pers) => pers.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
