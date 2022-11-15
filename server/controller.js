require('dotenv').config()
const Sequelize = require('sequelize')
const {CONNECTION_STRING} = process.env

const sequelize = new Sequelize('postgres://vzmjfjzhtqctcz:fc1ed8fec174b5f9d4c4537c985a6e3402254721204124e3fed530798a1aa60c@ec2-54-163-34-107.compute-1.amazonaws.com:5432/da5l0m2kd0mpjj', {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
          rejectUnauthorized: false
      }
  }
})

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const allImgs = require('./db.json')

let nextId = 1

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        drop table if exists results;
        drop table if exists favorites;

        CREATE TABLE results (
            result_id SERIAL PRIMARY KEY, 
            url VARCHAR,
            favorite BOOLEAN NOT NULL
        );
        `).then(() => {
            console.log('DB seeded.')
            res.sendStatus(200)
        }).catch((err) => console.log('error with database', err))
    },
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