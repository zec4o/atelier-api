const pool = require("../../db/queries");

const getClients = (req, res) => {
  pool.query('SELECT * FROM clients ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const getClientById = (req, res) => {
  const id = (req.params.id)

  pool.query('SELECT * FROM clients WHERE id = $1', [id], (error, results) => {
    if(error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const createClient = (req, res) => {
  const { name, email, phone, cpf, born_date, instagram } = req.body
  const { cep, city, state, district, street, apartment_number } = req.body
  const clientValues = [name, email, phone, cpf, born_date, instagram, cep, city, state, district, street, apartment_number ]

  pool.query('INSERT INTO clients (name, email, phone, cpf, born_date, instagram, cep, city, state, district, street, apartment_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *', clientValues, (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).json(results.rows[0])
  })
}

const updateClient = (req, res) => {
  const id = req.params.id
  const { name, email, phone, cpf, born_date, instagram } = req.body
  const { cep, city, state, district, street, apartment_number } = req.body
  const clientValues = [ id, name, email, phone, cpf, born_date, instagram, cep, city, state, district, street, apartment_number ]

  pool.query(
    'UPDATE clients SET name = $2, email = $3, phone = $4, cpf = $5, born_date = $6, instagram = $7, cep = $8, city = $9, state = $10, district = $11, street = $12, apartment_number = $13 WHERE id = $1 RETURNING *', clientValues,
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).json(results.rows[0])
    }
  )
}

const deleteClient = (req, res) => {
  const id = req.params.id

  pool.query('DELETE FROM clients WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(204).send(`No content`)
  })
}

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
}