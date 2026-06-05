const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "students.json");

const studentData = [
  {
    id: 1,
    name: "Alice Johnson",
    age: 20,
    course: "Computer Science",
    grades: {
      math: 90,
      programming: 95,
    },
  },
  {
    id: 2,
    name: "Bob Smith",
    age: 22,
    course: "Data Science",
    grades: {
      statistics: 88,
      machine_learning: 92,
    },
  },
  {
    id: 3,
    name: "Carol Williams",
    age: 21,
    course: "Web Development",
    grades: {
      html: 95,
      javascript: 89,
    },
  },
];

function writeStudentsSync() {
  fs.writeFileSync(
    filePath,
    JSON.stringify(studentData)
  );

  console.log("Students written successfully");
}

//writeStudentsSync();

function readStudentsSync() {
  const data = fs.readFileSync(filePath, "utf8");

  const students = JSON.parse(data);

  console.log(students);
}

//readStudentsSync();

function writeStudentsAsync() {
  fs.writeFile(
    filePath,
    JSON.stringify(studentData),
    (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Students written successfully ");
    }
  );
}

//writeStudentsAsync();

function readStudentsAsync() {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const students = JSON.parse(data);

    console.log(students);
  });
}


readStudentsAsync();


function addStudent(std) {
  const data = fs.readFileSync(filePath, "utf8");

  if (!data.trim()) {
    console.log("is empty");
    return;
  }

  const students = JSON.parse(data);

  students.push(std);

  fs.writeFileSync(
    filePath,
    JSON.stringify(students, null, 2)
  );

  console.log("Student added successfully");
}
/*
addStudent(
    {   
         id: 4,
         name: "Ahmed Faheem", 
         age: 23, 
         course: "Software Engineering", 
         grades: { html: 55, databases: 90, }, 
        }
    );

    */