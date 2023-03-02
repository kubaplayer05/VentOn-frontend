import Chart from "chart.js/auto"
const socket = new WebSocket("ws://localhost:3000")

// Connection opened
socket.addEventListener("open", event => {
	console.log({ head: "connection", value: "true" })
})

// Listen for messages
socket.addEventListener("message", event => {
	try {
		let data = JSON.parse(event.data)
		console.log(data)

		if (data.to === "website") {
			switch (data.head) {
				case "power":
					TurnOn = data.value
					setBtn(TurnOn)
					break

				case "temp":
					updateTemp(data.value)
					break

				case "hum":
					updateHumidity(data.value)
					break
			}
		}
	} catch (err) {
		console.error(err)
	}
})

//

// variables
let TurnOn = false

const actualTempSpan = document.querySelector("#actual-temp-value")
const actualHumiditySpan = document.querySelector("#actual-humidity-span")
const tempDiagram = document.querySelector("#temp-canvas")
const humidityDiagram = document.querySelector("#humidity-canvas")
const powerSvg = document.querySelector(".power-svg")
const powerBtn = document.querySelector("#power-btn")
const minimalHumBtn = document.querySelector("#accept-humidity-level")
const minimalHumInput = document.querySelector("#minimal-level")

const everydayStart = document.querySelector("#everyday-start")
const everydayEnd = document.querySelector("#everyday-end")
const everydayBtn = document.querySelector("#accept-everyday")

const customdays = document.querySelectorAll(".day")
const customStart = document.querySelector("#custom-start")
const customEnd = document.querySelector("#custom-end")
const customBtn = document.querySelector("#accept-custom")

// fetch settings

const dataPath = "http://127.0.0.1:3000/api"
const getOptions = {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
	},
	mode: "no-cors",
}

// Chart settings

Chart.defaults.color = "#fff"

// listeners

window.addEventListener("DOMContentLoaded", init)

powerSvg.addEventListener("click", () => {
	switchPower()
	if (TurnOn) {
		powerBtn.classList.add("active")
		powerBtn.classList.remove("warning")
	}
})

minimalHumBtn.addEventListener("click", () => {
	let value = minimalHumInput.value
	if (value >= 0 && value <= 100) {
		socket.send(`{
			"head": "minHum",
			"value": ${value},
			"from": "website"
		}`)
	}
})

everydayBtn.addEventListener("click", () => {
	let start = everydayStart.value
	let end = everydayEnd.value

	console.log(start, end)

	fetch(`${dataPath}/status/everyday/${start}/${end}`, {
		method: "GET",
		headers: {
			"Content-Type": "text/plain",
		},
		mode: "no-cors",
		"Access-Control-Allow-Origin": "*",
		Host: "127.0.0.1:3000",
		Connection: "keep-alive",
	})

	console.log("send")
})

customBtn.addEventListener("click", () => {
	let start = customStart.value
	let end = customEnd.value
	let days = document.querySelectorAll(".selected-day")

	days.forEach(day => {
		let attr = day.attributes[0].value
		let dayId = day.attributes[1].value

		fetch(`${dataPath}/status/custom/${attr}/${start}/${end}`, {
			method: "GET",
			headers: {
				"Content-Type": "text/plain",
			},
			mode: "no-cors",
			"Access-Control-Allow-Origin": "*",
			Host: "127.0.0.1:3000",
			Connection: "keep-alive",
		})
	})
})

customdays.forEach(day => {
	day.addEventListener("click", () => {
		day.classList.toggle("selected-day")
	})
})

// arrow functions

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

const setBtn = value => {
	if (value) {
		powerBtn.classList.add("active")
		powerBtn.classList.remove("warning")
	} else {
		powerBtn.classList.remove("active")
		powerBtn.classList.add("warning")
	}
}

// async functions

function init() {
	fetch("./data.json")
		.then(res => {
			return res.json()
		})
		.then(data => {
			console.log(data)

			let temps = data.temperatures.daily
			let hums = data.humidities.daily

			// creating charts
			createChart(
				tempDiagram,
				{
					labels: temps.map(temp => temp.time),
					datasets: [
						{
							label: "Temperature",
							data: temps.map(temp => temp.value),
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
					labels: hums.map(hum => hum.time),
					datasets: [
						{
							label: "Humidity",
							data: hums.map(hum => hum.value),
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

async function updateTemp(value) {
	actualTempSpan.textContent = `${value} °C`
}

async function updateHumidity(value) {
	actualHumiditySpan.textContent = `${value} %`
}

// functions

function switchPower() {
	TurnOn = !TurnOn
	socket.send(`{
		"head": "power",
		"value": "${TurnOn}",
		"from": "website"
	}`)
}

init()
