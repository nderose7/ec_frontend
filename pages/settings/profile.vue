<template>
  <div class="min-h-screen container mx-auto">
    <AccountSettingsHeader />
    <AccountSettingsMenu />
    <div class="xl:px-48">
      <AccountSettingsProfile />
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
  title: "Profile",
});
</script>
