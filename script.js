const API_URL = "https://api.getgeoapi.com/v2/currency";
const API_KEY = "86312263fcda4c06d5a02d90232b0b02adcd8a98";

const inputAmount = document.querySelector(".input_amount");
const selectFrom = document.querySelector(".select_from");
const selectTo = document.querySelector(".select_to");
const btnChange = document.querySelector(".btn_change");
const btnConvert = document.querySelector(".btn_convert");
const divResult = document.querySelector(".result");

document.addEventListener("DOMContentLoaded", getOptions);

btnChange.addEventListener("click", changeCurrency);

btnConvert.addEventListener("click", getExchangeRate);

async function getOptions(){
  try {
    const response = await fetch(`${API_URL}/list?api_key=${API_KEY}`);

    if (response.ok) {
      const data = await response.json();
      // Ordena por orden alfábetico
      const currencyKeys = Object.keys(data.currencies).sort();

      // Añade los valores como options a los select
      currencyKeys.forEach((key) => {
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

// Función para intercambiar los valores de los select
function changeCurrency(){
  const selectedFrom = selectFrom.value;
  const selectedTo = selectTo.value;

  selectFrom.value = selectedTo;
  selectTo.value = selectedFrom;
}

// Función para calcular la equivalencia de las monedas
async function getExchangeRate(){
  const amountValue = inputAmount.value;
  const fromValue = selectFrom.value;
  const toValue = selectTo.value;
  divResult.innerHTML = "";

  try {
    const response = await fetch(`${API_URL}/convert?api_key=${API_KEY}&from=${fromValue}&to=${toValue}&amount=${amountValue}`);

    if (response.ok) {
      const data = await response.json();
      const amountFrom = Number(data.amount).toFixed(2);
      const currencyCodeFrom = data.base_currency_code;
      const amountTo = Number(data.rates[toValue].rate_for_amount).toFixed(2);
      const currencyCodeTo = Object.keys(data.rates)[0];

      const newResult = document.createElement("span");
      newResult.textContent = `${amountFrom} ${currencyCodeFrom} = ${amountTo} ${currencyCodeTo}`;
      divResult.appendChild(newResult);
    } else {
      console.log("Respuesta de red OK pero respuesta HTTP no OK");
    }
  } catch (error) {
    console.log("Hubo un problema con la petición Fetch:" + error.message);
  }
}