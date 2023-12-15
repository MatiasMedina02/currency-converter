const API_URL = "https://api.getgeoapi.com/v2/currency";
const API_KEY = "86312263fcda4c06d5a02d90232b0b02adcd8a98";

const inputAmount = document.querySelector(".input_amount");
const selectFrom = document.querySelector(".select_from");
const selectTo = document.querySelector(".select_to");
const btnConvert = document.querySelector(".btn_convert");

document.addEventListener("DOMContentLoaded", getOptions);

btnConvert.addEventListener("click", getExchangeRate);

async function getOptions(){
  try {
    const response = await fetch(`${API_URL}/list?api_key=${API_KEY}`);

    if (response.ok) {
      const data = await response.json();
      Object.entries(data.currencies).forEach(([key, value]) => {
        const currencyFrom = document.createElement("option");
        currencyFrom.value = key;
        currencyFrom.text = key;
        selectFrom.appendChild(currencyFrom);

        const currencyTo = document.createElement("option");
        currencyTo.value = key;
        currencyTo.text = key;
        selectTo.appendChild(currencyTo);
      });
    } else {
      console.log("Respuesta de red OK pero respuesta HTTP no OK");
    }
  } catch (error) {
    console.log("Hubo un problema con la petición Fetch:" + error.message);
  }
}

async function getExchangeRate(){
  const amountValue = inputAmount.value;
  const fromValue = selectFrom.value;
  const toValue = selectTo.value;

  try {
    const response = await fetch(`${API_URL}/convert?api_key=${API_KEY}&from=${fromValue}&to=${toValue}&amount=${amountValue}`);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.log("Respuesta de red OK pero respuesta HTTP no OK");
    }
  } catch (error) {
    console.log("Hubo un problema con la petición Fetch:" + error.message);
  }
}