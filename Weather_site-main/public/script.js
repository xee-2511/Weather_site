const DEFAULT_CITY = "Delhi";

// Fetch Weather
async function getWeather(city) {
  try {
    const response = await fetch(`/api/weather?city=${city}`);  //  fixed
    
    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message || "City not found");
      return;
    }

    const data = await response.json();

    document.getElementById("locationName").textContent = data.name || city;
    document.getElementById("temp").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("realFeel").textContent = `RealFeel: ${Math.round(data.main.feels_like)}°C`;

    const iconEl = document.getElementById("weatherIcon");
    iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;  //  https
    iconEl.alt = data.weather[0].description;
    iconEl.style.display = "block";

  } catch (error) {
    console.error("Error fetching weather:", error);
    alert("Unable to fetch weather data");
  }
}

// Fetch News
async function getNews() {
    try {
        const res = await fetch(`/api/news`);  // fixed
        const data = await res.json();

        if (!data.articles) {
            console.warn("No news articles found");
            return;
        }

        const headlinesList = document.getElementById("headlines");
        headlinesList.innerHTML = "";

        data.articles.slice(0, 5).forEach(article => {
            const li = document.createElement("li");
            li.innerHTML = `
                <img src="${article.urlToImage || 'https://via.placeholder.com/80x60?text=No+Image'}" alt="news" class="news-img">
                <div class="news-content">
                    <span class="news-source">${article.source?.name || "Unknown"}</span>
                    <a href="${article.url}" target="_blank">${article.title}</a>
                </div>
            `;
            headlinesList.appendChild(li);
        });

    } catch (err) {
        console.error("News API Error:", err);
        alert("Unable to fetch news data");
    }
}

document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (city) {
    getWeather(city);
    getNews();
  } else {
    alert("Please enter a city");
  }
});

window.onload = () => {
    getWeather(DEFAULT_CITY);
    getNews();
};