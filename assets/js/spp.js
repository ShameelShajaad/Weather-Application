console.log("js loaded!!");

let input = document.getElementById("search");
let city = document.getElementById("city");
let condition = document.getElementById("condition");
let date = document.getElementById("date");

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    fetch(
      "http://api.weatherapi.com/v1/current.json?key=df232fca05674ebfb0c95804251611&q=" +
        input.value +
        "&aqi=no"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        city.innerText = data.location.name;
        condition.innerText = data.current.condition.text;

        let localtime = data.location.localtime;
        let [datee, time] = localtime.split(" ");
        let [year, month, day] = datee.split("-");
        date.innerText = findDay(year, month, day)+", "+;
      });
  }
});

function findDay(y, m, d) {
  y = parseInt(y);
  m = parseInt(m);
  d = parseInt(d);

  let y0 = y - Math.floor((14 - m) / 12);
  let z = y0 + Math.floor(y0 / 4) - Math.floor(y0 / 100) + Math.floor(y0 / 400);
  let m0 = m + 12 * Math.floor((14 - m) / 12) - 2;
  let d0 = (d + z + Math.floor((31 * m0) / 12)) % 7;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[d0];
}