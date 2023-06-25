const mongoose = require("mongoose");


const recipeSchema = new mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	author:{
		type: mongoose.Schema.Types.ObjectId,
    	ref: 'Authors'
	},
	imageUrl: String,
	category:{
		type: String,
		enum: ['breakfast', 'lunch', 'dinner', 'dessert', 'snack', 'brunch', 'fruits and vegetables', 'drinks and smoothies', 'BBQ'],
		required: true
	},
	description: String,
	ingredients:{
		type: [String],
		required: true
	},
	instructions: {
		type: [String],
		required: true
	},
	prepTime:String,
	cookTime: String,
  	totalTime: String,
  	servings: Number,
  	note:String,
  	recipeFor: {
  		type: String,
		enum: ['All', 'Kids', 'Adults', 'Athletes', 'Toddlers']
  	},
  	createdAt: {
    type: Date,
    default: Date.now
  	},
  	updatedAt: {
    type: Date,
    default: Date.now
	}
})

module.exports = mongoose.model('Recipe', recipeSchema)