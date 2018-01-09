// constants.

// Rates of Tax and Allowances
// Source: HM Revenue & Customs

const allowances = {
  personal : 11500,
  limit : 100000,
  maxLevelMarriedAllowance : 8355,
  minLevelMarriedAllowance : 3220,
  blind: 2290,
  startingRateSavings: 5000,
  personalSavingsAllowance: 1000,
  personalSavingsAllowanceHigher: 500,
  dividend: 5000,
  marriage: 1100
};

const rates = {
  basic: {
    min: 11000.01,
    max: 32000,
    percentage: 20
  },
  higher: {
    min: 32001,
    max: 150000,
    percentage: 40
  },
  additional: {
    min: 150001,
    percentage: 45
  }
}

const nationalInsuranceRates = {
  // rates are in months
  class1: {
    base: {
      min: 680,
      max: 3750,
      percentage: 12
    },
    higher: {
      min: 3750.01,
      percentage: 2
    }
  }
}
const dividendRates = {
  allowance: {
    min: 1,
    max: 5000,
    percentage: 0
  },
  ordinary: {
    min: 5001,
    max: 32000,
    percentage: 7.5
  },
  upper: {
    min: 32001,
    max: 150000,
    percentage: 32.5
  },
  additional: {
    min: 150001,
    percentage: 38.1
  }
}

const studentLoan = {
  plan1: {
    date : 0,
    min: 17775,
    percentage: 9
  },
  // if loans were taken
  // > 1st Sept. 2012 then you're on Plan 2.
  plan2: {
    date: 1346457600,
    min: 21000,
    percentage: 9
  }
}

let input = {
  salary: 28000,
  loans: {
    student: true,
    takeoutDate: new Date("October 13, 2015")
  },
  married: false
};

function calculateTakeHome(input){
  // initiate response
  let results = {
    takehome : input.salary
  }
  // behold the logic
  // let's start with the salary.

  // remove the personal limit
  if (results.takehome < allowances.personal){
    return results
  }

  // remove the rates accordingly
  // go through the rates.

  // then consider other factors.
}

function calculatePostTaxIncome(income){
  let before = income;
  let after = 0;
  let taxable = 0;
  let tax = 0;
  let grossTax = 0;

  if (before < allowances.personal){
    // income is too low to be taxed.
    after = before;
  } else {
    // start cutting stuff from the salary
    after = allowances.personal;

    if (before > rates.basic.min){
      // in the basic tax rate.
      taxable = before - allowances.personal;
      tax = (taxable * rates.basic.percentage / 100);
      grosstax += tax;
      after += (taxable - tax);
    }
    if (income > rates.higher.min){
      // in the higher tax rate
      taxable = before - rates.basic.max;
      tax = (taxable * rates.higher.percentage / 100);
      grosstax += tax;
      after += taxable - tax;
    }
    if (income > rates.higher.min){
      // in the extra tax rate
      taxable = before - rates.higher.max; 
      tax = (taxable * rates.additional.percentage / 100);
      grosstax += tax;
      after += taxable - tax;
    }
  }
  return after
}

function calculateNationalInsurance(income){
  let ni = 0;
  let monthly = income/12;
  if (monthly > nationalInsuranceRates.class1.base.min && 
    monthly < nationalInsuranceRates.class1.base.max){
    ni += income * nationalInsuranceRates.class1.base.percentage / 100;
  }
  if (monthly > nationalInsuranceRates.class1.base.max){
    ni += income * nationalInsuranceRates.class1.higher.percentage / 100;
  }
  return ni;
}

// dang your mother is so fat that when she jumped up she got stuck