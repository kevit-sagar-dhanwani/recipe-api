const axios = require('axios')
require('../db/mongoos')
const express = require('express')
const Recipe = require('../models/recipe')

const router = new express.Router()



router.use('/recipe/:cuisines', async (req, res) => {

    const param = req.params.cuisines

    const searchAllow = ["French", "Irish", "Indian", "Thai"];
    const allow = searchAllow.includes(param);

    if (allow) {
        try {
            const recipe = await Recipe.findOne(req.params)
            if (!recipe) {
                return res.status(404).send("Recipe not avalaible")
            }
            res.send(recipe)
        } catch (error) {
            res.status(500).send()
        }
    }
    else {
        res.send('Enter a valid search')
    }

})

module.exports = router;