
//register the buttons

let buttons = document.getElementsByTagName('button');
Array.prototype.slice.call(buttons).forEach(e=>{
	e.addEventListener('click', function(){
		getValue(e);
	});
});

let input1= 0, input2=0, result=0,op, eq = false;
let disp = document.querySelector('#screen-display');
disp.innerHTML = String(input1);


function getValue(event){
	let regx = /x|\/|\+|-/;
	if(regx.test(event.value)){
		if(disp.innerHTML[0] === '0'){
			return;
		}else{
			switch(event.value){
				case '+' : 
					op = '+';
					break;
				case '-' : 
					op = '-';
					break;
				case '/' : 
					op = '/';
					break;
				case 'x' : 
					op = 'x';
					break;
				default:
			}
			display(event.value);
		}
		
	} else if(/=|ac|ce|=/.test(event.value)){
		switch(event.value){
			case 'ac':
				disp.innerHTML = '0';
				document.querySelector('.input-display').innerHTML = '0';
				input1 = 0;
				break;
			case 'ce':
				disp.innerHTML = disp.innerHTML.slice(0,-1);
				
				break;
			case '=' :
				let trimed = disp.innerHTML.replace(/[0-9]/g,"");
				if(/=/.test(disp.innerHTML)) return;
				// if((trimed.length)>1){
					let answer  = doSeriesCalcualtion(disp.innerHTML);
					disp.innerHTML += "="+answer;
					result = answer;
					document.querySelector('.input-display').innerHTML = result;
					console.log(disp.innerHTML+ " From doSeriesCalcualtion");
				// }else{
				// 	let answer = perform(disp.innerHTML);
				// 	document.querySelector('.input-display').innerHTML = result;
				// 	disp.innerHTML += "="+answer;
				// 	console.log(disp.innerHTML + " from perform");
				// }
				
				break;
		}
	} else{
		display(event.value);
	}
}

	
function display(value){
	document.querySelector('.input-display').innerHTML = value;
	if(eq === true){
		disp.innerHTML = result;
		eq = false;
		console.log("yes");
		if(result !==0){		
			disp.innerHTML = result + op;
		}
		return;
		
	}
	disp.innerHTML === '0' ? disp.innerHTML = value : disp.innerHTML += value;
}



function perform(input){
	input1 = parseFloat(input.split(/\+|-|x|\//)[0]);
	input2 = parseFloat(input.split(/\+|-|x|\//)[1]);
	console.log(input1);
	if(isNaN(input2) || input2 === ""){
		display.innerHTML = disp.innerHTML;
		return;
	}
	switch(op){
		case '+':
			result = input2 + input1;
			break;
		case '-':
			result = input1 - input2;
			break;
		case 'x':
			result = input1 * input2;
			break;
		case '/':
			result = input1/input2;
		default :

	}
	eq = true;
	return result;
}




function doSeriesCalcualtion(input){
	let inputArr = input.split(/\+|-|x|\//);
	let opArr = input.replace(/[0-9]|\./g,"").split("");
	console.log(opArr);
	console.log(inputArr);
	let first ="", second ="", op, result = parseFloat(inputArr[0]);

	for(let i=0; i<opArr.length; i++){
		console.log(result);
		switch(opArr[i]){
			case '+':
				result = result + parseFloat(inputArr[i+1]);
				break;
			case '-':
				result = result - parseFloat(inputArr[i+1]);
				break;
			case 'x':
				result = result * parseFloat(inputArr[i+1]);
				break;
			case '/':
				result = result / parseFloat(inputArr[i+1]);
			default :

		}
	}
	eq = true;
	console.log(result +" inside doSeriesCalcualtion");
	return result;
}

