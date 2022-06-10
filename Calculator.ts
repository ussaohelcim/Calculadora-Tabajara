const operators = ['+','-','x','*','^','/','(',')']

export default class Calculator{
	constructor(){}

	/**
	 * Solve a RPN array. 
	 * Example:
	 * ```js
	 * calculator.solveRPN(['5','5','+'])
	 * //10
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
					let res = this.operate(penultimate,operator,last)
					stack.push(res)
				}
			}
		}

		return stack[0] || 0
	}

	/**
	 * Check if is ['*','x','/','+','-','^']
	 * @param token 
	 * @returns 
	 */
	isMathOperator(token:string){
		let ops = ['*','x','/','+','-','^']
		return ops.includes(token)
	}

	validateInput(expression:string[]):boolean{
		let valid = true
		// let error = ""
		
		for (let index = 0; index < expression.length; index++) {
			const token = expression[index];

			// [ operator ]
			if(expression.length === 1 && operators.includes(token))
			{
				valid = false
				// error = `operator alone [ ${token}]`
			}

			if(index > 0)
			{
				let last = expression[index - 1]
				
				// [* , number , number
				if(this.isNumber(last) && this.isNumber(token))
				{
					valid = false
					// error = `number after number [${last}, ${token}]`
				}		
				// [ * , operator ,	operator
				if(this.isMathOperator(last) && this.isMathOperator(token))
				{
					valid = false
					// error = `operator after operator [${last}, ${token}]`
				}
				// [*, ( ,	operator 
				if(last === '(' && this.isMathOperator(token))
				{
					valid = false
					// error = `operator after ( [${last}, ${token}]`
				}
				// [ * , ) , number
				if(last === ')' && this.isNumber(token) )
				{
					valid = false
					// error = `) before number [${last}, ${token}]`
				}
				// [ * , number , (
				if(this.isNumber(last) && token === '(')
				{
					valid = false
					// error = `number before ( [${last}, ${token}]`
				}
			}

			// [ invalid ]
			if(!this.validCharacter(token))
			{
				valid = false
				// error = `character not valid ${token}`
			}

			// [ * , ( ]
			// [ * , operator ]
			if(index === expression.length - 1)
			{
				if(this.isMathOperator(token) || token === '(')
				{
					valid = false
					// error = `operator alone at the end ${token}`
				}
			}

			if(!valid)
			{
				// console.log(error)
				break
			}
		}
	
		return valid
	}

	isNumber(number:string):boolean{
		return !isNaN(Number(number))
	}

	validCharacter(character:string):boolean{
		let isOperator = operators.includes(character)
		let isNum = this.isNumber(character)

		return (isOperator || isNum)
	}

	/**
	 * Convert an inFix math equation array to a RPN array.
	 * ```js
	 * //example
	 * calculator.infixToPostfix(["5","+","5"])
	 * //['5','5','+']
	 * ```
	 * @param input 
	 */
	infixToPostfix(input:string[]):string[]{
		let output:string[] = []
		let stack:string[] = []

		for (let i = 0; i < input.length; i++) {
			const token = input[i];

			if(token === '(')
			{
				stack.push(token)
			}
			else if(operators.includes(token)){				
				while(this.precedence(token) <= this.precedence(stack[stack.length-1])){
					output.push(stack.pop()!)
				}

				if(stack.includes('(') && token === ')'){
					while(stack[stack.length-1] !== '('){
						let top = stack.pop()!
						if(top !== '(') output.push(top)
					}
					let trash = stack.pop()!
				}
				else{
					stack.push(token)
				}
				
			}
			else if(Number(token)){
				output.push(token)
			}
		}

		while(stack.length>0)
		{
			output.push(stack.pop()!)
		}

		return output
	}

	operate(a:number,operator:string,b:number):number{
		switch (operator) {
			case '^':
				return Math.pow(a,b)
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
		//TODO handle negative numbers

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
			['^']:3,
			['*']:2,
			['x']:2,
			['/']:2,
			['+']:1,
			['-']:1
		}
		return order[operator]
	}
}
