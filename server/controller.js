const allImgURLs = require('./db.json')

require('dotenv').config()

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "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",
});
  
const openai = new OpenAIApi(configuration);

module.exports = {
    generateImage: async (req, res) => {
        const { prompt, n, size } = req.body
      
        const response = await openai.createImage({
            prompt,
            n,
            size
        });
      
        let imageURLs = [
          response.data.data[0].url,
          response.data.data[1].url,
          response.data.data[2].url,
        ]

        // let newURL = {
        //     id: nextId,
        //     url: response.data.data[0].url
        // }
        res.send(imageURLs)
    },
    deleteResult: (req, res) => {

    }
}