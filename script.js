const cityElement=document.querySelector("#name");
const dateElement=document.getElementById("#date");
const temperature=document.querySelector("#temp");
const windspeed=document.querySelector("#speed");
const humidity=document.querySelector("#humidity");
const pressure=document.querySelector("#pressure");
const description=document.querySelector("#description");
const icon=document.querySelector("#icon");


const apikey=`c9decfc53262894feb832d90c1a51203`;
const city="Harrogate";

async function fetchWeatherData(city){
    try{
      const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`);
       if(!response.ok){
          throw new Error("Unable to fetch weather data");
      
       }

      const data=await response.json();
      const value=data.weather[0].icon;
      const icon_url=`https://openweathermap.org/img/wn/${value}@2x.png`
      icon.src = icon_url;
      console.log(data);
      updateWeatherUI(data) ;
     }catch(error){
          console.error(error);
     }
  
}

fetchWeatherData(city);
function updateWeatherUI(data){
    cityElement.innerHTML=data.name;
    temperature.innerHTML=`${(data.main.temp-273).toFixed(2)}℃`;
    windspeed.innerHTML=`Wind: ${data.wind.speed}m/s`;
    humidity.innerHTML=`Humidity:${data.main.humidity}%`;
    pressure.innerHTML=`Pressure:${data.main.pressure} atm`;
    description.innerHTML=data.weather[0].description;
    let icon=data.weather[0].icon;
    icon.src=`https://openweathermap.org/img/wn/${icon}@2x.png`
    const currentDate = new Date();
    date.innerHTML=currentDate.toDateString();

}

const formElement=document.querySelector("#searchBar");
const inputElement= document.querySelector("#form");

formElement.addEventListener("submit", function(e){
    e.preventDefault();

    const city=inputElement.value;
    if(city!==""){
        fetchWeatherData(city);
        inputElement.value="";
    }
});
