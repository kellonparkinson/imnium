const allImgs = require('./db.json')

require('dotenv').config()

// const Sequelize = require('sequelize')

// const {OPENAI_API_KEY} = process.env
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "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",
});
  
const openai = new OpenAIApi(configuration);

let nextId = 1

module.exports = {
    // seed: (req, res) => {
    //     sequelize.query(`
    //         drop table if exists favorites;
    //         drop table if exists results;

    //         CREATE TABLE results (
    //             result_id SERIAL PRIMARY KEY, 
    //             url VARCHAR
    //         );

    //         CREATE TABLE favorites (
    //             fav_id SERIAL PRIMARY KEY,
    //             url VARCHAR
    //         );

    //         INSERT INTO results (url)
    //         VALUES
    //         ()
    //     `)
    // },
    generateImage: async (req, res) => {
        const { prompt, n, size } = req.body
      
        const response = await openai.createImage({
            prompt,
            n,
            size
        });

        let resURLs = [
            response.data.data[0].url,
            response.data.data[1].url,
            response.data.data[2].url
        ]

        let newURL = {}
        for (let i = 0; i < resURLs.length; i++) {
            newURL = {
                id: nextId,
                url: response.data.data[i].url,
                favorite: false
            }
            nextId++
            allImgs.push(newURL)
        }
        // console.log(allImgURLs)
        res.send(allImgs)
    },
    deleteResult: (req, res) => {
        const idToDelete = req.params.id
        let index = allImgs.findIndex((e) => e.id === +idToDelete)
        allImgs.splice(index, 1)
        res.send(allImgs)
    },
    addToFavs: (req, res) => {
        const { id, url, favorite } = req.params

        // let newFav = {
        //     id,
        //     url,
        //     favorite: true
        // }

        // favImgs.push(newFav)
        // res.send(favImgs)
    }
}