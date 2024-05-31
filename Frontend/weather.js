const result = document.querySelector('body .result');

function toptob() {
    result.style.animation = 'btotop 1s ease-out 0.5s 1 reverse forwards';
    location.reload();
}


function getPlace() {
    var place = document.querySelector('.search-bar');
    console.log(place.value);
    const APIkey = 'f8e62795d602ee1454306ec4d57940cf';
    if (place.value === '') {
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place.value}&units=metric&appid=${APIkey}`).then(response => response.json()).then(json => {
        result.style.animation = 'btotop 1s ease-out 0.5s 1 forwards';
        if (json.cod === '404') {
            result.innerHTML = `<img class="oops" src="oops.jpeg" alt="error_image" width=400px>
            <button class="back" onclick="toptob()">Go Back</button>`;
        }
        else {
            const object = json;
            console.log(object);
            const temperature = json.main.temp;
            const name = json.name;
            const feels_like = json.main.feels_like;
            const humidity = json.main.humidity;
            const visibility = json.visibility;
            const pressure = json.main.pressure;
            const { speed, deg, gust } = json.wind;
            const clouds = json.clouds.all;
            const weather = json.weather[0].main;
            const description = json.weather[0].description;

            document.querySelector('.place-name').innerHTML = `${name}`;
            document.querySelector('.temp').innerHTML = `${temperature}&deg;C`;
            document.querySelector('.feels-like').innerHTML = `Feels like ${feels_like}&deg;C`;
            document.querySelector('.des').innerHTML = `${weather}`;
            document.querySelector('.speed').innerHTML = `Speed: ${speed}kmph`;
            document.querySelector('.deg').innerHTML = `Deg: ${deg}`;
            document.querySelector('.visib p').innerHTML = `${visibility} m`;
            document.querySelector('.pressure p').innerHTML = `${pressure} hPa`;
            document.querySelector('.clouds p').innerHTML = `${clouds}%`;
            document.querySelector('.humidity p').innerHTML = `${humidity}%`;

            const image = document.querySelector('.image');
            const spotify = document.querySelector('.playlist');

            if (gust != undefined) {
                document.querySelector('.gust').innerHTML = `Gust: ${gust}kmph`;
            }
            else {
                document.querySelector('.gust').innerHTML = `Gust: 0kmph`;
            }
            switch (json.weather[0].main) {
                case 'Rain':
                    image.innerHTML = `<img class="left-img" src="left_corner/rainy.jpg" alt="rainy">`;
                    break;
                case 'Snow':
                    image.innerHTML = `<img class="left-img" src="left_corner/snowy.jpg" alt="snowyy">`;
                    break;
                case 'Clouds':
                    image.innerHTML = `<img class="left-img" src="left_corner/foggy.jpg" alt="foggy">`;
                    break;
                case 'Haze':
                    image.innerHTML = `<img class="left-img" src="left_corner/windy.jpg" alt="windy">`;
                    break;
                default:
                    image.innerHTML = `<img class="left-img" src="left_corner/sunny.jpg" alt="sky">`;
            }
            switch (json.weather[0].main) {
                case 'Rain':
                    spotify.href = `https://open.spotify.com/playlist/3EbRtURel5S4OzB8bXvCfv?si=c92e0a806483469c`;
                    break;
                case 'Snow':
                    spotify.href = `https://open.spotify.com/playlist/5Yso90BkGgYn5ftM8pQLis?si=2375beebae664fee`;
                    break;
                case 'Clouds':
                    spotify.href = `https://open.spotify.com/playlist/5mRQyoBn4gIJIiZeDafa6G?si=32595dd3b1554ab9`;
                    break;
                case 'Haze':
                    spotify.href = `https://open.spotify.com/playlist/05gTJ0Qez0XjPHDpVmky7A?si=437ef52ff0444590`;
                    break;
                default:
                    spotify.href = `https://open.spotify.com/playlist/7bGMboeZhN1bj0CHuuIVTH?si=e4f31c2a0dfa4bc3`;
            }
        }
    })
    place.value = "";
}

function press(event) {
    if (event.key === 'Enter') {
        getPlace();
    }
}

const dyk = "Did You Know:";

window.addEventListener('DOMContentLoaded', () => {
    fetch('https://sky-scout-ebon.vercel.app/')
        .then(response => response.json())
        .then(data => {
            // Display the quote on the page
            quote = data.quote;
            console.log(quote);
            quote = "Did You Know: " + `${quote}`;

            let index = 0;

            setInterval(() => {
                if (index < quote.length) {
                    document.querySelector('.diduknow').innerHTML += `${quote[index]}`;
                    index++;
                }
            }, 50);

        })
        .catch(error => {
            console.error('An error occurred:', error);
        });
});