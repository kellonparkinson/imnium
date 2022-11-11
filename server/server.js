const express = require('express')
const cors = require('cors')
require('dotenv').config()

// const corsOption = {
//   origin: "http://localhost:4040",
//   credentials: true,
//   optionSuccessStatus: 200
// }

const app = express()
app.use(express.json())
// app.use(cors(corsOption))
app.use(cors())

// const { generateImage } = require('./controller')

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
  
const openai = new OpenAIApi(configuration);


// openai endpoints: /images/generations
                //   /images/edits
                //   /images/variations

// app.get('/hello', (req, res) => {
//   console.log('hello is working')
//   res.send('got the response')
// })

// app.post('/images/generations', generateImage)
app.post('/images/generations', async (req, res) => {
  const { prompt, n, size } = req.body

  const response = await openai.createImage({
      prompt, // 1000 character max
      n, // number of images generated per request
      size // smaller is faster (256x256, 512x512, 1024x1024)
  });

  let imageURLs = [
    response.data.data[0].url,
    response.data.data[1].url,
    response.data.data[2].url,
  ]
  res.send(imageURLs)
  console.log(imageURLs)
})


// Example of an image edit (uses /images/edits)
// NOTE: this is only for masking

  // const response = await openai.createImageEdit(
  //   fs.createReadStream("sunlit_lounge.png"),
  //   fs.createReadStream("mask.png"),
  //   "A sunlit indoor lounge area with a pool containing a flamingo",
  //   1,
  //   "1024x1024"
  // );

  // image_url = response.data.data[0].url;
//-------------------------------------------

// Image variations (uses /images/variations)
  // const response = await openai.createImageVariation(
  //   fs.createReadStream("corgi_and_cat_paw.png"),
  //   1,
  //   "1024x1024"
  // );

  // image_url = response.data.data[0].url;
//-------------------------------------------
const PORT = 4040
app.listen(PORT, () => console.log(`Listening on ${PORT}`))