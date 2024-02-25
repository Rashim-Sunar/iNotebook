const express = require('express')
const app = express();
const port = 8000;
const connectTomongo = require('./db')

connectTomongo()

app.use(express.json())
//Available routes
app.use('/api/auth',require('./routes/auth'))  //whenever http://localhost:8000/api/auth is hitted, auth.js is called
app.use('/api/notes',require('./routes/notes'))

app.listen(port,()=>{
    console.log('Server listening on port: ',port);
})