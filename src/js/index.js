import Chart from "chart.js/auto"

const actualTempSpan = document.querySelector("#actual-temp-value")
const actualHumiditySpan = document.querySelector("#actual-humidity-span")
const tempDiagram = document.querySelector("#temp-canvas")
const humidityDiagram = document.querySelector("#humidity-canvas")

// fetch settings

const dataPath = "./data.json"
const options = {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
	},
}

// Chart settings

Chart.defaults.color = "#fff"

// listeners

window.addEventListener("DOMContentLoaded", init)

// functions

const createChart = async (target, data, valueType) => {
	const config = {
		type: "line",
		data: data,
		options: {
			layout: {},
			responsive: true,
			plugins: {
				legend: {
					display: false,
				},
			},
			scales: {
				x: {
					display: true,
					title: {
						display: true,
						text: "Time",
					},
				},
				y: {
					display: true,
					title: {
						display: true,
						text: valueType,
					},
				},
			},
		},
	}

	new Chart(target, config)
}

async function init() {
	fetch(dataPath, options)
		.then(res => res.json())
		.then(data => {
			let previousTemps = data.temperature.previousTemps
			let previousHumidities = data.humidity.previousHumidities

			// upload data
			actualTempSpan.textContent = `${data.temperature.actualTemp} °C`
			actualHumiditySpan.textContent = `${data.humidity.actualHumidity} %`

			// creating charts
			createChart(
				tempDiagram,
				{
					labels: previousTemps.map(temp => temp.time),
					datasets: [
						{
							label: "Temperature",
							data: previousTemps.map(temp => temp.value),
							borderColor: "#e63946",
							backgroundColor: "#d52835",
						},
					],
				},
				"Temperature [°C]"
			)

			createChart(
				humidityDiagram,
				{
					labels: previousHumidities.map(hum => hum.time),
					datasets: [
						{
							label: "Humidity",
							data: previousHumidities.map(hum => hum.value),
						},
					],
				},
				"Humidity [%]"
			)
		})
		.catch(err => {
			console.log(err)
		})
}

async function checkActualTemp() {
	fetch(dataPath, options)
		.then(res => res.json())
		.then(data => {
			actualTempSpan.textContent = `${data.temperature.actualTemp} °C`
		})
		.catch(err => {
			console.log(err)
		})
}

async function checkActualHumidity() {
	fetch(dataPath, options)
		.then(res => res.json())
		.then(data => {
			actualHumiditySpan.textContent = `${data.humidity.actualHumidity} %`
		})
		.catch(err => {
			console.log(err)
		})
}
