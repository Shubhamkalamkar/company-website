const databaseConnection = require('./utils/database.util')
const express = require('express')
const mainRoute = require('./routes/main.route')
const errorHandler = require('./controllers/error/error.controller')

const app = express();
app.use(express.json())
const port = 5000;

app.use(mainRoute)
app.use(errorHandler)

databaseConnection().then(() => {
    app.listen(port, () => {
        console.log(`server is running on port ${port}`)
    })
}).catch((err) => {
    if (err) throw err;
})