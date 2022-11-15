require('dotenv').config()
const Sequelize = require('sequelize')
const { CONNECTION_STRING, OPENAI_API_KEY } = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
          rejectUnauthorized: false
      }
  }
})

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
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
            url TEXT,
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

        // let newURL = {}
        // for (let i = 0; i < resURLs.length; i++) {
        //     newURL = {
        //         id: nextId,
        //         url: response.data.data[i].url,
        //         favorite: false
        //     }
        //     nextId++
        //     allImgs.push(newURL)
        // }
        // res.send(allImgs)

        sequelize.query(`
            INSERT INTO results (url, favorite)
            VALUES
                ('${response.data.data[0].url}', false),
                ('${response.data.data[1].url}', false),
                ('${response.data.data[2].url}', false);

            SELECT * FROM results
            ORDER BY result_id ASC;
        `)
        .then((dbRes) => {
            console.log('added to table')

            let dbArr = dbRes[0]
            let lastThree = dbArr.slice(-3)
            res.send(lastThree)
        })
        .catch((err) => console.log(err))
    },
    deleteResult: (req, res) => {
        const { id } = req.params

        sequelize.query(`
            DELETE FROM results
            WHERE result_id = ${id};

            SELECT * FROM results
            ORDER BY result_id ASC;
        `)
        .then((dbRes) => {
            console.log('deleted from table')

            let newArr = dbRes[0]
            let lastTwo = newArr.slice(-2)
            res.send(lastTwo)
        })
        .catch((err) => console.log("Error deleting item", err))
    },
    toggleFavs: (req, res) => {
        console.log("hit toggleFavs")
        const { id, favorite } = req.body

        if (favorite === true) {
            sequelize.query(`
                UPDATE results
                SET favorite = true
                WHERE result_id = ${id};
            `)
            .then(() => {
                console.log("Favorite added to table")
                res.sendStatus(200)
            })
            .catch((err) => console.log("Error adding favorite", err))
        } else if (favorite === false) {
            sequelize.query(`
                UPDATE results
                SET favorite = false
                WHERE result_id = ${id};
            `)
            .then(() => {
                console.log("Favorite removed from table")
                res.sendStatus(200)
            })
            .catch((err) => console.log("Error removing favorite", err))
        }
    }
}