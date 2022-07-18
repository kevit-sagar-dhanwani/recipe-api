const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({

vegetarian: { type: Boolean },

vegan: { type: Boolean },

glutenFree: { type: Boolean },

dairyFree: { type: Boolean },

veryHealthy: { type: Boolean },

cheap: { type: Boolean },

veryPopular: { type: Boolean },

sustainable: { type: Boolean },

lowFodmap: { type: Boolean },

weightWatcherSmartPoints: { type: Number },

gaps: { type: String },

preparationMinutes: { type: Number },

cookingMinutes: { type: Number },

aggregateLikes: { type: Number },

healthScore: { type: Number },

creditsText: { type: String },

license: { type: String },

sourceName: { type: String },

pricePerServing: { type: Number },

extendedIngredients: { type: mongoose.Schema.Types.Mixed },

id: { type: Number },

title: { type: String },

readyInMinutes: { type: Number },

servings: { type: Number },

sourceUrl: { type: String },

openLicense: { type: Number },

image: { type: String },

imageType: { type: String },

summary: { type: String },

cuisines: [String],

dishTypes: [String],

diets: [String],

occasions: [String],

winePairing: {

pairedWines: [String],

pairingText: { type: String },

productMatches:{type: mongoose.Schema.Types.Mixed},

}, // object of object

instructions: { type: String },

analyzedInstructions: {type: mongoose.Schema.Types.Mixed},

originalId: { type: Number },

spoonacularSourceUrl: { type: String },

});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;

