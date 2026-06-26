// ===============================
// TravelMate Script
// ===============================

// Weather API Key
const WEATHER_API_KEY = "a4238b2981cb20c4effacd1744802f07";

// Map Variables
let map;
let marker;

// Buttons
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const budgetBtn = document.getElementById("budgetBtn");
const convertBtn = document.getElementById("convertBtn");
const addTaskBtn = document.getElementById("addTask");

// Events
searchBtn.addEventListener("click", searchDestination);
cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        searchDestination();
    }
});
budgetBtn.addEventListener("click", calculateBudget);
convertBtn.addEventListener("click", convertCurrency);
addTaskBtn.addEventListener("click", addTask);

// Initialize Map
window.onload = () => {

    map = L.map("map").setView([20.5937,78.9629],5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{

        attribution:"© OpenStreetMap"

    }).addTo(map);

};

// =================================
// Search Destination
// =================================

async function searchDestination() {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a destination");
        return;
    }

    searchBtn.disabled = true;
    searchBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Searching`;

    await Promise.allSettled([
        getWeather(city),
        getImage(city),
        updateMap(city)
    ]);

    // Wait for data to load then scroll
    setTimeout(() => {
        document.querySelector(".destination-image").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 1200);

    searchBtn.disabled = false;
    searchBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> Search`;
    cityInput.focus();

}