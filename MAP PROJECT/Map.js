const projectMap = {
	coordinates: [],
	businesses: [],
	map: {},
	markers: {},
	buildMap() {
		this.map = L.map('map', {
		center: this.coordinates,
		zoom: 11,
		});
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		minZoom: '15',
		}).addTo(this.map)
		const marker = L.marker(this.coordinates)
		marker
		.addTo(this.map)
		.bindPopup('<p1><b>Current Location</b><br></p1>')
		.openPopup()
	},
}
async function getCoords(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}
async function getFoursquare(business) {
	const options = {
		method: 'GET',
		headers: {
		  Accept: 'application/json',
		  Authorization: 'fsq3GfLjfu97/4L4PL/Xti/VY+a1tK1lhjz/6fvcdTcRk88='
		}
	  };
	  
	  fetch('https://api.foursquare.com/v3/places/nearby?ll=%2736.7328%2C%20-76.5790%27&query=food&limit=5', options)
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));
	let limit = 5
	let lat = projectMap.coordinates[0]
	let lon = projectMap.coordinates[1]
	let response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
	let data = await response.text()
	let parsedData = JSON.parse(data)
	let businesses = parsedData.results
	return businesses
}
function processBusinesses(data) {
	let businesses = data.map((element) => {
		let location = {
			name: element.name,
			lat: element.geocodes.main.latitude,
			long: element.geocodes.main.longitude
		};
		return location
	})
	return businesses
}
window.onload = async () => {
	const coords = await getCoords()
	console.log(coords)
	projectMap.coordinates = coords
	projectMap.buildMap()
}
document.getElementById('submit').addEventListener('click', async (event) => {
	event.preventDefault()
	let business = document.getElementById('business').value
	console.log(business)})


	const options = {
		method: 'GET',
		headers: {
		  Accept: 'application/json',
		  Authorization: 'fsq3GfLjfu97/4L4PL/Xti/VY+a1tK1lhjz/6fvcdTcRk88='
		}
	  };
	  
	  fetch('https://api.foursquare.com/v3/places/nearby?ll=%2736.7328%2C%20-76.5790%27&query=food&limit=5', options)
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));