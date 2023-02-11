// export { checkActualTemp, checkActualHumidity, init }

// const actualTempSpan = document.querySelector("#actual-temp-value")
// const actualHumiditySpan = document.querySelector("#actual-humidity-span")

// const dataPath = "./data.json"
// const options = {
// 	method: "GET",
// 	headers: {
// 		"Content-Type": "application/json",
// 	},
// }

// function checkActualTemp() {
// 	fetch(dataPath, options)
// 		.then(res => res.json())
// 		.then(data => {
// 			actualTempSpan.textContent = `${data.temperature.actualTemp} °C`
// 		})
// 		.catch(err => {
// 			console.log(err)
// 		})
// }

// function checkActualHumidity() {
// 	fetch(dataPath, options)
// 		.then(res => res.json())
// 		.then(data => {
// 			actualHumiditySpan.textContent = `${data.humidity.actualHumidity} %`
// 		})
// 		.catch(err => {
// 			console.log(err)
// 		})
// }

// function init() {
// 	fetch(dataPath, options)
// 		.then(res => res.json())
// 		.then(data => {
// 			actualTempSpan.textContent = `${data.temperature.actualTemp} °C`
// 			actualHumiditySpan.textContent = `${data.humidity.actualHumidity} %`
// 		})
// 		.catch(err => {
// 			console.log(err)
// 		})
// }

export function check() {
	console.log(1)
}
