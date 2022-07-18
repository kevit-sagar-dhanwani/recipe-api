const express = require('express')
const axios = require('axios')
require('./db/mongoos')
const Recipe = require('./models/recipe')
const nodeCron = require('node-cron')
const runCron = require('./crone_logic/crone')
const searchRoute = require('./Api/search_api')

const app = express()

const port = process.env.PORT || 4050

const Url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=f35d7f3c855d438d87b2314d5a76d1a2'


var query = Recipe.find()

query.count((err, count) => {
    if (count == 0) {
        getRecipe('pizza', 25)
        getRecipe('pasta',25)
    }
    else {
        // runCron()
    }
})

async function getRecipe(name, number) {
    try {

        const recipeData = await axios.get(`${Url}&query=${name}&number=${number}`)

        const idArray = []
        
        for (i = 0; i < number; i++) {
            idArray.push(recipeData.data.results[i].id)
        }

        const idString = idArray.join(',')

        const response = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?apiKey=f35d7f3c855d438d87b2314d5a76d1a2&ids=${idString}`)


        for (i = 0; i < number; i++){            
            await new Recipe(response.data[i]).save()
        }
            
    } catch (error) {
        console.error(error);
    }
}

//search recipe

app.use(searchRoute)


app.listen(port, () => {
    console.log(`server is runnig on port= '${port}'`)
})
