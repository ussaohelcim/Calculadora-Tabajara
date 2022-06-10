import Calculator from "../Calculator"

const c = new Calculator()

describe('input validation',()=>{

	//#region Must be valid
	test('[number, operator, number] must be valid',()=>{
		let input = ['1','+','1']
		expect(
			c.validateInput(input)
		)
		.toBe(true)
	})

	test('[number , operator , ( , number , ) ] must be valid',()=>{
		let input = ['1','+','(','1',')']
		expect(
			c.validateInput(input)
		)
		.toBe(true)
	})

	//#endregion

	//#region Must be invalid

	test('[ operator ] must be invalid',()=>{
		let input = ['+']
		expect(
			c.validateInput(input)
		)
		.toBe(false)
	})

	test('[ invalid, * ] must be invalid',()=>{
		let input = ['w','8']
		expect(
			c.validateInput(input)
		)
		.toBe(false)
	})

	test('[ number, number ] must be invalid',()=>{
		let input = ['8','8']
		expect(
			c.validateInput(input)
		)
		.toBe(false)
	})
	
	test('[ operator, operator ] must be invalid',()=>{
		let input = ['*','+']
		expect(
			c.validateInput(input)
		)
		.toBe(false)
	})
	
	test('[ number, ( , number , ) ] must be invalid',()=>{
		let input = ['5','(','5',')']
		expect(
			c.validateInput(input)
		)
		.toBe(false)
	})

	test('[ number , operator ] must be invalid',()=>{
		let input = ['5','*']
		expect(
			c.validateInput(input)
		)
		.toBe(false)

		input = ['5','(']
			
		expect(
			c.validateInput(input)
		)
		.toBe(false)
	})

	test('[ number , ( , operator , ) , number ] must be invalid',()=>{
		let input = ['5','(','*',')','5']
		expect(
			c.validateInput(input)
		)
		.toBe(false)
	})

	//#endregion
})

describe('math operations',()=>{
	test('a * b',()=>{
		expect(
			c.operate(10,'*',2)
		).toBe(20)
	})
	test('a - b',()=>{
		expect(
			c.operate(10,'-',10)
		).toBe(0)
	})
	test('a + b',()=>{
		expect(
			c.operate(1,'+',1)
		).toBe(2)
	})
	test('a / b',()=>{
		expect(
			c.operate(1,'/',1)
		).toBe(1)
	})
	test('a ^ b',()=>{
		expect(
			c.operate(2,'^',2)
		).toBe(4)
	})
})

describe('negative numbers',()=>{
	test('[-,5] == [ -5 ]',()=>{
		let input = '-5'
		expect(
			c.convertToEquation(input)
		)
		.toEqual(['-5'])
	})

	test('[-,5,+,1] == -4',()=>{
		let input = "-5+1"
		let infix = c.convertToEquation(input)
		expect(
			c.solveRPN(c.infixToPostfix(infix)) 
		)
		.toEqual(-4)
	})

	test('-1-1 == -2',()=>{
		let input = "-1-1"
		let infix = c.convertToEquation(input)
		expect(
			c.solveRPN(c.infixToPostfix(infix)) 
		)
		.toEqual(-2)
	})

	test('(-1)+(-1) == -2',()=>{
		let input = "(-1)+(-1)"
		let infix = c.convertToEquation(input)
		expect(
			c.solveRPN(c.infixToPostfix(infix)) 
		)
		.toEqual(-2)
	})

	test(' (-5)+20*5-5 == 90',()=>{
		let input = "(-5)+20*5-5"
		let infix = c.convertToEquation(input)
		expect(
			c.solveRPN(c.infixToPostfix(infix)) 
		)
		.toEqual(90)
	})
})

describe('infix to postfix',()=>{
	test('[1,+,1] must be [1,1,+]',()=>{
		expect(
			c.infixToPostfix(['1','+','1'])
		).toStrictEqual(['1','1','+'])
	})

	test('[5,+,5,*,5,/,5] must be [5, 5, 5, *, 5, /, +]',()=>{
		expect(
			c.infixToPostfix(['5','+','5','*','5','/','5'])
		)
		.toStrictEqual(['5', '5', '5', '*', '5', '/', '+'])
	})

	test('[1+(1)] must [11+]',()=>{
		expect(
			c.infixToPostfix(['1','+','(','1',')'])
		)
		.toStrictEqual(['1','1','+'])
	})
})

describe('solving RPN equations',()=>{
	let rpn = ['1','1','+']
	test(`['1','1','+'] must be 2`,()=>{
		expect(
			c.solveRPN(rpn)
		)
		.toEqual(2)
	})
})

describe('solving infix equations',()=>{
	test('200-(50*2)/2 == 150',()=>{
		let input = ['200','-','(','50','*','2',')','/','2']
		expect(
			c.solveRPN(c.infixToPostfix(input)) 
		)
		.toEqual(150)
	})
})
