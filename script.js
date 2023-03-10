// Kreiranje klasa
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        // funkcija za brisanje sadrzaja this.clear()
        this.clear()
    }

    // funkcije
    // clear ne prihvata argumente
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    // SLICE metoda uklanja jedan deo STRINGA
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    // za dodavanje brojeva
    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
        // console.log(this.currentOperand)
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
        // console.log(this.operation)
    }

    compute() {
        // definisanje lokalne promenljive
        // omogucava sabiranje, oduzimanje itd.
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case 'x':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        if (this.operation != undefined) {
            this.previousOperandTextElement.innerText = `${this.previousOperand}${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}


// Konstanta koja cuva sve dugmice a vezani su za brojeve
// QuerySelector
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// pravljenje OBJEKTA
// new Calculator- je konstruktor
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement) 

// klik dogadjaji
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
        // console.log(button.innerText)
    })
})

// da se pokupi znak jednakosti
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay();
})