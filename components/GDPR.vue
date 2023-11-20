<template>
  <div v-if="!gdprDismissed" class="text-center sticky xl:bottom-6 bottom-0">
    <div
      class="flex text-left gap-10 max-w-[600px] mx-auto bg-brand-500 p-10 py-6 xl:rounded-lg justify-between items-center"
    >
      <div class="w-full">
        <p class="font-bold text-white">
          This website uses cookies to enhance the user experience.
        </p>
      </div>
      <div class="w-1/3 text-right">
        <button
          @click="dismissGDPR"
          class="bg-white px-6 py-3 inline-block rounded-lg text-xl font-bold text-brand-500"
        >
          Dismiss
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Reactive property for GDPR dismissed state
const gdprDismissed = ref(true);

// Function to dismiss GDPR notice and set localStorage
function dismissGDPR() {
  gdprDismissed.value = true;
  localStorage.setItem("ec_gdpr", "1");
}

// Check localStorage on mounted to see if GDPR has already been dismissed
onMounted(() => {
  gdprDismissed.value = localStorage.getItem("ec_gdpr") === "1";
});
</script>
