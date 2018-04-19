// Get all the keys from document
var keys = document.querySelectorAll('#calculator button');

var operators = ['+', '-', 'x', '÷'];
var decimal = false;

// Add onclick event to all the keys and perform operations
for(var i = 0; i < keys.length; i++) {
	keys[i].onclick = function(e) { // NOTE: e is the short var reference for event object which will be passed to event handlers.

		/* Note: The querySelector() method only returns the first element that matches the specified selectors. 
		To return all the matches, use the querySelectorAll() method instead. */
		
		var input = document.querySelector('.screen'); // .screen text value
		var inputVal = input.innerHTML; // same as .screen
		var btnVal = this.innerHTML; // value of the pressed button

		/*
		// for personal check
		console.log("input " + input.innerHTML);
		console.log("inputVal " + inputVal);
		console.log("btnVal " + btnVal);
		*/

		// If clear key is pressed, erase everything
		if(btnVal == 'C') {
			input.innerHTML = '';
			decimal = false;
		}
		
		// If eval key is pressed, calculate and display the result
		else if(btnVal == '=') {
			var equation = inputVal;
			var lastChar = equation[equation.length - 1];
			
			// Replace all instances of x and ÷ with * and / respectively. 
			//This can be done easily using regex and the 'g' tag which will replace all instances of the matched character/substring
			equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
			
			// check the last character of the equation. If it's an operator or a decimal, remove it
			if(operators.indexOf(lastChar) > -1 || lastChar == '.')
				equation = equation.replace(/.$/, '');
			
			if(equation)
				input.innerHTML = eval(equation);
				
			decimal = false;
		}
		
		// It will be reset when an operator, eval or clear key is pressed.
		else if(btnVal == '.') {
			if(!decimal) {
				input.innerHTML += btnVal;
				decimal = true;
			}
		}

		/* There are some restrictions like:
		 	1. No two operators shouldn't be added consecutively.
		 	2. The equation shouldn't start from an operator except minus
		 	3. not more than 1 decimal point should be there in a number */
		
		// Operator is clicked
		else if(operators.indexOf(btnVal) > -1) {
			// Get the last character from the equation
			var lastChar = inputVal[inputVal.length - 1];
			
			// Only add operator if input is not empty and there is no operator at the last
			if(inputVal != '' && operators.indexOf(lastChar) == -1) 
				input.innerHTML += btnVal;
			
			// Allow minus if the string is empty
			else if(inputVal == '' && btnVal == '-') 
				input.innerHTML += btnVal;
			
			// Replace the last operator (if exists) with the newly pressed operator
			if(operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
				/* Here, '.' matches any character while $ denotes the end of string
				so anything (will be an operator in this case) at the end of string will get replaced by new operator */
				input.innerHTML = inputVal.replace(/.$/, btnVal);
			}
			
			decimal =false;
		}
		
		// if any other key is pressed, just append it
		else {
			input.innerHTML += btnVal;
		}
		
	} 
}