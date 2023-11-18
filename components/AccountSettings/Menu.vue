<template>
  <div class="pb-8 xl:pl-48">
    <ul class="settings-links text-xl font-bold">
      <li class="mb-4">
        <NuxtLink to="/settings/profile" class="py-2">Profile</NuxtLink>
      </li>
      <li class="mb-4">
        <NuxtLink to="/settings/billing" class="py-2">Billing</NuxtLink>
      </li>
      <li class="mb-4">
        <NuxtLink to="/settings/account" class="py-2">Account</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.settings-links .router-link-active {
  font-weight: bold;
}
.settings-links li a,
.settings-links li {
  @apply inline-block;
}
.settings-links li a {
  @apply mr-8;
}
</style>
