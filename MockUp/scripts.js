// Trip data storage
let trips = [
  {
    id: 1,
    name: "Work Commute",
    distance: 25,
    frequency: 22,
    costPerKm: 2.0,
  },
  {
    id: 2,
    name: "Weekend Shopping",
    distance: 15,
    frequency: 8,
    costPerKm: 2.0,
  },
  {
    id: 3,
    name: "Visit Family",
    distance: 45,
    frequency: 4,
    costPerKm: 2.0,
  },
]

let currentEditingId = null
let costPerKm = 2.0

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing app...")
  loadCostPerKm()
  renderTrips()
  updateCostDisplay()
  setupEventListeners()
})

// Setup event listeners
function setupEventListeners() {
  // Add trip form submission
  const tripForm = document.getElementById("tripForm")
  if (tripForm) {
    tripForm.addEventListener("submit", handleTripFormSubmit)
  }

  // Modal close when clicking outside
  const tripModal = document.getElementById("tripModal")
  if (tripModal) {
    tripModal.addEventListener("click", function (e) {
      if (e.target === this) {
        closeTripModal()
      }
    })
  }

  // Add trip button
  const addTripBtn = document.querySelector(".add-trip-btn")
  if (addTripBtn) {
    addTripBtn.addEventListener("click", openAddTripModal)
  }
}

// Load cost per km from localStorage
function loadCostPerKm() {
  const savedCost = localStorage.getItem("costPerKm")
  if (savedCost) {
    costPerKm = Number.parseFloat(savedCost)
  }
}

// Save cost per km to localStorage
function saveCostPerKm() {
  localStorage.setItem("costPerKm", costPerKm.toString())
}

// Update cost display in sidebar
function updateCostDisplay() {
  const costDisplay = document.getElementById("costPerKm")
  if (costDisplay) {
    costDisplay.textContent = `R${costPerKm.toFixed(2)}`
  }
}

// Render all trips
function renderTrips() {
  const tripsGrid = document.getElementById("tripsGrid")
  if (!tripsGrid) {
    console.error("Trips grid not found!")
    return
  }

  tripsGrid.innerHTML = ""

  trips.forEach((trip) => {
    const tripCard = createTripCard(trip)
    tripsGrid.appendChild(tripCard)
  })

  console.log(`Rendered ${trips.length} trips`)
}

// Create a trip card element
function createTripCard(trip) {
  const monthlyCost = (trip.distance * trip.frequency * costPerKm).toFixed(2)

  const card = document.createElement("div")
  card.className = "trip-card"
  card.innerHTML = `
        <div class="trip-header">
            <div>
                <div class="trip-name">${trip.name}</div>
            </div>
            <div class="trip-actions">
                <button class="action-btn edit-btn" data-trip-id="${trip.id}" title="Edit Trip">
                    ✏️
                </button>
                <button class="action-btn delete-btn" data-trip-id="${trip.id}" title="Delete Trip">
                    🗑️
                </button>
            </div>
        </div>
        <div class="trip-stats">
            <div class="stat-item">
                <span class="stat-label">Distance</span>
                <span class="stat-value">${trip.distance} km</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Frequency</span>
                <span class="stat-value">${trip.frequency} trips/month</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Monthly Cost</span>
                <span class="stat-value monthly-cost">R${monthlyCost}</span>
            </div>
        </div>
    `

  // Add event listeners to the buttons
  const editBtn = card.querySelector(".edit-btn")
  const deleteBtn = card.querySelector(".delete-btn")

  editBtn.addEventListener("click", () => editTrip(trip.id))
  deleteBtn.addEventListener("click", () => deleteTrip(trip.id))

  return card
}

// Open add trip modal
function openAddTripModal() {
  console.log("Opening add trip modal...")
  currentEditingId = null

  const modalTitle = document.getElementById("modalTitle")
  const tripForm = document.getElementById("tripForm")
  const tripModal = document.getElementById("tripModal")

  if (modalTitle) modalTitle.textContent = "Add New Trip"
  if (tripForm) tripForm.reset()
  if (tripModal) tripModal.classList.add("active")

  // Focus on the first input
  setTimeout(() => {
    const tripNameInput = document.getElementById("tripName")
    if (tripNameInput) tripNameInput.focus()
  }, 100)
}

// Open edit trip modal
function editTrip(id) {
  console.log("Editing trip:", id)
  const trip = trips.find((t) => t.id === id)
  if (!trip) return

  currentEditingId = id

  const modalTitle = document.getElementById("modalTitle")
  const tripNameInput = document.getElementById("tripName")
  const distanceInput = document.getElementById("distance")
  const frequencyInput = document.getElementById("frequency")
  const tripModal = document.getElementById("tripModal")

  if (modalTitle) modalTitle.textContent = "Edit Trip"
  if (tripNameInput) tripNameInput.value = trip.name
  if (distanceInput) distanceInput.value = trip.distance
  if (frequencyInput) frequencyInput.value = trip.frequency
  if (tripModal) tripModal.classList.add("active")
}

// Close trip modal
function closeTripModal() {
  console.log("Closing trip modal...")
  const tripModal = document.getElementById("tripModal")
  if (tripModal) tripModal.classList.remove("active")
  currentEditingId = null
}

// Delete trip
function deleteTrip(id) {
  console.log("Deleting trip:", id)
  if (confirm("Are you sure you want to delete this trip?")) {
    const initialLength = trips.length
    trips = trips.filter((t) => t.id !== id)

    if (trips.length < initialLength) {
      renderTrips()
      console.log("Trip deleted successfully")
    }
  }
}

// Handle trip form submission
function handleTripFormSubmit(e) {
  e.preventDefault()
  console.log("Form submitted...")

  const tripNameInput = document.getElementById("tripName")
  const distanceInput = document.getElementById("distance")
  const frequencyInput = document.getElementById("frequency")

  if (!tripNameInput || !distanceInput || !frequencyInput) {
    alert("Form inputs not found!")
    return
  }

  const name = tripNameInput.value.trim()
  const distance = Number.parseFloat(distanceInput.value)
  const frequency = Number.parseInt(frequencyInput.value)

  // Validate inputs
  if (!name || distance <= 0 || frequency <= 0) {
    alert("Please fill in all fields with valid values.")
    return
  }

  if (currentEditingId) {
    // Edit existing trip
    const tripIndex = trips.findIndex((t) => t.id === currentEditingId)
    if (tripIndex !== -1) {
      trips[tripIndex] = {
        ...trips[tripIndex],
        name,
        distance,
        frequency,
      }
      console.log("Trip updated:", trips[tripIndex])
    }
  } else {
    // Add new trip
    const newTrip = {
      id: Date.now(),
      name,
      distance,
      frequency,
      costPerKm,
    }
    trips.push(newTrip)
    console.log("New trip added:", newTrip)
  }

  renderTrips()
  closeTripModal()
}

// Make functions globally available for debugging
window.openAddTripModal = openAddTripModal
window.closeTripModal = closeTripModal
window.editTrip = editTrip
window.deleteTrip = deleteTrip
