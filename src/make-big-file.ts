const fs = require('fs');
const file = fs.createWriteStream('./big.file');

for(let i=0; i<= 1e6; i++) {
  file.write('This is testing the use of write streams to create a large file in small chunks in order to save memory\n');
}

file.end();