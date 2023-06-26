const express =  require("express");
const router = express.Router()
const Author = require('../models/author') 


//get all
router.get('/', async (req, res) =>{
	try {
		const authors = await Author.find()
		res.json(authors)
	} catch (err) {
		res.status(500).json({
			message:err.message
		})
	}
})


//getting one
router.get('/:id', getAuthor, (req, res)=> {
	res.json(res.author)
})

//create one

router.post('/', async (req, res)=> {
	const author = new Author({
		name:req.body.name,
		image: req.body.image,
		proffession:req.body.proffession,
		bio: req.body.bio,
		age: req.body.age
	})
	try{
		const newAuthor = await author.save()
		res.status(201).json(newAuthor)

	}catch (err){
		res.status(400).json({ message:err.message})
		
	}
})

//update one
router.patch('/:id', getAuthor,  async (req, res)=> {
	if(req.body.name != null){
		res.author.name = req.body.name
	}
	if (req.body.image != null){
		res.author.image = req.body.image
	}
	if (req.body.proffession != null){
		res.author.proffession = req.body.proffession
	}
	if (req.body.bio != null){
		res.author.bio = req.body.bio
	}


	try{
		const updatedAuthor = await res.author.save()
		res.json(updatedAuthor)
	}catch (err){
		res.status(400).json({ message:err.message})
	}
})

//delete one
router.delete('/:id', getAuthor, async (req, res)=> {
	try{
		await res.author.deleteOne({_id: req.params.id});
		res.json({ message: 'Author deleted'})
	} catch (err){
		res.status(500).json({ message:err.message})
	}
})

async function getAuthor(req, res, next){
	let author
	try{
		author = await Author.findById(req.params.id)
		if(author == null){
			return res.status(404).json({message: 'Cannot find Author'})
		}
	}catch(err){
		return res.status(500).json({message:err.message})
	}

	res.author=author
	next()
}

module.exports = router