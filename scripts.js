const previousOperationText = document.getElementById("previousOperation")
const currentOperationText = document.getElementById("currentOperation")
const button = [...document.querySelectorAll("#buttonsContainer button")]

class Calculator{
    constructor(previousOperationText,currentOperationText){
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }
    
    addDigit(digit){
        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return
        }
        this.currentOperation = digit
        this.updateScreen()
    }

    processOperation(operation){
        if(this.currentOperationText.innerText === "" && operation !== "C"){
            if(this.previousOperationText !== ""){
                this.changeOperation(operation)
            }
            return
        }
        let operationValue;
        const previous = Number(this.previousOperationText.innerText.split(" ")[0])
        const current = Number(this.currentOperationText.innerText) 

        switch(operation){
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue,operation,previous,current)
                break;
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue,operation,previous,current)
                break;
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue,operation,previous,current)
                break;
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue,operation,previous,current)
                break;
            case "DEL":
                this.processDelOperator()
                break;
            case "CE":
                this.processCeOperator()
                break;
            case "C":
                this.processCOperator()
                break;
            case "=":
                this.processEqualOperator()
                break;
            default:
                return;
        }
    }

    updateScreen(operationValue = null, operation = null, previous = null, current = null){
        if(operationValue === null){
           this.currentOperationText.innerText += this.currentOperation
        }else{
            if(previous === 0){
                operationValue = current
            }
            this.previousOperationText.innerText = `${operationValue} ${operation}` 
            this.currentOperationText.innerText = ""
        }
    }

    changeOperation(operation){
        const mathOperations = ["*","/","+","-"]

        if(!mathOperations.includes(operation)){
            return
        }

    this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
    }

    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    processCeOperator(){
        this.currentOperationText.innerText = ""
    }
    
    processCOperator(){
        this.currentOperationText.innerText = ""
        this.previousOperationText.innerText = ""
    }

    processEqualOperator(){
         const operation = previousOperationText.innerText.split(" ")[1]

         this.processOperation(operation)
    }
}   

const calc = new Calculator(previousOperationText,currentOperationText)

button.map((element)=>{
    element.addEventListener("click",(event)=>{
        const value = event.target.innerText

        if(Number(value) >= 0 || value === "."){
            calc.addDigit(value)
        }else{
            calc.processOperation(value)
        }
    })
})