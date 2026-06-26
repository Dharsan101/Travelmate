// ======================================
// IMAGE MODULE (PEXELS)
// ======================================

const PEXELS_API_KEY = "IrpvdlCTrh6ngDhNUcMmv2Gy46nqPgbrM9jiRHDeHALXoGV0ODHqLSox";

async function getImage(city) {

    try {

        const response = await fetch(
            `https://api.pexels.com/v1/search?query=${city} city landscape&per_page=1`,
            {
                headers: {
                    Authorization: PEXELS_API_KEY
                }
            }
        );

        const data = await response.json();

        if (data.photos && data.photos.length > 0) {

            document.getElementById("cityImage").src =
                data.photos[0].src.large2x;

        } else {

            document.getElementById("cityImage").src =
                "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg";

        }

    } catch (error) {

        console.error(error);

    }

}