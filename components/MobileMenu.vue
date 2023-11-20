<template>
  <div
    v-if="showMobileMenu"
    class="mobile-menu pt-5 h-screen-minus-header overflow-y-scroll"
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
        <li>
          <NuxtLink @click="emitCloseMenu" to="/favorites" v-if="user"
            ><Icon name="fluent:star-24-regular" class="icon-style mr-1" /> Your
            Favorites</NuxtLink
          >
        </li>
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
  @apply bg-slate-100 dark:bg-midnight-200 font-bold;
}
</style>
