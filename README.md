# Calculadora-Tabajara

Do mathematical calculations on your browser, without needing Javascript!

You always wanted to access a calculator, from any place or device, from the internet, but its too much schizofrenic to use Javascript on your browser?  
Your problems are over. With the new Calculadora Tabajara you can solve your math calculations, on your browser, without using Javascript!

# Host by yourself

- `git clone https://github.com/ussaohelcim/Calculadora-Tabajara.git`
- `npm install`
- Modify the `.env` file
- `npm run compile`
- `npm run start`

# Run tests

- `npm run test`

# Endpoint

You can also use the `/api/calc` endpoint to solve your math equations.   
Just make a `post` request with a form like this:  
```json
{
	"equation":"10+10"
}
```
Response:  
```json
{
  "equation": "10+10",
  "result": "20"
}
```
# About

Tabajara it's a fake company created by the Casseta & Planeta comedians where they try to sell useless stuff like an Umbrella wich create rains. 