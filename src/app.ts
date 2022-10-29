import express = require("express")
import helloworld = require("./routes/helloworld")
import bigfile = require("./routes/bigfile")
import multer = require("multer")
const multerUpload = multer();
var healthCheck = require("./routes/healthcheck");
var upload = require("./routes/upload");
var download = require("./routes/download");


const app = express();
const port = 3000; 

// routes
app.use('/api/helloworld', helloworld);
app.use('/api/big-file', bigfile);
app.use("/api/v1/healthcheck", healthCheck);
app.use("/api/v1/upload", multerUpload.none(), upload)
app.use("/api/v1/download", download)



const start = () => {
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
  };
  
  start();
  