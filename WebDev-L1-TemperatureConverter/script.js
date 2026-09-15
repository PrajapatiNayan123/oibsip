const form = document.getElementById("converterForm");
const input = document.getElementById("temperature");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const resultValue = document.getElementById("resultValue");
const resultUnit = document.getElementById("resultUnit");
const message = document.getElementById("message");
const clearBtn = document.getElementById("clearBtn");

const units = { C: "°C", F: "°F", K: "K" };

function toCelsius(value, unit) {
  if (unit === "C") return value;
  if (unit === "F") return (value - 32) * 5 / 9;
  return value - 273.15;
}

function fromCelsius(value, unit) {
  if (unit === "C") return value;
  if (unit === "F") return (value * 9 / 5) + 32;
  return value + 273.15;
}

function validate(value, unit) {
  if (!Number.isFinite(value)) return "Please enter a valid numeric temperature.";
  if (unit === "K" && value < 0) return "Kelvin cannot be below 0 K (absolute zero).";
  if (unit === "C" && value < -273.15) return "Celsius cannot be below -273.15 °C (absolute zero).";
  if (unit === "F" && value < -459.67) return "Fahrenheit cannot be below -459.67 °F (absolute zero).";
  return "";
}

function formatNumber(value) {
  return Number(value.toFixed(4)).toLocaleString(undefined, { maximumFractionDigits: 4 });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = Number(input.value);
  const error = validate(value, fromUnit.value);

  message.textContent = "";
  if (error) {
    resultValue.textContent = "—";
    resultUnit.textContent = "Conversion not available";
    message.textContent = error;
    return;
  }

  const celsius = toCelsius(value, fromUnit.value);
  const converted = fromCelsius(celsius, toUnit.value);
  resultValue.textContent = formatNumber(converted);
  resultUnit.textContent = `${units[toUnit.value]} • ${fromUnit.options[fromUnit.selectedIndex].text} → ${toUnit.options[toUnit.selectedIndex].text}`;
});

clearBtn.addEventListener("click", () => {
  input.value = "";
  message.textContent = "";
  resultValue.textContent = "—";
  resultUnit.textContent = "Select a value to begin";
  input.focus();
});
