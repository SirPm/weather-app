window.addEventListener('load', () => {
    let long, lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    const iconHtml = document.getElementById('icon');

    //api key: 25b719ece85bc39c34a30d9775d3a893

    // api url: api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=25b719ece85bc39c34a30d9775d3a893

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;
            /*
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://something.com/apikey/${long},${lat}`;*/

            // lat=33.441792&lon=-94.037689

            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&
            exclude=hourly,daily&appid=25b719ece85bc39c34a30d9775d3a893`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                /*
                // This is a shorthand. So instead of doing data.currently.temperature to access the temperature and data.currently.summary to access the summary we just do it like so:-
                const { temperature, summary } = data.currently;
                */

                const temperature = data.current.temp;
                const summary = data.current.weather[0].description;
                const icon = data.current.weather[0].icon;
                function convertToCelsius() {
                    let K = temperature;
                
                    let C;
                    C = K - 273.15;
                    let newC =C.toFixed(2);
                    console.log(newC);
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