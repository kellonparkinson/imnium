const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

const { generateImage } = require('./controller')

// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//     apiKey: "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",
// });
  
// const openai = new OpenAIApi(configuration);


// openai endpoints: /images/generations
                //   /images/edits
                //   /images/variations

// app.get('/hello', (req, res) => {
//   console.log('hello is working')
//   res.send('got the response')
// })

app.post('/images/generations', generateImage)


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