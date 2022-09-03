`use strick`;

const divBody = document.getElementById("body");
const selectTag = document.querySelector("#car");
const lblDistanceValue = document.getElementById("distance");
const lblYearValue = document.getElementById("year");
const lblConsumptionValue = document.getElementById("consumation");
const lblInjectorFailValue = document.getElementById("injectorFail");
const lblVinValue = document.getElementById("VIN");

const url = "./json/basaCars.json";

let basaCars;

async function fetchJson() {
  try {
    const res = await axios.get(`${url}`);
    const data = res.data;
    basaCars = data.data;
    build();
  } catch (error) {
    console.log(error);
  }
}

selectTag.addEventListener("change", () => {
  basaCars.map((item, index) => {
    if (selectTag.value === `${index}`) {
      changeValueLbl(item);
    }
  });
});

const changeValueLBL = (item) => {
  lblYearValue.textContent = "year: " + item.year;
  lblDistanceValue.textContent = `distance: ${item.distance} km`;
  lblConsumptionValue.textContent = `consumation: ${calculateDissselUsageForDistance(
    item.distance,
    item.consumption
  )} liters fuel for ${item.distance} km`;
  lblInjectorFailValue.textContent = `injector fail: ${probabilityOfUnitInjectorFail()} %`;
  lblVinValue.innerText = "VIN: " + item.Vin;
  divBody.appendChild(lblVinValue);
};

const build = () => {
  basaCars.map((item, index) => {
    let option = document.createElement("option");
    option.innerText = item.title;
    option.value = index;
    if (index === 0) {
      changeValueLBL(item);
    }
    selectTag.appendChild(option);
  });
};

const calculateDissselUsageForDistance = (distance, consumption) => {
  return (distance * consumption) / 100;
};

function probabilityOfUnitInjectorFail() {
  return Math.floor(Math.random() * 101);
}

fetchJson();
