class Calculator {
    constructor (previousOperantTextElement,currentOperantTextElement)  {
        this.previousOperantTextElement=previousOperantTextElement
        this.currentOperantTextElement=currentOperantTextElement
        this.reset()
    }

    reset(){
        this.currentOperant = ''
        this.previousOperant = ''
        this.operation = undefined
        this.updateDisplay()
        this.isResult = false
    }

    delete(){
        this.currentOperant = this.currentOperant.toString().slice(0,-1)
        this.updateDisplay()
    }

    appendNumber(number){
        if(number === '.' && this.currentOperant.includes('.')) return
        this.currentOperant = this.currentOperant.toString() + number.toString()
    }
    
    chooseOperation(operation){
        if(this.currentOperant === '') return
        if(this.previousOperant !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperant = this.currentOperant
        this.currentOperant = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperant)
        const curr = parseFloat(this.currentOperant)
        if(isNaN(prev) || isNaN(curr)) return
        switch(this.operation){
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case 'x':
                computation = +(prev * curr).toFixed(4)
                break
            case '/':
                computation = +(prev / curr).toFixed(4)
                break
            default:
                return
        }
        this.currentOperant = computation
        this.operation = undefined
        this.previousOperant = ''
        this.updateDisplay()
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ''
        }else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits:0})
        }

        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else {return integerDisplay}
        // const floatNumber = parseFloat(number)
        // if(isNan(floatNumber)) return ''
        // return floatNumber.toLocaleString('en')
    }

    updateDisplay(){
        this.currentOperantTextElement.innerText = this.getDisplayNumber(this.currentOperant) 
        this.previousOperantTextElement.innerText = this.previousOperant
        if(this.operation != null){
            this.previousOperantTextElement.innerText = `${this.getDisplayNumber(this.previousOperant)} ${this.operation}`
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const resetButton = document.querySelector('[data-reset]')
const previousOperantTextElement = document.querySelector('[data-previous-operant]')
const currentOperantTextElement = document.querySelector('[data-current-operant]')


const calculator = new Calculator (previousOperantTextElement,currentOperantTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(calculator.isResult === true){calculator.reset()}
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()   
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()   
    })
})

resetButton.addEventListener('click',() => {
    calculator.reset()
})

equalButton.addEventListener('click',() => {
    calculator.compute()
    calculator.isResult = true
})

deleteButton.addEventListener('click',() => {
    if(calculator.isResult === true){calculator.reset()}
    calculator.delete()
})

// console.log(document.querySelector('[data-previous-operant]').innerText)

document.getElementById("slider").value=1;
const theme = document.getElementById("themes");
theme.className = "theme1";

function change_theme () {
    theme_val = parseInt(document.getElementById("slider").value)
    switch(theme_val){
        case 1:
            theme.className = "theme1"
            break
        case 2:
            theme.className = "theme2"
            break
        case 3:
            theme.className = "theme3"
            break
    }
}