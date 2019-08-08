let appendLocationsArrayToHtml = (locations) => {
  let locationList = document.getElementById('locations')

  locations.forEach(location => {
    locationList.innerHTML += `<li>${location.city}, ${location.country}</li>`
  })
}

let addErrorToPage = (error) =>{
  document.getElementById('error').innerHTML += error.message
}

let fetchLocations = () => {
  // debugger
  fetch("/api/v1/locations")
  .then((response) => {
    if (response.ok) {
      return response 
    } else {
      throw(new Error("YOU DONE GOOFED SOMEHOW"))
    }
  })
  .then(response => response.json())
  .then((locationsBody) => {
    appendLocationsArrayToHtml(locationsBody.locations)
  }) 
}

let postLocation = (event) => {
  event.preventDefault()

  let cityInputField = document.getElementById('city')
  let countryInputField = document.getElementById('country')

  let newLocation = {
    location: {
      city: cityInputField.value,
      country: countryInputField.value
    }
  }
  
  fetch("/api/v1/locations", {
      method: "POST",
      body: JSON.stringify(newLocation)
    })
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        throw (new Error("YOU DONE GOOFED SOMEHOW"))
      }
    })
    .then(response => response.json())
    .then((newLocationBody) => {
      appendLocationsArrayToHtml([newLocationBody.location])
    })
    .catch((error) => {
      addErrorToPage(error)
    })
}

fetchLocations()

document
  .getElementById('new-location-submit-button')
  .addEventListener('click', postLocation)