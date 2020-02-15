var moneyData = {};

document.addEventListener('DOMContentLoaded', function () {

    console.log("Started!");

    var payInputs = document.getElementById('payInput');
    var savingsInputs = document.getElementById('savingsInput');
    var expensesInputs = document.getElementById('expensesInput');

    var saveButton = document.getElementById('SaveButton');

    saveButton.addEventListener('click', function () {
        // Do the math
        if (payInputs.value == ""
            || savingsInput.value == ""
            || expensesInputs.value == "") { return; }

        moneyData = {
            "pay": payInputs.value,
            "savings": savingsInput.value,
            "expenses": expensesInputs.value,
        }

        saveMoney();

        MathAndDisplay(payInputs.value, savingsInputs.value, expensesInputs.value);

    }, false);

    // payInputs.addEventListener('change', function () {
    //     // Do the math
    //     calcForProperty(payInputs.value, savingsInput.value, expensesInput.value);

    // }, false);

    // savingsInputs.addEventListener('change', function () {
    //     // Do the math
    //     calcForProperty(payInputs.value, savingsInput.value, expensesInput.value);

    // }, false);

    // expensesInputs.addEventListener('change', function () {
    //     // Do the math
    //     calcForProperty(payInputs.value, savingsInput.value, expensesInput.value);

    // }, false);

}, false);


function saveMoney(callback) {
    chrome.storage.local.set({ 'moneyData': moneyData }, function () {

        console.log("Saving my money data!!");
        console.log(moneyData);

        if (typeof callback === 'function') {
            //If there was no callback provided, don't try to call it.
            callback();
        }
    });
}

function calcForProperty(pay, savings, expenses) {

    // Need to see what page we are on
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        var url = tabs[0].url;

        MathAndDisplay(pay, savings, expenses);
    });

}

function MathAndDisplay(paynum, savingsnum, expensesnum) {

    // Nothing here so who cares
    if (paynum == ""
        || savingsnum == ""
        || expensesnum == "") { return; }

    console.log("Sending job to backend...");

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];

        chrome.tabs.sendMessage(activeTab.id, {
            "message": "start",
            "pay": paynum,
            "saving": savingsnum,
            "expenses": expensesnum,
        });
    });
}



