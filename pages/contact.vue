<template>
  <div class="min-h-screen container mx-auto px-5">
    <br />
    <button
      type="button"
      @click.prevent="$router.back()"
      class="mb-4 btn-white btn-sm"
    >
      &larr; Back
    </button>
    <h1 class="mb-2">Contact Us</h1>

    <h5>Support:</h5>
    <p>
      Email us at
      <a href="mailto:support@eatclassy.com" class="link"
        >support@eatclassy.com</a
      >
    </p>
  </div>
</template>

<style scoped>
h5 {
  @apply mt-4;
}
</style>

<script setup>
useHead({
  title: "Contact Us",
});
</script>
