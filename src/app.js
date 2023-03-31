const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const clientsRoutes = require('./routes/clients')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/clients', clientsRoutes.getClients)
app.get('/client/:id', clientsRoutes.getClientById)
app.post('/client', clientsRoutes.createClient)
app.put('/client/:id', clientsRoutes.updateClient)
app.delete('/client/:id', clientsRoutes.deleteClient)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

module.exports = app