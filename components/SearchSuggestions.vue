<template>
  <div v-if="!searchSuggestionsDismissed" class="mt-1">
    <div class="justify-between items-center mb-2">
      <p class="text-base italic">
        <b>Tip:</b> Try a recipe name, ingredients, cuisine, or say surprise
        me... <span class="md:hidden"><br /></span>
        <button
          @click="dismissSearchSuggestions"
          class="inline-block font-bold text-brand-500 mt-1 md:mt-0"
        >
          Dismiss
        </button>
      </p>
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
