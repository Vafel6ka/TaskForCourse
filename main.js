let banks = [];
const div = document.getElementById('table');
const calc = document.getElementById('calcWrapper');
const titles = [`Bank's name`, `Interest rate`, `Max loan`, 'Min downpayment', 'Loan term'];
if (localStorage == 0) {localStorage.setItem('banks', JSON.stringify(banks))} else {
showBanks()
}
function addBank() {
    const bank = {};
    bank["name"] = addNameBank.value;
    bank["interestRate"] = Number(addInterestRate.value);
    bank["maxLoan"] = Number(addMaxLoan.value);
    bank["minDownPayment"] = Number(addMinDownPayment.value);
    bank["loanTerm"] = Number(addLoanTerm.value);
    let arr = loadArrFromDB();
    arr.push(bank);
    localStorage.setItem('banks', JSON.stringify(arr));
    showBanks()
    document.getElementById("probaCalc").style.visibility = "visible";
    console.log(loadArrFromDB())
}

function showBanks() {
    div.innerHTML = "";

    loadArrFromDB().forEach ((bank)=>{
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
            saveInDB();
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
                saveInDB();
                showBanks();                   
                break;
            case 2:
                banks[Math.trunc(ind/5)].interestRate = prompt('Enter interestRate');
                console.log(`${banks[Math.trunc(ind/5)].maxLoan}`);
                saveInDB();
                showBanks()
                break;
            case 3:
                banks[Math.trunc(ind/5)].maxLoan = prompt('Enter maxLoan');
                console.log(`${banks[Math.trunc(ind/5)].loanTerm}`);
                saveInDB();
                showBanks()
                break;
            case 4:
                banks[Math.trunc(ind/5)].minDownPayment = prompt('Enter minDownPayment');
                console.log(`${banks[Math.trunc(ind/5)].loanTerm}`);
                saveInDB();
                showBanks()
                break;
            case 0:
                banks[Math.trunc(ind/5)].loanTerm = prompt('Enter loanTerm');
                console.log(`${banks[Math.trunc(ind/5)].loanTerm}`);
                saveInDB();
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

    loadArrFromDB().forEach((bank)=>{
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

function saveInDB() {
  localStorage.clear();
  return localStorage.setItem('banks', JSON.stringify(banks));
}

function loadArrFromDB() {
  return JSON.parse(localStorage.getItem(`banks`));
}
