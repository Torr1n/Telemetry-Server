import express = require("express")
import helloworld = require("./routes/helloworld")
import bigfile = require("./routes/bigfile")
var healthCheck = require("./routes/healthcheck");


const app = express();
const port = 3000; 

// routes
app.use('/api/helloworld', helloworld);
app.use('/api/big-file', bigfile);
app.use("/api/v1/healthcheck", healthCheck);


const start = () => {
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
  };
  
  start();
  