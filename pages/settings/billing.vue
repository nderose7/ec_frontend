<template>
  <div class="min-h-screen container mx-auto">
    <AccountSettingsHeader />
    <AccountSettingsMenu />
    <div class="lg:flex xl:px-48">
      <AccountSettingsBilling />
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
  title: "Billing",
  meta: [{ name: "robots", content: "noindex" }],
});
</script>
