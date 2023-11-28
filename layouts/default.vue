<template>
  <div>
    <SiteHeader :showMobileMenu="showMobileMenu" @toggleMenu="toggleMenu" />
    <MobileMenu
      v-show="showMobileMenu"
      :showMobileMenu="showMobileMenu"
      @closeMenu="showMobileMenu = false"
      class="max-h-screen"
    />
    <div>
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
