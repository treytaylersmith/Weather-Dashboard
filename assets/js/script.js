const APIKey = '06213f0c2e95b764ec33382a46f404ff';

const todayEl = $('#today');
const dayElArr = [$('#day-1'),
               $('#day-2'),
               $('#day-3'),
               $('#day-4'),
               $('#day-5')];

function fetchWeatherForecast (event){
    event.preventDefault();
    let forecast = {};

    fetch();

    return forecast;
}

function createForecast(event, forecast){
    event.preventDefault();

   
}

function createdayCard(day, dayEl){
    

    const date = day.dt_txt;

    const temp = day.main.temp.day;

    const wind = day.main.speed;
    const humidity = day.main.humidity;

    



    dayEl.append ($('<h3>')
                    .addClass('')
                    .text(date));
    dayEl.append ($('<img>')
                    .attr('src', ` https://openweathermap.org/img/wn/${day.weather.icon}`));
    dayEl.append($('<p>')
                    .addClass('')
                    .text(`Temp: ${temp}`));
    dayEl.append($('<p>')
                    .addClass('')
                    .text(`Wind: ${wind} MPH`));
    dayEl.append($('<p>')
                    .addClass('')
                    .text(`Humidity: ${humidity} %`));

    return dayEl;
 
}


function fetchCityCoords(city){

}