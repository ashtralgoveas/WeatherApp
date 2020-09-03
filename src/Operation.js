const form = document.querySelector(".top-layer form");
const input = document.querySelector(".top-layer input");
const message = document.querySelector(".top-layer .message");
const list = document.querySelector(".card .cities");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputValue = input.value;

  const listItems = list.querySelectorAll(".card .city");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter((el) => {
      let content = "";

      if (inputValue.includes(",")) {
        if (inputValue.split(",")[1].length > 2) {
          inputValue = inputValue.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inputValue.toLowerCase();
    });
    if (filteredArray.length > 0) {
      message.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } ...otherwise be more specific by providing the country code as well \u263a...!!`;
      form.reset();
      input.focus();
      return;
    }
  }
  const apiKey = "2ec7a7bc7ad2f615caaa67876a83fda7";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const { main, name, sys, weather } = data;
      const weathericon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

      const li = document.createElement("li");
      li.classList.add("city");
      const cardText = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>&deg;C</sup></div>
        <figure>
          <img class="city-icon" src="${weathericon}" alt="${
        weather[0]["description"]
      }">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = cardText;
      list.appendChild(li);
    })
    .catch(() => {
      message.textContent = "Please search for a valid location \u2639...!!";
    });

  message.textContent = "";
  form.reset();
  input.focus();
});
