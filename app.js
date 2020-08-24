window.addEventListener('load', () => {
    let long, lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    const iconHtml = document.getElementById('icon');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            // lat=33.441792&lon=-94.037689

            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&
            exclude=hourly,daily&appid=25b719ece85bc39c34a30d9775d3a893`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const temperature = data.current.temp;
                const summary = data.current.weather[0].description;
                const icon = data.current.weather[0].icon;
                function convertToCelsius() {
                    let K = temperature;
                    let C;
                    C = K - 273.15;
                    let newC = C.toFixed(2);
                    return newC;
                }

                // Set DOM elements from API
                temperatureDegree.textContent = convertToCelsius();
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                iconHtml.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            });
        });
    }
});