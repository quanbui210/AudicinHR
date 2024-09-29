const express = require('express')
const app = express()

const trackRouter = require("./router/trackRouter")
const trackAdvancedRouter = require("./router/trackAdvancedRouter")

app.use(express.json())

app.use('/api/v1', trackRouter)
app.use('/api/v2', trackAdvancedRouter)

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);  
});