// ======================================
// BUDGET CALCULATOR
// ======================================

function calculateBudget() {

    const hotel = Number(document.getElementById("hotel").value) || 0;
    const food = Number(document.getElementById("food").value) || 0;
    const transport = Number(document.getElementById("transport").value) || 0;
    const shopping = Number(document.getElementById("shopping").value) || 0;

    const total = hotel + food + transport + shopping;

    document.getElementById("totalBudget").innerHTML = total;

    showBudgetSummary(total);

}

// ======================================
// Budget Summary
// ======================================

function showBudgetSummary(total){

    let summary = document.getElementById("budgetSummary");

    if(!summary){

        summary = document.createElement("div");

        summary.id = "budgetSummary";

        summary.style.marginTop = "30px";

        summary.style.padding = "20px";

        summary.style.borderRadius = "15px";

        summary.style.background = "#f3f7fb";

        document.querySelector(".budget-box").appendChild(summary);

    }

    const days = 5;
    const people = 2;

    summary.innerHTML = `

<h3>📊 Budget Summary</h3>

<p><strong>Total Budget:</strong> ₹${total}</p>

<p><strong>Daily Budget:</strong> ₹${Math.round(total/days)}</p>

<p><strong>Budget Per Person:</strong> ₹${Math.round(total/people)}</p>

`;

}