const APIKey = '83c450acdd6a763235afe012c38bb5d5';
const searchInputEl = $('#go');
const todayEl = $('#today');
const dayElArr = [$('#day-1'),
$('#day-2'),
$('#day-3'),
$('#day-4'),
$('#day-5')];

function fetchWeatherForecast( city) {
   console.log(city);
    let forecast;
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&cnt=${40}&units=imperial&appid=${APIKey}`).then(response =>{
        return response.json()
        
    }).then(response =>{
        console.log(response);

        forecast = response.list;
        console.log(forecast);
     return forecast;
    });
    
}

function createForecast(forecast) {
    
    for(day of dayElArr){
        day.empty();
    }
    // let i = 0;
    // for(day of forecast){
    //     dayElArr[i].append(createdayCard(day));
    //     i++;
    // }

    let index = 0;
    for(let i = 0; i<forecast.length; i= i+8){
        dayElArr[index].append(createdayCard(forecast[i]));
        index++;
    }
}

function createdayCard(day) {


    const date = day.dt_txt;

    const temp = day.main.temp.day;

    const wind = day.main.speed;
    const humidity = day.main.humidity;
    const dayEl = $('<div>');
    dayEl.append($('<h3>')
        .addClass('')
        .text(date));
    dayEl.append($('<img>')
        .attr('src', ` https://openweathermap.org/img/wn/${day.weather[0].icon}.png`)
        .addClass(''));
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

function createHeroForecast(day, city){
    todayEl.empty();
    console.log(day);
    const date = day.dt_txt;

    const temp = day.main.temp;

    const wind = day.wind.speed;
    const humidity = day.main.humidity;
    
    todayEl.append($('<h2>')
        .addClass('')
        .text(`${city} - ${date}`));
    todayEl.append($('<img>')
        .attr('src', `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`)
        .addClass('col-2'));
    todayEl.append($('<p>')
        .addClass('')
        .text(`Temp: ${temp}`));
    todayEl.append($('<p>')
        .addClass('')
        .text(`Wind: ${wind} MPH`));
    todayEl.append($('<p>')
        .addClass('')
        .text(`Humidity: ${humidity} %`));

}

function fetchCityCoords(city) {
    

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`)
    .then(response =>{
        return response.json()})
    .then(response =>{
        console.log(response);
        const cityOb = {
            lat: response[0].lat,
            lon: response[0].lon
        };
        console.log(cityOb);
        
        return cityOb;
    })
    .then(cityOb => {
        
        console.log(cityOb);
        fetchWeatherForecast(cityOb).then(forecast =>{

       
        console.log(forecast);

            const today = forecast.shift();
            console.log(today);
        
            createHeroForecast(today, city);
            createForecast(forecast);
            return cityOb;
        })});
}

    
    


function handleSearch(input){
  
    
    
    console.log(input);
    fetchCityCoords(input);


}

$(document).ready(function(){

    $('#form').submit(event =>{
        event.preventDefault();
        const input = searchInputEl.val();
        searchInputEl.val('');
        console.log(input);
        handleSearch(input);

    });

});