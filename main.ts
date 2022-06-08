import express from "express"
import http from "http"
import Calculator from "./Calculator"
import 'dotenv/config'

const app = express()
const c = new Calculator()

app.set('views','./views')
app.set('view engine','pug')

app.use(express.urlencoded({extended:true}))

app.get('/',async (req,res)=>{
	res.render('calculator',{result:"Insert your input:"})
})

app.post('/solve',async (req,res)=>{
	const equation = c.convertToEquation(req.body.equation)
	const valid = c.validateInput(equation)

	if(valid){
		const npr = c.infixToPostfix(equation)

		const result = c.solveRPN(npr)

		res.render('calculator',{
			equation:" Equation: "+ req.body.equation,
			result: `result: ${result.toString()}`
		})
	}
	else{
		res.render('calculator',{
			equation:" Equation: "+ req.body.equation,
			result: "Invalid input."
		})
	}
})

const server = http.createServer(app)

const port:number =  Number(process.env.serverPort)
const hostname = process.env.hostname

server.listen(port,hostname,()=>{
	console.log("server runing at:",server.address())
})