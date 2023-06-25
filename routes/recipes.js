const express =  require("express");
const router = express.Router()
const Recipe = require('../models/recipe') 

//get all
router.get('/', async (req, res) =>{
	try {
		const recipes = await Recipe.find()
		res.json(recipes)
	} catch (err) {
		res.status(500).json({
			message:err.message
		})
	}
})


//getting one
router.get('/:id', getRecipe, (req, res)=> {
	res.json(res.recipe)
})

//create one

router.post('/', async (req, res)=> {
	const recipe = new Recipe({
		title:req.body.title,
		author: req.body.author,
		imageUrl: req.body.imageUrl,
		category: req.body.category,
		description: req.body.description,
		ingredients: req.body.ingredients,
		instructions: req.body.instructions,
		prepTime: req.body.prepTime,
		cookTime: req.body.cookTime, 
 		totalTime: req.body.totalTime, 
 		servings: req.body.servings, 
 		note: req.body.note,
 		recipeFor: req.body.recipeFor, 
 		createdAt: req.body.createdAt,
		updatedAt: req.body.updatedAt
	})
	try{
		const newRecipe = await recipe.save()
		res.status(201).json(newRecipe)

	}catch (err){
		res.status(400).json({ message:err.message})
		
	}
})

//update one
router.patch('/:id', async (req, res)=> {
	if(req.body.title != null){
		res.author.title = req.body.title
	}
	if (req.body.author != null){
		res.recipe.author = req.body.author
	}
	if (req.body.imageUrl != null){
		res.recipe.imageUrl = req.body.imageUrl
	}
	if (req.body.category != null){
		res.recipe.category = req.body.category
	}
	if (req.body.description != null){
		res.recipe.description = req.body.description
	}
	if (req.body.ingredients != null){
		res.recipe.ingredients = req.body.ingredients
	}
	if (req.body.instructions != null){
		res.recipe.instructions = req.body.instructions
	}
	if (req.body.prepTime != null){
		res.recipe.prepTime = req.body.prepTime
	}
	if (req.body.cookTime != null){
		res.recipe.cookTime = req.body.cookTime
	}
	if (req.body.totalTime != null){
		res.recipe.totalTime = req.body.totalTime
	}
	if (req.body.servings != null){
		res.recipe.servings = req.body.servings
	}
	if (req.body.note != null){
		res.recipe.note = req.body.note
	}
	if (req.body.recipeFor != null){
		res.recipe.recipeFor = req.body.recipeFor
	}

	try{
		const updatedRecipe = await res.recipe.save()
		res.json(updatedRecipe)
	}catch (err){
		res.status(400).json({ message:err.message})
	}
})

//delete one
router.delete('/:id', getRecipe, async (req, res)=> {
	try{
		await res.recipe.remove()
		res.json({ message: 'Recipe deleted'})
	} catch (err){
		res.status(500).json({ message:err.message})
	}
})

async function getRecipe(req, res, next){
	let recipe
	try{
		recipe = await Recipe.findById(req.params.id)
		if(recipe == null){
			return res.status(404).json({message: 'Cannot find Recipe'})
		}
	}catch(err){
		return res.status(500).json({message:err.message})
	}

	res.recipe=recipe
	next()
}

module.exports = router