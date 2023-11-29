<template>
  <div class="h-full">
    <SiteHeader :showMobileMenu="showMobileMenu" @toggleMenu="toggleMenu" />
    <MobileMenu
      v-show="showMobileMenu"
      :showMobileMenu="showMobileMenu"
      @closeMenu="showMobileMenu = false"
    />
    <div v-show="!showMobileMenu">
      <slot />
    </div>
  </div>
</template>

<script setup>
const showMobileMenu = ref(false);

const toggleMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};
</script>
