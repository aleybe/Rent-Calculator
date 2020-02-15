
export function calculate(pay, rent, savings, expenses) {
    if (pay - rent - savings - expenses < 0) {
        return ("you can not afford this")
    }
    else {
        return (pay - rent - savings - expenses)
    }
}

export default function calcForProperty(pay, savings, expenses) {

    // Need to see what page we are on
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        var url = tabs[0].url;

        if (url.contains("realestate.com.au/property")) {
            // We are on the property page
        }
        else if (url.contains("realestate.com.au/rent")) {
            calculateForListings(pay, savings, expenses);
        }
        else {
            return;
        }
    });

}

export function calculateForListings(pay, savings, expenses) {
    listingMathAndDisplay(pay, savings, expenses);
}


export function listingMathAndDisplay(paynum, savingsnum, expensesnum) {

    // Nothing here so who cares
    if (payNumber == "") { return; }

    // Get all property costs
    var plist = $('.residential-card__content');

    for (var property in plist) {
        let cost = plist[property].textContent.substring(1, 4);

        // Do the Calculation
        let leftOver = paynum - savingsnum - expensesnum - cost
        var para = document.createElement("div");

        var newText = document.createTextNode("left over (Kinetic) = " + leftOver);
        para.appendChild(newText);
        plist[property].appendChild(para);
    }
}

