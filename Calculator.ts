const operators = ['+','-','x','*','^','/','(',')']

export default class Calculator{
	constructor(){}

	/**
	 * Solve a RPN array. 
	 * Example:
	 * ```js
	 * calculator.solveRPN(['5','5','+'])//10
	 * ```
	 * @param equation 
	 * @returns The equation result.
	 */
	solveRPN(equation:string[]):number{
		const stack:number[] = []

		for (let i = 0; i < equation.length; i++) {
			const element = equation[i];
			const operand = Number(element)
			const operator = operators.includes(element) ? element : null
			
			if(operand){
				stack.push(operand)
			}
			else if(operator){

				let last = stack.pop()
				let penultimate = stack.pop()

				if(last && penultimate)
				{
					stack.push(this.operate(penultimate,operator,last))
				}
			}
		}

		return stack[0]
	}

	validateInput(expression:string[]):boolean{

		let res = false

		for (let o = 0; o < expression.length; o++) {
			const element = expression[o];

			res = operators.includes(element) || !isNaN(Number(element))		
		}

		return res

	}

	/**
	 * Convert a inFix math equation to a RPN array.
	 * ```js
	 * //example
	 * calculator.convertToRPN("5+5")
	 * //`[5,5,+]`
	 * ```
	 * @param input 
	 */
	infixToPostfix(input:string[]):string[]{
		let output:string[] = []
		let stack:string[] = []

		for (let i = 0; i < input.length; i++) {
			const x = input[i];
			
			if(operators.includes(x)){

				while(this.precedence(x) <= this.precedence(stack[stack.length-1])){
					output.push(stack.pop()!)
				}
				stack.push(x)
				
			}
			else if(Number(x)){
				output.push(x)
			}
		}

		while(stack.length>0)
		{
			output.push(stack.pop()!)
		}

		return output
	}

	operate(a:number,operador:string,b:number):number{
		switch (operador) {
			case '+':
				return a + b		
			case '*':
			case 'x':
				return a * b		
			case '/':
				return a / b		
			case '-':
				return a - b		
			default:
				break;
		}
		return 0
	}

	/**
	 * Converts a equation string to an infix equation array.
	 * Example:
	 * ```js
	 * c.convertToEquation("1-2*3/4+5+(67-89)")
	 * //['1','+','2','*','3','/','(','4','-','5',')']
	 * ```
	 * @param text Equation string
	 * @returns an infix equation array.
	 */
	convertToEquation(text:string): string[]{
		const result = []

		let buffer = ""
	
		for (let i = 0; i < text.length; i++) {
			const e = text[i]
	
			if(operators.includes(e)){
				if(buffer){
					result.push(buffer)
					buffer = ""
				}
				result.push(e)
			}
			else{
				buffer += e
			}
		}
	
		if(buffer){
			result.push(buffer)
			buffer = ""
		}

		return result
	}

	precedence(operator:string):boolean{
		let order:any = {
			["("]:5,
			[')']:5,
			['^']:4,
			['*']:3,
			['x']:3,
			['/']:2,
			['+']:1,
			['-']:0
		}
		return order[operator]
	}
}
