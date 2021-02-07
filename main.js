const banks = [];
const div = document.getElementById('table');
const calc = document.getElementById('calcWrapper');
const titles = [`Bank's name`, `InterestRate`, `MaxLoan`, 'MinDownPayment', 'LoanTerm'];

function addBank() {
    const bank = {};
    bank["name"] = prompt(`Enter bank's name`);
    bank["interestRate"] = Number(prompt(`Enter bank's interestRate`));
    bank["maxLoan"] = Number(prompt(`Enter bank's maxLoan`));
    bank["minDownPayment"] = Number(prompt(`Enter bank's minDownPayment`));
    bank["loanTerm"] = Number(prompt(`Enter bank's loanTerm`));
    banks.push(bank);
    showBanks()
    document.getElementById("getCalc").style.visibility = "visible";
}

function showBanks() {
    div.innerHTML = "";

    banks.forEach ((bank)=>{
        let arr = Object.values(bank)
        let row = document.createElement('div');
        row.className = 'tableRow';
        for (let index = 0; index < arr.length; index++) {
            let column = document.createElement('div');
            column.className = 'tableColumn'
            column.innerHTML = `
            ${titles[index]} : ${arr[index]}
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
            showBanks()
    }))    
})
}

function editBank() {
    const arr = [...document.querySelectorAll('.tableColumn')]
    arr.forEach ((btn, ind) => {
    btn.addEventListener('mousedown', ((event)=>{
        event.preventDefault();
        btn.style.backgroundColor = 'red';
        //console.log(Object.values(banks[Math.trunc(ind/5)]));
        console.log((ind+1)%5)
        switch ((ind+1)%5){
            case 1:
                banks[Math.trunc(ind/5)].name = prompt('Enter name');                
                console.log(`${banks[Math.trunc(ind/5)].name}`);
                showBanks();                   
                break;
            case 2:
                banks[Math.trunc(ind/5)].interestRate = prompt('Enter interestRate');
                console.log(`${banks[Math.trunc(ind/5)].maxLoan}`);
                showBanks()
                break;
            case 3:
                banks[Math.trunc(ind/5)].maxLoan = prompt('Enter maxLoan');
                console.log(`${banks[Math.trunc(ind/5)].loanTerm}`);
                showBanks()
                break;
            case 4:
                banks[Math.trunc(ind/5)].minDownPayment = prompt('Enter minDownPayment');
                console.log(`${banks[Math.trunc(ind/5)].loanTerm}`);
                showBanks()
                break;
            case 0:
                banks[Math.trunc(ind/5)].loanTerm = prompt('Enter loanTerm');
                console.log(`${banks[Math.trunc(ind/5)].loanTerm}`);
                showBanks()
                break;
        }  
}))    
})
}

function getCalculate() {
    info = {}
    info["bank"] = prompt(`Enter bank's name`);
    info['downPayment'] = Number(prompt(`Down payment`));
    info['initialLoan']  = Number(prompt(`Initial loan`));
    console.log(info)
    let isName = true;

    banks.forEach((bank)=>{
        if (bank.name == info.bank) {
            isName = false;
            if (bank.minDownPayment > info.downPayment) {
                alert('change bank or up you downPayment')
                return
            }
            const a = Math.pow((1 + bank.interestRate/12),bank.loanTerm)
            const m = (Math.round((((info.initialLoan-info.downPayment)*((bank.interestRate)/12)*a)/(a-1))+100)/100);
            console.log(m)
            
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