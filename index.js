const http = require("http");
const fs = require("fs"); // Corrected the variable name
const port = 8080;

// Fixed function capitalization and method names
const myServer = http.createServer((request, response) => {
  const log = `${Date.now()}: New request received\n`;

  // Fixed method and syntax for appending to a file
  fs.appendFile("log.txt", log, (err) => {
    // Corrected file name and callback syntax
    if (err) {
      console.log("Error occurred:", err);
      response.statusCode = 500; // Corrected property name
      response.end("Internal Server Error");
      return;
    }

    response.end("Hello from the server");
  });
});

// Fixed function call to start the server
myServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
