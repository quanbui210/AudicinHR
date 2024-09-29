const express = require('express')
const app = express()

const trackRouter = require("./router/trackRouter")

app.use(express.json())

app.use('/api/v1', trackRouter)


const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);  
});