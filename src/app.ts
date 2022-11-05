import express = require("express")
import helloworld = require("./routes/helloworld")
import bigfile = require("./routes/bigfile")
var fs = require("fs");

var healthCheck = require("./routes/healthcheck");
var upload = require("./routes/upload");
var download = require("./routes/download");


const app = express();
const port = 3000; 

//middleware
app.use(express.json());

let cache: any = {};
cache.data = [];

// routes
app.use('/api/helloworld', helloworld);
app.use('/api/big-file', bigfile);
app.use("/api/v1/healthcheck", healthCheck);
app.use("/api/v1/upload", upload(cache))
app.use("/api/v1/download", download(cache))


const start = () => {
      // read from the data file if it exists, and add it's contents to the cache above
      if (fs.existsSync('./uploads/data.csv')) {
        fs.readFileSync('./uploads/data.csv', 'utf8').split("\n").forEach((row: string) => {
          cache.data.push(row);
        });
      }
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
  };
  
  start();
  