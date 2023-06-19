const title = document.head.querySelector("title")
const currentCity = document.getElementById("current-city");
const subBtn = document.getElementById("btn");



subBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentCity.value !== "" && e.target === subBtn) {
        title.innerHTML = currentCity.value;
        currentCity.blur();
        weatherApi(currentCity.value);
    }else if (currentCity.value === "") {
        currentCity.setAttribute("placeholder", "enter a valid city")
    }
    setTimeout(() => {
        currentCity.value = "";
    }, 1000)
})

function weatherApi(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f3ca7b954b05ed953f2ad6ca0929c690`)
        .then(
            (result) => {
                return result.json()
            }
        ).then((data) => {
            console.log(data)
            if (data.cod !== 200) {
                currentCity.setAttribute("placeholder", "enter a valid city")
            } else {
                currentCity.removeAttribute("placeholder");

                let cityName = document.getElementById("name");
                cityName.innerHTML = `${data.name}-${countryListAlpha2[`${data.sys.country}`]}`;
    
                let currentDate = document.getElementById("date");
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const date = new Date();
                const utcDate = new Date();
                utcDate.setHours(date.getUTCHours() + (data.timezone / 3600));
                currentDate.innerHTML = `${weekDays[utcDate.getDay()]} ${utcDate.getDate()} ${months[utcDate.getMonth()]} ${utcDate.getFullYear()}`;
                
                let currentTime = document.getElementById("time");
                currentTime.innerHTML = `${formateTime(utcDate.getHours())}:${utcDate.getMinutes()}:${utcDate.getSeconds()} ${pmOrAm(utcDate.getHours())}`;
    
                let cityTemp = document.getElementById("temp");
                cityTemp.innerHTML = `${Math.round(data.main.temp) - 273 + "°C"}`;
    
                let cityHumidity = document.getElementById("humidity");
                cityHumidity.innerHTML = `Humidity : ${data.main.humidity + "%"}`;
    
                let cityWindSpeed = document.getElementById("wind-speed");
                cityWindSpeed.innerHTML = `Speed : ${Math.round((data.wind.speed * 3.6)) + "Km/h"}`;
    
                let cityWindDeg = document.getElementById("wind-deg");
                cityWindDeg.innerHTML = `Degree : ${data.wind.deg + "°"}`;
    
                let cityDescription = document.getElementById("city-description");
                cityDescription.innerHTML = `${data.weather[0].main}`;
    
                let counter = 0;
                // set padding for all elements :
                for (let child of cityDescription.parentElement.children) {
                    child.style.display = "none"
                    setTimeout(()=>{
                        child.style.padding = "5px 10px";
                        child.style.display = "block";
                        child.classList.add("animated");
                    },++counter * 300)
                }
    
                const myPreview = document.querySelector(".preview-data");
                myPreview.style.backgroundColor = "rgba(255, 255, 255, 0.432)";
                myPreview.style.backgroundImage = `url(/images/${(data.weather[0].main).toLowerCase()}.jpg)`
            }
        })
}



function formateTime(hours) {
    if (hours > 12) {
        return hours % 12;
    } else {
        return hours;
    }
}

function pmOrAm(hours) {
    if (hours >= 12) {
        return "PM"
    } else {
        return "AM"
    }
}