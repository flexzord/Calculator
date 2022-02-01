class Calculator{
  constructor(previousScreen, mainScreen){
    this.previousScreen = previousScreen;
    this.mainScreen = mainScreen;
    this.clear();
  }

  clear(){
    this.currentNumber  = '';
    this.previousNumber = '';
    this.operator = undefined;
  }

  delete(){
    this.currentNumber = this.currentNumber.toString().slice(0,-1);
  }

  addNumber(number){
    if(number==='.'&&this.currentNumber.includes('.')) return;
    this.currentNumber = this.currentNumber.toString()+number.toString();
  }

  whichOperator(operator){
    if(this.currentNumber === '') return;
    if(this.previousNumber !==''){
      this.result();
    }
    this.operator = operator;
    this.previousNumber = this.currentNumber;
    this.currentNumber ='';
  }

  result(){
    let result;
    const prev = parseFloat(this.previousNumber);
    const cur = parseFloat(this.currentNumber);
    if(isNaN(prev)||isNaN(cur)) return;
    switch(this.operator){
      case '+':
      result = prev + cur;
      break;
      case '-':
      result = prev-cur;
      break;
      case '*':
      result = prev*cur;
      break;
      case '/':
      result = prev/cur;
      break;
      default:
      return;
    }
    this.currentNumber = result;
    this.operator = undefined;
    this.previousNumber = '';
  }



  updateScreen(){
    this.mainScreen.innerText = this.currentNumber;
      if(this.operator!=null){
        this.previousScreen.innerText = `${this.previousNumber} ${this.operator}`
      }else{
        this.previousScreen.innerText ='';
      }


  }

}


const numbers = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-operator]');
const clear = document.querySelector('[data-clear]');
const deleteNumber = document.querySelector('[data-delete]');
const equal = document.querySelector('[data-equal]');
const mainScreen = document.querySelector('[data-main-screen]');
const previousScreen = document.querySelector('[data-previous-screen]');

const calculator = new Calculator(previousScreen, mainScreen);

numbers.forEach(number => {
  number.addEventListener('click',()=>{
    calculator.addNumber(number.innerText);
    calculator.updateScreen();
  });
});

operators.forEach(operator => {
  operator.addEventListener('click',()=>{
    calculator.whichOperator(operator.innerText);
    calculator.updateScreen();
  });
});

equal.addEventListener('click',button=>{
  calculator.result();
  calculator.updateScreen();
})

clear.addEventListener('click',button=>{
  calculator.clear();
  calculator.updateScreen();
})

deleteNumber.addEventListener('click', button=>{
  calculator.delete();
  calculator.updateScreen();
})
