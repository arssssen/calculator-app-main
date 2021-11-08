const display = document.getElementsByClassName("display")[0];
let displayNum = display.innerHTML;
let outputs = [];
let output=0;

const deleteButton = document.getElementById("del");
deleteButton.addEventListener('click', () => {

    if(displayNum != 0) {
        let x = displayNum.toString();
        console.log(x)
        if(x.length == 1){
            displayNum = 0;
        }
        //if no commas or .'s
        else if(( !x.includes('.')) && ( !x.includes(','))) {
            displayNum = splitJoin(x);
        } else if (x.includes('.')){
            displayNum = splitJoin(x);
        } else {
            x = splitJoin(x);
            x = x.toString().replace(/\,/g,'');
            displayNum = parseInt(x).toLocaleString('en-US');
            console.log(x)
        }
    } 
    display.innerHTML = displayNum;
});

function splitJoin(x) {
    x = x.split('');
    x.pop();
    return x.join('');
}

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {
    outputs = [];
    output = '';
    displayNum = 0;
    display.innerHTML = displayNum;
});

const keys = document.getElementsByClassName("digit");
for(let i =0; i <keys.length; i++){
    keys[i].addEventListener('click', changedisplayNum);
}

function changedisplayNum(calculator) {
    const digitButton = calculator.target.innerHTML;
    
    if(displayNum == 0) {
        displayNum = digitButton;
    } 
    else if(((digitButton == '.') || (displayNum.toString().includes('.')) 
        || (( !displayNum.toString().includes('.')) && (displayNum.length < 3)))){
        displayNum = displayNum+digitButton;
     
    } else {
        let x = displayNum.toString();
            x = x.replace(/\,/g,'');
            x += digitButton;
            displayNum = parseFloat(x).toLocaleString('en-US');
        }
    
    display.innerHTML = displayNum;
}


const operators = document.getElementsByClassName("operator");
for(let i =0; i <operators.length; i++){
    operators[i].addEventListener('click', addOperator);
}

function addOperator(calculator){
    let operator = calculator.target.innerHTML;
    if(operator == 'x') {
        operator = '*';
    }
    outputs.push(displayNum);
    outputs.push(operator);
    
    displayNum = 0;
}

const equal = document.getElementById('equal');
equal.addEventListener('click', sum);

function sum(calculator){
    outputs.push(displayNum);
    output = outputs.join('');
    output = output.replace(/\,/g,'');
    displayNum = window.eval(output);
    display.innerHTML = parseFloat(displayNum).toLocaleString('en-US');
    outputs = [];
    output = '';
}

const themes = document.getElementsByClassName('theme');
for(let i =0; i <themes.length; i++){
    themes[i].addEventListener('click', changeTheme);
}


function changeTheme(calculator) {
    let colorTheme = calculator.target.id;
    document.documentElement.setAttribute('data-theme', colorTheme);
    
        for(let i =0; i <themes.length; i++){
        themes[i].style.setProperty('background-color',  'inherit');
    }
    let dec = document.getElementById(colorTheme);
    dec.style.setProperty('background-color', 'var(--equals-key');
    
}    