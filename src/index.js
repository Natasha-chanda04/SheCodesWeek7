async function search(event) {
  event.preventDefault(); // Prevent the page from refreshing when you click "Search".

  let searchInputElement = document.querySelector("#search-input");
  let cityName = searchInputElement.value;

  //Using the SheCodes API URL and my API key to get weather data.
  const apiKey = "7a74043bab6tbb4ao2f67f8ace2cefa6";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;

  try {
    //Fetch the weather data from the API.
    let response = await fetch(apiUrl);

    //If the city is not found, show an error.
    if (!response.ok) {
      throw new Error("City not found. Please try again.");
    }

    let data = await response.json();

    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = data.city;

    //Update the temperature on the page.
    let temperatureElement = document.querySelector(
      ".current-temperature-value"
    );
    temperatureElement.innerHTML = Math.round(data.temperature.current);

    let detailsElement = document.querySelector(".current-details");
    detailsElement.innerHTML = `
      ${formatDate(new Date())}, ${data.condition.description} <br />
      Humidity: <strong>${data.temperature.humidity}%</strong>, 
      Wind: <strong>${Math.round(data.wind.speed)} km/h</strong>
    `;
  } catch (error) {
    //Show an alert if something goes wrong
    alert("Error: " + error.message);
  }
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// Update the current date on the page when it loads.
let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateELement.innerHTML = formatDate(currentDate);
