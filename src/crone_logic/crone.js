const axios = require('axios')
const nodeCron = require('node-cron')
require('../db/mongoos')
const Recipe = require('../models/recipe')

let skip = 0

const runCron = ()=>{
    nodeCron.schedule('*/2 * * * *',()=>{
        addBurgerAndPizza('burger',10,skip);
        addBurgerAndPizza('pizza',10,skip+10);
    });
}


const Url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=f35d7f3c855d438d87b2314d5a76d1a2'

async function addBurgerAndPizza(name,number,skip) {

    try {
        skip = skip+10;
        const recipeData = await axios.get(`${Url}&query=${name}&number=${number}&offset=${skip}`)

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

module.exports = runCron