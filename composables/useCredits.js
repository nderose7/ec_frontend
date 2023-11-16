// composables/useCredits.js
export const realCredits = ref('...');

function encodeCredits(value) {
  return btoa(value.toString());
}

function decodeCredits(encodedValue) {
  return atob(encodedValue);
}

// Function to encode and save the default credits if not present in localStorage
export function initializeCredits() {
  const savedCredits = localStorage.getItem('8589d68a7d2253bf');
  if (savedCredits) {
    // If found, decode it from Base64 and parse it to an integer
    realCredits.value = parseInt(decodeCredits(savedCredits), 10);
  } else {
    // If not found, encode and set the default credits value
    realCredits.value = 10; // Set default credits
    localStorage.setItem('8589d68a7d2253bf', encodeCredits(realCredits.value)); // Store encoded value
  }
}

export function decrementCredits() {
  if (process.client && realCredits.value > 0) {
    realCredits.value -= 1;
    localStorage.setItem('8589d68a7d2253bf', encodeCredits(realCredits.value));
    localStorage.setItem('ec_credits', realCredits.value.toString());
  }
}

// Expose the function to update credits for calling within onMounted
export function updateCreditsOnMounted() {
  onMounted(initializeCredits);
}
