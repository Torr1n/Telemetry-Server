import express from 'express';
import * as http from 'http';
import * as socketio from "socket.io";
import * as fs from 'fs';
import * as path from 'path';

let healthCheck = require("./routes/api/v1/healthcheck");
let upload = require("./routes/api/v1/upload");
let start = require("./routes/api/v1/start");
let download = require("./routes/api/v1/download");
let dashboard = require("./routes/dashboard/home");


const port = 3000; 

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  },
  allowEIO3: true
});

//middleware
app.use(express.json());
app.use("/public", express.static(__dirname + '/public'))

let cache: any = {};

const warmCache = async () => {

  const files = await fs.promises.readdir( __dirname + "/runs" );

  for (const file of files) {
      // Get the full paths
      const fullPath = path.join( __dirname + "/runs", file );

      let data = await fs.promises.readFile(fullPath, "utf8");

      cache[file] = {data: [data]};
  }
}

let currentRun = "";

let createRun = (runId: string) => {
  currentRun = runId;
  fs.writeFileSync(__dirname + "/runs/" + runId + ".csv", "");
  cache[runId + ".csv"] = {data: []};
}

let appendRun = (data: string) => {
  fs.appendFileSync(__dirname + "/runs/" + currentRun + ".csv", data);
  cache[currentRun + ".csv"].data.push(data);
  io.emit(currentRun, data);
}

// routes
app.use("/api/v1/healthcheck", healthCheck);
app.use("/api/v1/upload", upload(appendRun))
app.use("/api/v1/start", start(createRun))
app.use("/api/v1/download", download(cache))
app.use("/dashboard/home", dashboard);


// websockets
io.on("connection", function(socket: any) {
  console.log("a user connected");
  // whenever we receive a 'message' we log it out
});

const startServer = async () => {

      await warmCache();

      console.log(cache);

      server.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
  };
  
startServer();
  