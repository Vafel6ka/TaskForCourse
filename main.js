const banks = [];
const div = document.getElementById('table');
const calc = document.getElementById('calcWrapper');
const titles = [`Bank's name`, `Interest rate`, `Max loan`, 'Min downpayment', 'Loan term'];
saveInDB(banks);
function addBank() {
    const bank = {};
    bank["name"] = addNameBank.value;
    bank["interestRate"] = Number(addInterestRate.value);
    bank["maxLoan"] = Number(addMaxLoan.value);
    bank["minDownPayment"] = Number(addMinDownPayment.value);
    bank["loanTerm"] = Number(addLoanTerm.value);
    banks.push(bank);
    saveInDB(banks)
    showBanks()
    document.getElementById("probaCalc").style.visibility = "visible";
    console.log(loadArrFromDB(banks))
}

function showBanks() {
    div.innerHTML = "";

    loadArrFromDB(banks).forEach ((bank)=>{
        let arr = Object.values(bank)
        let row = document.createElement('div');
        row.className = 'tableRow';
        for (let index = 0; index < arr.length; index++) {
            let column = document.createElement('div');
            column.className = 'tableColumn'
            column.innerHTML = `
            ${arr[index]}
            `; 
        row.append(column);  
        }

        let btnDel = document.createElement('div');
        btnDel.className = 'btnDel';
        btnDel.innerHTML = 'Dell';
        row.append(btnDel);            
        div.append(row);
         
    })
    delBank ();
    editBank();
}    

function delBank () {
    const arr = [...document.querySelectorAll('.btnDel')]
    arr.forEach ((btn, ind) => {
        btn.addEventListener('mousedown', (()=>{
            btn.style.backgroundColor = 'red';
            banks.splice(ind,1);
            saveInDB(banks);
            showBanks()
    }))    
})
    if (banks.length==0) document.getElementById("probaCalc").style.visibility = "hidden";
}

function editBank() {
    const arr = [...document.querySelectorAll('.tableColumn')]
    arr.forEach ((btn, ind) => {
    btn.addEventListener('mousedown', ((event)=>{
        event.preventDefault();
        btn.style.backgroundColor = 'red';
        console.log((ind+1)%5)
        switch ((ind+1)%5){
            case 1:
                banks[Math.trunc(ind/5)].name = prompt('Enter name');                
                console.log(`${banks[Math.trunc(ind/5)].name}`);
                saveInDB(banks);
                showBanks();                   
                break;
            case 2:
                banks[Math.trunc(ind/5)].interestRate = prompt('Enter interestRate');
                console.log(`${banks[Math.trunc(ind/5)].maxLoan}`);
                saveInDB(banks);
                showBanks()
                break;
            case 3:
                banks[Math.trunc(ind/5)].maxLoan = prompt('Enter maxLoan');
                console.log(`${banks[Math.trunc(ind/5)].loanTerm}`);
                saveInDB(banks);
                showBanks()
                break;
            case 4:
                banks[Math.trunc(ind/5)].minDownPayment = prompt('Enter minDownPayment');
                console.log(`${banks[Math.trunc(ind/5)].loanTerm}`);
                saveInDB(banks);
                showBanks()
                break;
            case 0:
                banks[Math.trunc(ind/5)].loanTerm = prompt('Enter loanTerm');
                console.log(`${banks[Math.trunc(ind/5)].loanTerm}`);
                saveInDB(banks);
                showBanks()
                break;
        }  
}))    
})
}

function getCalculate(){
  console.log(nameBank.value)
  info = {}
    info["bank"] = nameBank.value
    info['downPayment'] = downPayment.value
    info['initialLoan']  = initialLoan.value
    console.log(info)
    let isName = true;

    loadArrFromDB(banks).forEach((bank)=>{
        if (bank.name == info.bank) {
            isName = false;
            if (bank.minDownPayment > info.downPayment) {
                alert('change bank or up you downPayment')
                return
            }
            const a = Math.pow((1 + bank.interestRate/12),bank.loanTerm)
            const m = (Math.round((((info.initialLoan-info.downPayment)*((bank.interestRate)/12)*a)/(a-1))+100)/100);
            
            let calcText = document.createElement('div');
            calcText.className = 'calcText';
            calcText.innerHTML = `
            <p> You mounthly payment in ${bank.name} bank will be $${m}</p>
            `;
            calc.prepend(calcText);            
        } 
        })
        if (isName) alert (`Select the right bank's name!`)
}

function saveInDB(array) {
  localStorage.clear();
  return localStorage.setItem(array, JSON.stringify(array));
}

function loadArrFromDB(array) {
  return JSON.parse(localStorage.getItem(`${array}`));
}

console.log(localStorage.length)