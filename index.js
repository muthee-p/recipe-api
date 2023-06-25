require('dotenv').config()

const express =  require("express");
const app = express();
const mongoose = require("mongoose");
// const UserModel = require('./models/Users')

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL);


const authorsRouter = require('./routes/authors')
app.use('/authors', authorsRouter)
const recipesRouter = require('./routes/recipes')
app.use('/recipes', recipesRouter)

// app.get("/getUsers", (req, res) => {
// 	UserModel.find({}, (err, result)=> {
// 		if (err) {
// 			res.json(err);
// 		}else {
// 			res.json(result);
// 		}
// 	})
// })

// app.post("/createUser", async (req, res)=>{
// 	const user = req.body;
// 	const newUser = new UserModel(user);
// 	await newUser.save();

// 	res.json(user)
// })


app.listen(3001, () =>{
	console.log("Server is running")
})