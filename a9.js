var sideDish = [];
var meal = [];
var rice = document.getElementById("rice");
var naan = document.getElementById("naan");
var side = document.getElementById("side")
var sd = document.getElementById("sd");
var main = document.getElementById("main");
var total = document.getElementById("total");
var totalMain = 0;
var totalSide = 0;
var totalStarch = 0;
var totalCost = 0;
var table1 = document.getElementById("table1");
var str = "<tr><th>#</th><th>Main</th><th>sideArray</th><th>Rice</th><th>Naan</th><th>Cost</th></tr>";
var str2 = "<tr><td></td><td></td><td></td><td></td><td>Total:</td><td>" + totalCost + "</td></tr>";
table1.innerHTML = str+str2;

function add() {
  if (sideDish.includes(side.value) == false) {
    sideDish.push(side.value);
    sd.innerHTML = "";
    for (let i = 0; i < sideDish.length; i++) {
      sd.innerHTML += "<li>" + sideDish[i] + "</li>" + "<br>";
    }
  }
}

function remove() {
  sideDish = [];
  sd.innerHTML = "";
}

function Order(main,sideArray,rice,naan) {
  this.main = main;
  this.sideArray = sideArray.slice();
  this.rice = rice;
  this.naan = naan;
}

function calculateCost(meal) {
  rice = meal.rice;
  naan = meal.naan;
  totalMain = 0;
  totalSide = 0;
  totalStarch = 0;

  if (meal.main == "LambVindaloo") {
    totalMain += 15;
  } else if (meal.main == "ButterChicken") {
    totalMain += 13;
  } else if (meal.main == "PrawnMasala") {
    totalMain += 17;
  }

  if (meal.sideArray.length > 0) {
    for (let i = 0; i < meal.sideArray.length; i++) {
      switch (meal.sideArray[i]) {
        case "Papadum":
          totalSide += 2.00;
          break;
        case "Samosas":
          totalSide += 5.00;
          break;
        case "Pakoras":
          totalSide += 6.00;
          break;
        case "Kheer":
          totalSide += 5.00;
          break;
      }
    }
  }

  if (rice) {
    totalStarch += 3;
  }
  if (naan) {
    totalStarch += 2;
  }
  return totalMain + totalSide + totalStarch;
}

function addMeal() {
  rice = document.getElementById("rice");
  naan = document.getElementById("naan");
    if (rice.checked == true) {
      rice = true;
    } else {
      rice = false;
    }
    if (naan.checked == true) {
      naan = true;
    } else {
      naan = false;
    }
    meal.push(new Order(main.value,sideDish,rice,naan));
    display();
}

function removeMeal() {
  if (meal.length != 0) {
    totalCost -= calculateCost(meal[meal.length-1]);
    meal.pop();
  }
  display();
}

function resetOrder() {
  totalMain = 0;
  totalSide = 0;
  totalStarch = 0;
  totalCost = 0;
  meal = [];
  sideDish = [];
  display();
}

function display() {
  str = "<tr><th>#</th><th>Main</th><th>sideArray</th><th>Rice</th><th>Naan</th><th>Cost</th></tr>";
  totalCost = 0;
  for (let i = 0; i < meal.length; i++) {
    str += "<tr><td>" + (i+1) +"</td><td>" + meal[i].main + "</td><td>" + meal[i].sideArray + "</td><td>" + meal[i].rice + "</td><td>" + meal[i].naan + "</td><td>" + calculateCost(meal[i]) + "</td></tr>";
    totalCost += calculateCost(meal[i]);
  }
  str2 = "<tr><td></td><td></td><td></td><td></td><td>Total:</td><td>" + totalCost + "</td></tr>";
  table1.innerHTML = str + str2;
}