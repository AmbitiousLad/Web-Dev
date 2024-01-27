const api_key = "13810950730844990e7a6188";
const api = `https://v6.exchangerate-api.com/v6/${api_key}/latest/USD`;
const fromDropdown = document.getElementById("from-currency-select");
const toDropdown = document.getElementById("to-currency-select");
const currency = [
    "USD", "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", 
    "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", 
    "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY", "COP", "CRC", 
    "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", 
    "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", 
    "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", 
    "IRR", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KID", "KMF", 
    "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", 
    "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", 
    "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", 
    "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", 
    "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD", "SSP", 
    "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TVD", 
    "TWD", "TZS", "UAH", "UGX", "UYU", "UZS", "VES", "VND", "VUV", "WST", "XAF", 
    "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMW", "ZWL"
  ];

currency.forEach((curr) => {
    const option = document.createElement("option");
    option.text = curr;
    option.value = curr;
    fromDropdown.append(option);
});

currency.forEach(function (curr) {
    const option = document.createElement("option");
    option.text = curr;
    option.value = curr;
    toDropdown.append(option);
});


fromDropdown.value="INR"
toDropdown.value="USD"

let result = document.querySelector("#result")

let convertcurr = ()=>{
    const amount = document.querySelector("#amount").value;
    const fromdrop = fromDropdown.value;
    const todrop = toDropdown.value;

    if (amount.length !== 0) {
        fetch(api)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.result === "success") {
                    let fromrate = data.conversion_rates[fromdrop];
                    let torate = data.conversion_rates[todrop];

                    let convertedAmt = (amount / fromrate) * torate;
                    result.innerHTML = `${amount} ${fromdrop} = ${convertedAmt.toFixed(2)} ${todrop}`;
                } else {
                    result.innerHTML = "Error fetching exchange rates";
                }
            })
            .catch((error) => {
                result.innerHTML = "Error fetching exchange rates";
                console.error(error);
            });
    } else {
        alert("Please fill the amount");
    }
}


document.querySelector("#convert-button").addEventListener("click",convertcurr)
window.addEventListener("load",convertcurr)