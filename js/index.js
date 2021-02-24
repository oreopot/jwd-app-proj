
// function to get data for the city input 
const getDataForCity = (city, unit) => fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.SECRET_API_KEY}&units=${unit}`)
    .then(response => response.json());

  
const createHtml = (name, status, temp, feelsLike, description) => {
    const html =
    `<div class="card">
  <div class="row align-items-center">    
    <div class="col-2 h2 pl-1 pt-1 text-center">                
      ${status}
    </div>
    <div class="col-10">
      <div class="card-body">
        <div class="row card-title justify-content-between align-items-center mr-3 mb-1">
          <h4>${name}</h4>
          <h6>${temp}, feels like ${feelsLike}c</h6>
        </div>
        <div class="row">
          <h5 class="card-subtitle text-muted">${description}</h5>
        </div>
      </div>
    </div>
  </div>
</div>
`
return html;
};
// object used to find the right emoji from the icon code sent from the api
const status = {
    '01d': '☀️',
    '02d': '⛅️',
    '03d': '☁️',
    '04d': '☁️',
    '09d': '🌧',
    '10d': '🌦',
    '11d': '⛈',
    '13d': '❄️',
    '50d': '💨',
    '01n': '☀️',
    '02n': '⛅️',
    '03n': '☁️',
    '04n': '☁️',
    '09n': '🌧',
    '10n': '🌦',
    '11n': '⛈',
    '13n': '❄️',
    '50n': '💨',
  };

  // getting the input data
const submit = document.querySelector('#go-button');
const cityInput = document.querySelector('#city-input');
const unitInput = document.querySelector('#unit');
const weatherContainer = document.querySelector('#weather-container');

// event listener for a click event on the "Go!" button
submit.addEventListener('click', () => {
    // get the city from the input field
    const city = cityInput.value;
    const unit = unitInput.value;

    // get the weather data for the city
    getDataForCity(city, unit)
      .then(data => {
        // get the data we need for our html from the response
        const name = data.name;
        const emoji = status[data.weather[0].icon];
        const temp = data.main.temp;
        const feelsLike = data.main.feels_like;
        const description = data.weather[0].description;
  
        // create the card html
        const cardHtml = createHtml(name, emoji, temp, feelsLike, description);
  
        // render!
        weatherContainer.innerHTML = cardHtml;
      });
  });
 