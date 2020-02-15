var moneyData = {};

// "https://www.realestate.com.au/*",
// "https://reiwa.com.au/*",

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "start") {

            var moneyObj = {
                "pay": request.pay,
                "savings": request.saving,
                "expenses": request.expenses
            }

            console.log("received job for ", moneyObj);

            decideSite(moneyObj);
        }
    }
);

function decideSite(moneyObject) {

    console.log("Received message and processing job...", moneyObject);

    var url = window.location.href;

    if (url.includes("realestate.com.au/property")) {
        console.log("detected inside property...");
        propertyMathAndDisplay(moneyObject.pay, moneyObject.savings, moneyObject.expenses);
    }
    else if (url.includes("realestate.com.au/rent")) {
        console.log("detected inside rent listings...");
        listingMathAndDisplay(moneyObject.pay, moneyObject.savings, moneyObject.expenses);
    }
    else if (url.includes("reiwa.com.au")) {
        if (url.includes("rental-properties")) {
            console.log("detected inside rent listings (reiwa)...");
            reiwaPropertyListingsMathAndDisplay(moneyObject.pay, moneyObject.savings, moneyObject.expenses);
        }
        else {
            // Reiwa Property not a list....
            console.log("detected inside a property (reiwa)...");
            reiwaPropertyListingsMathAndDisplay(moneyObject.pay, moneyObject.savings, moneyObject.expenses);
        }
    }
    else if (url.includes("domain.com.au")) {
        if (url.includes("/rent/")) {
            console.log("detected inside rent listings (domain.com.au)...");
            domainListingMathAndDisplay(moneyObject.pay, moneyObject.savings, moneyObject.expenses);
        }
        else {
            // Reiwa Property not a list....
            console.log("detected inside a property (domain.com.au)...");
            domainPropertyMathAndDisplay(moneyObject.pay, moneyObject.savings, moneyObject.expenses);
        }
    }
}

window.addEventListener("load", function load(event) {

    console.log("Loaded site with rent tools...");

    window.removeEventListener("load", load, false); //remove listener, no longer needed
    //enter here the action you want to do once loaded 
    chrome.storage.local.get(['moneyData'], function (data) {
        moneyData = data.moneyData

        if (moneyData != {}) {

            console.log("We have money data already ", moneyData);
            // Need to see what page we are on

            decideSite(moneyData);

        }
    });
}, false);

// www.realestate.com.au

function propertyMathAndDisplay(paynum, savingsnum, expensesnum) {

    // Have to get the first thingymabobo

    var upper = $('.property-info__property-price-details');

    var propertyPrice = $('.property-price')[0].textContent;
    let cost = propertyPrice.substring(1, 4);

    let leftOver = paynum - savingsnum - expensesnum - cost
    var para = document.createElement("div");

    var newText = document.createTextNode("Money left to spend $" + leftOver);
    para.appendChild(newText);
    upper[0].appendChild(para);
}


function listingMathAndDisplay(paynum, savingsnum, expensesnum) {

    // Nothing here so who cares
    console.log("We have received the message :D");

    // Get all property costs
    var plist = $('.residential-card__content');

    for (var property in plist) {
        let cost = plist[property].textContent.substring(1, 4);

        // Do the Calculation
        let leftOver = paynum - savingsnum - expensesnum - cost
        var para = document.createElement("div");

        var newText = document.createTextNode("Money left to spend $" + leftOver);
        para.appendChild(newText);
        plist[property].appendChild(para);
    }
}

function domainPropertyMathAndDisplay(paynum, savingsnum, expensesnum) {

    // Have to get the first thingymabobo

    var target = $('.listing-details__summary-title');
    var upper = target[0].parentElement;

    var propertyPrice = target[0].innerText;
    let cost = propertyPrice.substring(1, 4);

    let leftOver = paynum - savingsnum - expensesnum - cost
    var para = document.createElement("div");

    var newText = document.createTextNode("Money left to spend $" + leftOver);
    para.appendChild(newText);
    upper.appendChild(para);
}


function domainListingMathAndDisplay(paynum, savingsnum, expensesnum) {

    // Nothing here so who cares
    console.log("We have received the message :D");

    // Get all property costs
    var plist = $('.listing-result__price');

    for (var property in plist) {
        let cost = plist[property].innerText.substring(1, 4);

        // Do the Calculation
        let leftOver = paynum - savingsnum - expensesnum - cost
        var para = document.createElement("div");

        var newText = document.createTextNode("Money left to spend $" + leftOver);
        para.appendChild(newText);
        plist[property].parentElement.appendChild(para);
    }
}


// reiwa.com.au

var paynum = 1131
var savingsnum = 200
var expensesnum = 350

function reiwaPropertyListingsMathAndDisplay() {

    var rentPrice = $('.result-desc > h2');

    for (var price in rentPrice) {
        let cost = rentPrice[price].innerText.substring(1, 4);
        var rentPriceParent = rentPrice[price].parentElement;

        // Do the Calculation
        let leftOver = paynum - savingsnum - expensesnum - cost
        var para = document.createElement("div");

        var newText = document.createTextNode("Money left to spend $" + leftOver);
        para.appendChild(newText);
        rentPriceParent.appendChild(para);
    }
}

function reiwaPropertyMathAndDisplay(paynum, savingsnum, expensesnum) {

    // Have to get the first thingymabobo

    var costTargetList = $('.pd-details-subtext').toArray();

    var costTarget = "";
    let costText = "";

    for (var i = 0; i < costTargetList.length; i++) {
        if (costTargetList[i].innerText.includes("Week")) {
            costText = costTargetList[i].innerText.substring(1, 4);
            costTarget = costTargetList[i];
        }
    }

    var upper = costTarget.parentElement;
    let cost = costText;

    let leftOver = paynum - savingsnum - expensesnum - cost
    var para = document.createElement("div");

    var newText = document.createTextNode("Money left to spend $" + leftOver);
    para.appendChild(newText);
    upper.appendChild(para);
}