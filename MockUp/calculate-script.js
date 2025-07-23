let costPerKm = 2.0
let calculatedCost = 0

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  loadCostPerKm()
  updateCostDisplay()
})

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

// Show calculate tab
function showCalculateTab() {
  document.querySelector(".tab-btn.active").classList.remove("active")
  document.querySelector(".tab-content.active").classList.remove("active")

  event.target.classList.add("active")
  document.getElementById("calculateTab").classList.add("active")
}

// Show manual tab
function showManualTab() {
  document.querySelector(".tab-btn.active").classList.remove("active")
  document.querySelector(".tab-content.active").classList.remove("active")

  event.target.classList.add("active")
  document.getElementById("manualTab").classList.add("active")

  // Pre-fill with current cost
  document.getElementById("manualCost").value = costPerKm.toFixed(2)
}

// Handle calculate form submission
document.getElementById("calculateForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const fillUpCost = Number.parseFloat(document.getElementById("fillUpCost").value)
  const distanceBefore = Number.parseFloat(document.getElementById("distanceBefore").value)
  const distanceAfter = Number.parseFloat(document.getElementById("distanceAfter").value)

  // Calculate distance traveled
  const distanceTraveled = distanceAfter - distanceBefore

  if (distanceTraveled <= 0) {
    alert("Distance after fill up must be greater than distance before fill up.")
    return
  }

  // Calculate cost per km
  calculatedCost = fillUpCost / distanceTraveled

  // Show result
  document.getElementById("calculatedCost").textContent = `R${calculatedCost.toFixed(2)}`
  document.getElementById("calculationResult").style.display = "block"
})

// Apply calculated cost
function applyCost() {
  costPerKm = calculatedCost
  saveCostPerKm()
  updateCostDisplay()

  alert("Cost per km has been updated successfully!")

  // Reset form and hide result
  document.getElementById("calculateForm").reset()
  document.getElementById("calculationResult").style.display = "none"
}

// Handle manual form submission
document.getElementById("manualForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const manualCost = Number.parseFloat(document.getElementById("manualCost").value)

  if (manualCost <= 0) {
    alert("Please enter a valid cost per km.")
    return
  }

  costPerKm = manualCost
  saveCostPerKm()
  updateCostDisplay()

  alert("Cost per km has been updated successfully!")
})
