const express = require("express");
const app = express();
const port = 3000;
const http = require("http");
const url = require("url");
const fs = require("fs");
const { exec } = require("child_process");


app.use('/', express.static(__dirname+'/dist'));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/");
});
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
    alert(`stdout: ${stdout}`);
  });
  res.redirect('http://127.0.0.1:3000/');
  res.end();
});

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
  res.redirect('http://127.0.0.1:3000/');
  res.end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


