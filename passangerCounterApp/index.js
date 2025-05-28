const displayNumber = document.getElementById("displayNumber");
const increase = document.getElementById("btnIncrease");
const decrease = document.getElementById("btnDecrease");
const saveDisplay = document.getElementById('saveDisplay');
const save = document.getElementById('save');
const btnClear = document.getElementById('btnClear');
let count = 0;

function updateDisplay(){
    displayNumber.textContent = count;
    displayNumber.classList.add('displayBack');
}

function handleIncrease(){
    displayNumber.textContent = count++;
    updateDisplay();
}
function handleDecrease(){
    if(count<=0){
        return alert('limited')
        }else{
        displayNumber.textContent = count--;
        updateDisplay();
    }
}
function savePart(){
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
    displayNumber.style.display = "none";
}
increase.addEventListener('click', handleIncrease);
decrease.addEventListener('click', handleDecrease);
save.addEventListener('click', savePart);
btnClear.addEventListener("click", hancleClear);