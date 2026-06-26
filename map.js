// =======================================
// MAP MODULE
// =======================================

let hotelList = document.getElementById("hotelList");
let restaurantList = document.getElementById("restaurantList");

// ---------------------------
// Move Map
// ---------------------------

function updateMapCoordinates(lat, lon, city) {

    if (marker) {
        map.removeLayer(marker);
    }

    map.setView([lat, lon], 13);

    marker = L.marker([lat, lon]).addTo(map);

    marker.bindPopup(`<b>${city}</b>`).openPopup();

    loadNearbyPlaces(lat, lon);
}

// ---------------------------
// Update Map by City Name
// ---------------------------

async function updateMap(city){

    const url =
    `https://nominatim.openstreetmap.org/search?format=json&q=${city}`;

    try{

        const response = await fetch(url);

        const data = await response.json();

        if(data.length===0){

            alert("Location not found");

            return;

        }

        updateMapCoordinates(

            parseFloat(data[0].lat),

            parseFloat(data[0].lon),

            city

        );

    }

    catch(error){

        console.log(error);

    }

}
// =======================================
// Nearby Hotels & Restaurants
// =======================================

async function loadNearbyPlaces(lat, lon){

    hotelList.innerHTML="<p>Loading hotels...</p>";

    restaurantList.innerHTML="<p>Loading restaurants...</p>";

    const query = `
[out:json];

(

node(around:5000,${lat},${lon})["tourism"="hotel"];

node(around:5000,${lat},${lon})["amenity"="restaurant"];

);

out;
`;

    try{

        const response = await fetch(

"https://overpass-api.de/api/interpreter",

{

method:"POST",

body:query

}

);

        const data = await response.json();

        hotelList.innerHTML="";

        restaurantList.innerHTML="";

        data.elements.forEach(place=>{

            const card=`

<div class="card">

<h3>

${place.tags.name || "Unknown"}

</h3>

<p>

${place.tags.tourism ||

place.tags.amenity}

</p>

</div>

`;

            if(place.tags.tourism==="hotel"){

                hotelList.innerHTML+=card;

            }

            if(place.tags.amenity==="restaurant"){

                restaurantList.innerHTML+=card;

            }

        });

    }

    catch(error){

        console.log(error);

    }

}