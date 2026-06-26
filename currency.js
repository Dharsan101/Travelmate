// ======================================
// CURRENCY CONVERTER
// ======================================

async function convertCurrency() {

    const amount = Number(document.getElementById("amount").value);

    const from = document.getElementById("fromCurrency").value;

    const to = document.getElementById("toCurrency").value;

    if (amount <= 0) {

        alert("Enter a valid amount");

        return;

    }

    try {

        const response = await fetch(
            `https://open.er-api.com/v6/latest/${from}`
        );

        const data = await response.json();

        const rate = data.rates[to];

        const result = (amount * rate).toFixed(2);

        document.getElementById("currencyResult").innerHTML =
            `${amount} ${from} = ${result} ${to}`;

    }

    catch (error) {

        console.log(error);

        alert("Currency conversion failed.");

    }

}