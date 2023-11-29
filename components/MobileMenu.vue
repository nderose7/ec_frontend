<template>
  <div
    v-show="showMobileMenu"
    class="mobile-menu pt-5 pb-16 w-full h-screen-minus-header"
  >
    <div class="px-5">
      <SearchRecipes @closeMenu="emitCloseMenu" />
      <ul>
        <li>
          <NuxtLink @click="emitCloseMenu" to="/"
            ><Icon name="fluent:food-24-regular" class="icon-style mr-1" />
            Create Recipes</NuxtLink
          >
        </li>
        <li>
          <NuxtLink @click="emitCloseMenu" to="/recipes"
            ><Icon
              name="fluent:slide-multiple-search-24-regular"
              class="icon-style mr-1"
            />
            Browse Recipes</NuxtLink
          >
        </li>
        <li v-if="user">
          <NuxtLink @click="emitCloseMenu" to="/favorites"
            ><Icon name="fluent:star-24-regular" class="icon-style mr-1" /> Your
            Favorites</NuxtLink
          >
        </li>
        <div v-else class="flex gap-4 mt-5">
          <NuxtLink
            @click="emitCloseMenu"
            to="/sign-up"
            class="btn-primary btn-lg text-center font-bold block mt-1 mb-1 w-full"
            >Sign Up</NuxtLink
          >
          <NuxtLink
            @click="emitCloseMenu"
            to="/login"
            class="btn-primary btn-lg text-center font-bold block mt-1 mb-1 w-full"
            >Login</NuxtLink
          >
        </div>
      </ul>
    </div>
    <RecipesLoggedIn @closeMenu="emitCloseMenu" />
  </div>
</template>

<script setup>
const user = useStrapiUser();
const props = defineProps({
  showMobileMenu: Boolean,
});

const emit = defineEmits(["closeMenu"]);

const emitCloseMenu = () => {
  emit("closeMenu");
};
</script>

<style scoped>
.mobile-menu ul li a {
  @apply px-2 py-2 rounded-lg w-full block;
}
.mobile-menu ul li a.router-link-active {
  @apply bg-slate-100 dark:bg-midnight-600 font-bold text-brand-500;
}
</style>
