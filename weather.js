// =============================
// WEATHER MODULE
// =============================

async function getWeather(city){

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;

    try{

        const response = await fetch(url);

        if(!response.ok){

            throw new Error("City not found");

        }

        const data = await response.json();

        document.getElementById("cityName").innerHTML=data.name;

        document.getElementById("temperature").innerHTML=
        Math.round(data.main.temp)+"°C";

        document.getElementById("description").innerHTML=
        data.weather[0].description;

        document.getElementById("humidity").innerHTML=
        data.main.humidity+" %";

        document.getElementById("wind").innerHTML=
        data.wind.speed+" km/h";

        document.getElementById("pressure").innerHTML=
        data.main.pressure+" hPa";

        document.getElementById("feels").innerHTML=
        Math.round(data.main.feels_like)+"°C";

        // Update Map
        updateMapCoordinates(
            data.coord.lat,
            data.coord.lon,
            city
        );

    }

    catch(error){

        alert(error.message);

    }

}
// =============================
// DESTINATION IMAGE
// =============================

