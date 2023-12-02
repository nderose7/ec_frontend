<template>
  <div class="dark:bg-midnight-800">
    <div class="logo absolute pl-5 pt-2 text-2xl">
      <Logo />
    </div>
    <div class="flex min-h-screen items-center text-center">
      <div class="mx-auto">
        <Icon name="game-icons:buoy" class="text-brand-500" size="5rem" />
        <h1 class="mb-2 mt-5 text-5xl">{{ error.statusCode }} Error</h1>
        <p>{{ error.statusMessage }}</p>

        <NuxtLink to="/" class="btn-primary mt-6 inline-block px-5 py-3"
          ><Icon name="ion:arrow-back-circle-outline" class="icon-style" /> Back
          to Homepage</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useStrapiUser();
const props = defineProps({
  error: Object,
});
</script>
