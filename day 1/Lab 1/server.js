const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "students.json");

//console.log(__dirname);
//return;

const server = http.createServer(async (req, res) => {
 

  try {
    const data = await fs.readFile(filePath, "utf8");
    const students = JSON.parse(data);

    if (req.url === "/students") {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(JSON.stringify(students));
    }

    else if (req.url === "/stats") {
      const stats = {
        totalStudents: students.length,
      };

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(JSON.stringify(stats));
    }

    else if (req.url === "/courses") {
      const courses = [...new Set(
        students.map((student) => student.course)
      )];

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(JSON.stringify(courses));
    }
    else {
      res.writeHead(404, {
        "Content-Type": "text/plain",
      });

      res.end("Not Found");
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});