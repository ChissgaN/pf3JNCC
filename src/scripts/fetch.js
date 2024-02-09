const apiKey = "afb616110eeb6f4b68d7bba79ad12fca"

function getWeatherLocations (lat, lon) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => data)
}

function getForecaLocations (lat, lon) {
  return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => data)
}

function getWeather (place) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => data)
}

function getForeca (place) {
  return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => data)
}

export {
  getWeather,
  getForeca,
  getWeatherLocations,
  getForecaLocations
}
