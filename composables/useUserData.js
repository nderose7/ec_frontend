// This is a reactive reference to the user data.
export const userData = ref(null);

// A method to decrement credits, which can be called from any component.
export function decrementCredits() {
  if (userData.value && userData.value.data[0].attributes.freeCreditsLeft > 0) {
    userData.value.data[0].attributes.freeCreditsLeft -= 1;
    // You would also need to trigger an API call to update this in the backend if required.
  }
}

// A computed property to provide the current number of free credits left.
export const freeCreditsLeft = computed(() => {
  return userData.value?.data[0].attributes.freeCreditsLeft || 0;
});
