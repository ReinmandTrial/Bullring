const calcBlock = document.querySelector('[data-calc]')
const caclProfitList = Array.from(calcBlock.querySelectorAll('.first-step__input'))
const calcIncomeList = calcBlock.querySelectorAll('.income__val')
const calcSuggestButtons = calcBlock.querySelectorAll('[data-suggest-btn]')

calcIncome()

calcBlock.addEventListener('input', calcIncome)
calcBlock.addEventListener('click', (el) => {
   if (el.target.classList.contains('compaunding__dot')) calcIncome()
   if (el.target.classList.contains('landing-third-step__suggest-val')) {
      calcBlock.querySelector('[data-invest-sum]').value = el.target.textContent
      calcIncome()
   }
})
caclProfitList.forEach((input) => {
   input.addEventListener('change', () => {
      calcIncome()
   })
})

function calcIncome() {
   const profit = caclProfitList.find((input) => input.checked).value
   const comp = getComp(calcBlock.querySelector('[data-comp-val]').value)
   const invest = +calcBlock.querySelector('[data-invest-sum]').value
   const incomeYear = []
   const counter = amounts(invest)
   for (let i = 1; i < 361; i++) {
      calcIteration(profit, comp, counter)
      if (!(i % 30)) incomeYear.push(counter.getBalance() + counter.getEarn())
   }
   setIncome(incomeYear)
}
function setIncome(incomeYear) {
   for (let i = 0; i < calcIncomeList.length; i++) {
      calcIncomeList[i].textContent = incomeYear[i]
   }
}

function calcIteration(profit, comp, counter) {
   const dayProfit = (counter.getBalance() / 100) * profit
   counter.setBalanc((dayProfit / 100) * comp)
   counter.setEarn((dayProfit / 100) * (100 - comp))
}
function amounts(startBalance) {
   let balanc = startBalance
   let earn = 0
   return {
      setBalanc: (sum) => (balanc += sum),
      setEarn: (sum) => (earn += sum),
      getBalance: () => +balanc.toFixed(0),
      getEarn: () => +earn.toFixed(0),
   }
}
function getComp(val) {
   return +(val[val.length - 1] === '%' ? val.slice(0, -1) : val)
}
