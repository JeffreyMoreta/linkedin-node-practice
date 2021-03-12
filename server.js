// IMPORTS
const express = require("express");
const { students } = require("./db");

// INSTANCE
const server = express();

// FIELDS
const port = process.env.PORT || 8000;

// MIDDLEWARE
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/public", express.static(__dirname + "/public"));

// CRUD ROUTES
server.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
server.get("/students", (req, res) => res.send({ students }));

server.post(
  "/students",
  (
    {
      body: {
        "template-contactform-name": name,
        "template-contactform-role": role,
        "template-contactform-company": company,
        "template-contactform-linkedin": linkedIn,
        "template-contactform-picture": picture,
      },
    },
    res
  ) => {
    students.push({ name, role, company, linkedIn, picture });
  }
);

server.put("/students", ({ body: { index } }, res) => {
  for (student of students) {
    if (students.indexOf(student) == index) {
      console.log("Student has been found,", student.name);
      res.send({ edit: "true" });
    }
  }
}); // FINISH THIS PUT REQUREST

server.delete("/students", ({ body: { index } }, res) => {
  for (student of students) {
    if (students.indexOf(student) == index) {
      students.splice(students.indexOf(student), 1);
      res.send({ removed: "true" });
    }
  }
});

// SERVER LISTENING ON OPEN PORT
server.listen(port, () => console.log("server is listening on:", port));
