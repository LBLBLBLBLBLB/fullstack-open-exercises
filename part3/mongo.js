const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password> [<name> <number>]"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://levanbirchadze:${password}@fso-pr.wlfje.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=fso-pr`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", phonebookSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then(() => {
    console.log(`Added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log(
    "Please provide both name and number: node mongo.js <password> <name> <number>"
  );
  process.exit(1);
}
