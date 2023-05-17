const express = require("express");
const app = express();
const port = 3000;
const http = require("http");
const url = require("url");
const fs = require("fs");
const { exec } = require("child_process");

// Routing for app

// get static content
app.use("/", express.static(__dirname + "/dist"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/");
});

// retrieve data from mongodb (execute export batch file)
app.get("/retrieve", function (req, res) {
  const batchFilePath = __dirname + "\\batch\\export.bat";
  exec(batchFilePath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing batch file: ${error}`);
      alert(`Error executing batch file: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
  res.redirect(`http://127.0.0.1:3000/loading?action=export`);
  res.end();
});

// import data into mongodb (execute import batch file)
app.get("/import", function (req, res) {
  const batchFilePath = __dirname + "\\batch\\import.bat";
  exec(batchFilePath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing batch file: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
  res.redirect(`http://127.0.0.1:3000/loading?action=import`);
  res.end();
});

// loading page
app.get("/loading", function (req, res) {
  res.sendFile(__dirname + "/public/loading/loading.html");
});
// create server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
