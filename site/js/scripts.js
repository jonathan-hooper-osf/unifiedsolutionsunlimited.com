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

// Function to generate a random RGB color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return { r, g, b, hex: `rgb(${r}, ${g}, ${b})` };
}

// Function to calculate a contrasting text color (black or white)
function getContrastColor(r, g, b) {
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

// Function to generate a different contrasting color
function getDifferentContrastColor(currentColor) {
  let newColor;
  do {
    newColor = getRandomColor();
  } while (newColor.hex === currentColor); // Ensure the new color is different
  return newColor.hex;
}

// Function to handle color toggle
function setupColorToggle() {
  const toggleButton = document.getElementById('color-toggle');
  toggleButton.addEventListener('click', () => {
    const bg = getRandomColor();
    const contrastText = getContrastColor(bg.r, bg.g, bg.b);
    document.body.style.backgroundColor = bg.hex;
    document.body.style.color = contrastText;
  });

  // Add hover effect to the circle
  toggleButton.addEventListener('mouseenter', () => {
    const currentBgColor = getComputedStyle(document.body).backgroundColor;
    const hoverColor = getDifferentContrastColor(currentBgColor);
    toggleButton.querySelector('circle').setAttribute('fill', hoverColor);
  });

  toggleButton.addEventListener('mouseleave', () => {
    toggleButton.querySelector('circle').setAttribute('fill', 'none');
  });
}

// Initialize the scripts
function initializeSolutions() {
  updateClock();
  setInterval(updateClock, 1000);
  setupColorToggle();
}

// Export the functions for testing or modular use
if (typeof module !== 'undefined') {
  module.exports = { updateClock, getRandomColor, getContrastColor, getDifferentContrastColor, setupColorToggle, initializeSolutions };
}