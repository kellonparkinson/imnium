require('dotenv').config()

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
  
const openai = new OpenAIApi(configuration);

module.exports = {
    generateImage: async (req, res) => {
        const { prompt, n, size } = req.body

        const response = await openai.createImage({
            prompt, // 1000 character max
            n, // number of images generated per request
            size // smaller is faster (256x256, 512x512, 1024x1024)
        });

        // res.send(response)
        console.log(response)
        console.log(req.body)
    }
}