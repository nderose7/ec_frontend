<template>
  <div class="min-h-screen container mx-auto">
    <AccountSettingsHeader />
    <AccountSettingsMenu />
    <div class="lg:flex xl:px-48">
      <AccountSettingsAccount />
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});
useHead({
  title: "Account",
});
</script>
