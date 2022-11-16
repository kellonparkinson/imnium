const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

const { PORT } = process.env

// Paths -------------
const { home,
  gallery,
  dashboard,
  favorites,
  styles,
  mainJs,
  favJs } = require('./pathCtrl')
  
  app.get('/', home)
  app.get('/gallery', gallery)
  app.get('/dashboard', dashboard)
  app.get('/favorites', favorites)
  app.get('/styles', styles)
  app.get('/mainjs', mainJs)
  app.get('/favjs', favJs)
// -------------------
  
// Main Endpoints --------------
const { seed,
  generateImage,
  deleteResult,
  toggleFavs,
  getFavorites } = require('./controller')

app.get('/images/favorites', getFavorites)
app.post('/images/generations', generateImage)
app.delete('/images/:id', deleteResult)
app.post('/images/favorites', toggleFavs)
// ------------------------------

// Seed database ----------
app.post('/seeds33d', seed)
// ------------------------

app.listen(PORT, () => console.log(`Listening on ${PORT}`))