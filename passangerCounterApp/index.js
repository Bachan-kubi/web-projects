const displayNumber = document.getElementById("displayNumber");
const increase = document.getElementById("btnIncrease");
const decrease = document.getElementById("btnDecrease");
const saveDisplay = document.getElementById('saveDisplay');
const save = document.getElementById('save');
const btnClear = document.getElementById('btnClear');
const resetBtn = document.getElementById('btnReset');
let count = 0;

function updateDisplay(){
    displayNumber.textContent = count;
    displayNumber.classList.add('displayBack');
}

function handleIncrease(){
    count++;
    updateDisplay();
}
function handleDecrease(){
    if(count<=0){
        return alert('limited')
        }else{
        count--;
        updateDisplay();
    }
}
function savePart(){
    if(count === 0){
        return alert('zero not save!')
    }
    saveDisplay.textContent += count + "-";
    count= 0;
    updateDisplay();
}
function hancleClear(){
    count = 0
    displayNumber.innerHTML= "";
    saveDisplay.innerHTML = "";
    updateDisplay();
    displayNumber.classList.remove('displayBack');
}
function handleReset(){
    count = 0;
    saveDisplay.textContent = count;
    updateDisplay();

}

increase.addEventListener('click', handleIncrease);
decrease.addEventListener('click', handleDecrease);
save.addEventListener('click', savePart);
btnClear.addEventListener("click", hancleClear);
resetBtn.addEventListener("click", handleReset);