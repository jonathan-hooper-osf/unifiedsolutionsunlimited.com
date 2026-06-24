// Function to update the clock
function updateClock() {
  const now = new Date();
  const est = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = days[est.getDay()];
  let hours = est.getHours();
  const minutes = est.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert to 12-hour format
  document.getElementById('clock').textContent = `${dayName} • ${hours}:${minutes} ${ampm} EST`;
}

// How long to wait between automatic hue drifts (ms)
const HUE_DRIFT_INTERVAL = 2000;
// How far around the color wheel to step each drift (degrees)
const HUE_DRIFT_STEP = 25;
// Fixed saturation/lightness keep every color harmonious and legible
const HUE_SATURATION = 60;
const HUE_LIGHTNESS = 55;

// Function to advance the background to the next hue and wash it in
function driftHue(state) {
  state.hue = (state.hue + HUE_DRIFT_STEP) % 360;
  document.body.style.backgroundColor = `hsl(${state.hue}, ${HUE_SATURATION}%, ${HUE_LIGHTNESS}%)`;
  // Lightness drives whether dark or light text reads best
  document.body.style.color = HUE_LIGHTNESS > 55 ? '#000000' : '#ffffff';
}

// Start the automatic background hue drift
function startColorDrift() {
  const state = { hue: Math.floor(Math.random() * 360) };
  // Wash in the first color immediately instead of waiting a full interval
  driftHue(state);
  setInterval(() => driftHue(state), HUE_DRIFT_INTERVAL);
}

// Initialize the scripts
function initializeSolutions() {
  updateClock();
  setInterval(updateClock, 1000);
  startColorDrift();
}

// Export the functions for testing or modular use
if (typeof module !== 'undefined') {
  module.exports = { updateClock, driftHue, startColorDrift, initializeSolutions };
}