const databaseConnection = require('./utils/database.util')
const express = require('express')
const bodyParser = require('body-parser')
const mainRoute = require('./routes/main.route')
const errorHandler = require('./controllers/error/error.controller')
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
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