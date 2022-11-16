const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

const { PORT } = process.env
const { seed, generateImage, deleteResult, toggleFavs, getFavorites, testGet } = require('./controller')

// openai endpoints: /images/generations
                //   /images/edits
                //   /images/variations

// app.get('/hello', (req, res) => {
//   console.log('hello is working')
//   res.send('got the response')
// })
app.post('/seeds33d', seed)

app.get('/images/test', testGet)
app.get('/images/favorites', getFavorites)
app.post('/images/generations', generateImage)
app.delete('/images/:id', deleteResult)
app.post('/images/favorites', toggleFavs)

// Image variations (uses /images/variations)
  // const response = await openai.createImageVariation(
  //   fs.createReadStream("corgi_and_cat_paw.png"),
  //   1,
  //   "1024x1024"
  // );

  // image_url = response.data.data[0].url;
//-------------------------------------------
app.listen(PORT, () => console.log(`Listening on ${PORT}`))