<template>
  <div v-if="!searchSuggestionsDismissed" class="text-center">
    <div
      class="flex text-left gap-10 mx-auto bg-brand-500 p-3 px-5 rounded-lg justify-between items-center mb-2 mt-2"
    >
      <p class="text-base italic text-white">
        <b>Tip:</b> Try a recipe name, ingredients, cuisine, or say surprise
        me...
      </p>

      <div class="text-right">
        <button
          @click="dismissSearchSuggestions"
          class="bg-white px-6 py-3 inline-block rounded-lg text-lg font-bold text-brand-500"
        >
          Dismiss
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Reactive property for GDPR dismissed state
const searchSuggestionsDismissed = ref(true);

// Function to dismiss GDPR notice and set localStorage
function dismissSearchSuggestions() {
  searchSuggestionsDismissed.value = true;
  localStorage.setItem("ec_search_suggestions", "1");
}

// Check localStorage on mounted to see if GDPR has already been dismissed
onMounted(() => {
  searchSuggestionsDismissed.value =
    localStorage.getItem("ec_search_suggestions") === "1";
});
</script>
