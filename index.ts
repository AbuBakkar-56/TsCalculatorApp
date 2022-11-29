const calculatorDisplay=document.querySelector('h1') as HTMLHeadingElement;
const inputBtns=document.querySelectorAll('button');
const clearBtn=document.getElementById('clearBtn') as HTMLButtonElement;
let firstValue:number=0;
let operatorValue:string='';
let awaitingNextValue:boolean=false;
function sendNumberValue(number){
    if(awaitingNextValue){
        calculatorDisplay.textContent=number;
        awaitingNextValue=false
    }else{
        const displayValue=calculatorDisplay.textContent;
        calculatorDisplay.textContent=displayValue==='0'?number:displayValue+number
    }
}
const calculate={
    '/':(firstNumber,secondNumber)=>firstNumber/secondNumber,
    '*':(firstNumber,secondNumber)=>firstNumber*secondNumber,
    '+':(firstNumber,secondNumber)=>firstNumber+secondNumber,
    '-':(firstNumber,secondNumber)=>firstNumber-secondNumber,
    '=':(firstNumber,secondNumber)=>secondNumber,
}
function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
  // Prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  // Assign first value if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  // Ready for next value, store the operator
  awaitingNextValue = true;
  operatorValue = operator;
}
function addDecimal(){
   if(awaitingNextValue) return;
   if(!calculatorDisplay.textContent?.includes('.')){
    calculatorDisplay.textContent=`${calculatorDisplay.textContent}.`

}
inputBtns.forEach((inputBtn)=>{
    if(inputBtn.classList.length===0){
        inputBtn.addEventListener('click',()=>sendNumberValue(inputBtn.value))
    }else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click',()=>useOperator(inputBtn.value))
    }else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click',()=>addDecimal())
    }
});
function clearAll(){
    firstValue=0;
    operatorValue='';
    awaitingNextValue=false;
    calculatorDisplay.textContent='0'
};
clearBtn.addEventListener('click',clearAll)