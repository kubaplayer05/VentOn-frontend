const actualTempSpan = document.querySelector("#actual-temp-value")
const actualHumiditySpan = document.querySelector("#actual-humidity-span")
const dataPath = "http://127.0.0.1:3000/api"
window.addEventListener("DOMContentLoaded", init)
function checkActualTemp() {
	fetch(dataPath)
		.then(res => res.json())
		.then(data => {
			actualTempSpan.textContent = `${data.temperature.actualTemp} °C`
		})
		.catch(err => {
			console.log(err)
		})
}
function checkActualHumidity() {
	fetch(dataPath)
		.then(res => res.json())
		.then(data => {
			actualHumiditySpan.textContent = `${data.humidity.actualHumidity} %`
		})
		.catch(err => {
			console.log(err)
		})
}
function init() {
	fetch(dataPath)
		.then(res => res.json())
		.then(data => {
			console.log(data)
			actualTempSpan.textContent = `${data.temperature.actualTemp} °C`
			actualHumiditySpan.textContent = `${data.humidity.actualHumidity} %`
		})
		.catch(err => {
			console.log(err)
		})
}

//# sourceMappingURL=index.de5c0784.js.map
