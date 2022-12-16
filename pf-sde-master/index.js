

const axios = require('axios');

let expenseData = [
    {
        "amount": 50,
        "startDate": "2020-01-01T00:00:00.000Z"
      },
      {
        "amount": 20,
        "startDate": "2021-02-01T00:00:00.000Z"
      },
      {
        "amount": 30,
        "startDate": "2021-03-01T00:00:00.000Z"
      }
];

let revenueData = [
    {
        "amount": 60,
        "startDate": "2021-02-01T00:00:00.000Z"
      }
];

let balance = [];

var holder = {};
var holders = {};

revenueData.forEach(function (d) {
  if (holder.hasOwnProperty(d.startDate)) {
    holder[d.startDate] = holder[d.startDate] + d.amount;
  } else {
    holder[d.startDate] = d.amount;
  }
});

var revenueDataobj2 = [];

for (var prop in holder) {
  revenueDataobj2.push({ startDate: prop, amount: holder[prop] });
}

expenseData.forEach(function (d) {
  if (holders.hasOwnProperty(d.startDate)) {
    holders[d.startDate] = holders[d.startDate] + d.amount;
  } else {
    holders[d.startDate] = d.amount;
  }
});

var expenseDataobj2 = [];

for (var prop in holders) {
  expenseDataobj2.push({ startDate: prop, amount: holders[prop] });
}

const filter = expenseDataobj2.map((d) =>
  d.amount == 0
    ? { startDate: d.startDate, amount: Number(0) }
    : { startDate: d.startDate, amount: -Number(d.amount) }
);

for (let i = 0; i < filter.length; i++) {
  revenueDataobj2.push(filter[i]);
}

const balancesheet = revenueDataobj2.sort((a, b) => {
  return new Date(a.startDate) - new Date(b.startDate);
});

let data = balancesheet;
let dataobj = {};


data.forEach(function (d) {
  if (dataobj.hasOwnProperty(d.startDate)) {
    dataobj[d.startDate] = dataobj[d.startDate] + d.amount;
  } else {
    dataobj[d.startDate] = d.amount;
  }
});

var dataobj2 = [];

for (let props in dataobj) {
  dataobj2.push({ startDate: props, amount: dataobj[props] });
}

const moth = new Date(dataobj2[0].startDate).getMonth() + 1;
var past_date = new Date(dataobj2[0]?.startDate);
var current_date = new Date(dataobj2[dataobj2.length - 1]?.startDate);
let counter = 1;

var difference =
  current_date.getFullYear() * 12 +
  current_date.getMonth() -
  (past_date.getFullYear() * 12 + past_date.getMonth());

let initialDate = new Date(dataobj2[0].startDate);

function amount(d) {
     const filterr = dataobj2.filter((elem,index)=>{
        return new Date(elem.startDate).toDateString() ==  new Date(d).toDateString()
     })
 const sum = filterr.reduce((acc, curr) => acc + curr.amount, 0);

     return sum
}

for (let i = 0; i <= difference; i++) {
  let d = new Date(
    initialDate.getFullYear(),
    initialDate.getMonth() + i,
    initialDate.getDate(),
    initialDate.getHours(),
    initialDate.getMinutes(),
    initialDate.getSeconds()
  )
    console.log(new Date("2020-02-01T00:00:00.000Z").toDateString()== new Date('Sat Feb 01 2020 05:30:00 GMT+0530 (India Standard Time)').toDateString())

  balance = [...balance, { amount: amount(d), startDate:d }]
}
datapost(balance)
async function datapost(balance){
    for(let i=0; i<balance.length; i++) {
 await  axios.post("http://localhost:3000/balance",balance[i])
.then(function(res){ console.log(res) })
.catch(function(res){ console.log(res) })

    }
}


