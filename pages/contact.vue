<template>
  <div class="pb-20">
    <br />
    <button
      type="button"
      @click.prevent="$router.back()"
      class="mb-4 btn-white btn-sm"
    >
      &larr; Back
    </button>
    <h1 class="mb-2">Contact Us</h1>

    <h5>Phone:</h5>
    <p>Call us at +1 (248) 891-9495</p>

    <h5>Support:</h5>
    <p>
      Email us at
      <a href="mailto:support@eatclassy.com">support@eatclassy.com</a>
    </p>
  </div>
</template>

<script setup>
useHead({
  title: "Contact Us",
});
</script>
