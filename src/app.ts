import express = require("express")
const app = express();
const port = 3000; 

// Hello World
app.get( "/", ( req, res ) => {
    res.send( "Hello world" );
} );

const start = () => {
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
  };
  
  start();
  