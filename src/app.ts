import express = require("express")
import helloworld = require("./routes/helloworld")
import bigfile = require("./routes/bigfile")

const app = express();
const port = 3000; 

// routes
app.use('/api/helloworld', helloworld);
app.use('/api/big-file', bigfile);


const start = () => {
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
  };
  
  start();
  