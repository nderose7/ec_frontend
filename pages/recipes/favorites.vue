<template>
  <div class="container mx-auto mt-10">
    <h1 class="font-bold my-4">Your Favorite Recipes</h1>
    <form
      @submit.prevent="fetchRecipes"
      class="search-bar form-control mt-5 flex mb-2 relative"
    >
      <Icon
        name="bx:search"
        class="absolute top-[15px] left-3"
        size="1.5rem"
        :class="{ 'text-brand-500': isInputFocused }"
      />
      <input
        type="text"
        placeholder="Recipe, ingredients, or cuisine..."
        class="rounded-lg force-padding-left"
        v-model="ingredientInput"
        @focus="isInputFocused = true"
        @blur="isInputFocused = false"
      />
    </form>
    <div v-if="favoriteRecipes.length === 0" class="text-center my-20">
      <p>You have no favorite recipes yet.</p>
    </div>
    <div v-else>
      <div
        v-for="recipe in favoriteRecipes"
        :key="recipe.id"
        class="mb-6 p-4 card"
      >
        <nuxt-link
          :to="`/recipes/${recipe.uid}`"
          class="text-brand-500 hover:underline"
          ><h2 class="mb-2">{{ recipe.recipe_name }}</h2></nuxt-link
        >
        <div class="flex gap-5 text-base mb-4">
          <p><b>Course:</b> {{ recipe.course }}</p>
          <p><b>Cuisine:</b> {{ recipe.cuisine }}</p>
        </div>
        <div class="flex gap-5 text-base mb-4">
          <p>
            <Icon name="bx:time" class="icon-style" />
            {{ recipe.total_time }}
          </p>

          <p>
            <Icon name="material-symbols:bar-chart" class="icon-style" />
            {{ recipe.calories }}
          </p>
        </div>
        <p>{{ recipe.paragraph_description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { truncateString } from "~/utils/truncateString.js";
const { find } = useStrapi();
const user = useStrapiUser();
const favoriteRecipes = ref([]);

const fetchFavoriteRecipes = async () => {
  if (!user.value) {
    // User is not logged in
    return;
  }

  try {
    // Fetch the userdata that includes favorite recipes
    const response = await find("userdatas", {
      populate: ["recipes"],
      filters: {
        owner: user.value.id,
      },
    });

    if (response.data && response.data.length > 0) {
      // Flatten and store the favorite recipes
      favoriteRecipes.value = response.data[0].attributes.recipes.data.map(
        (fav) => {
          return {
            id: fav.id, // The ID of the recipe, if needed
            recipe_name: fav.attributes.recipe_name,
            paragraph_description: fav.attributes.paragraph_description,
            uid: fav.attributes.uid, // Assuming uid is the unique identifier used in URL slugs
            total_time: fav.attributes.total_time,
            calories: fav.attributes.calories,
            cuisine: fav.attributes.cuisine,
            course: fav.attributes.course,
          };
        }
      );
    }
  } catch (error) {
    console.error("Failed to fetch favorite recipes:", error);
  }
};

// Fetch favorite recipes on mount
onMounted(fetchFavoriteRecipes);

// Optionally, re-fetch favorites when user state changes (e.g., after login/logout)
watch(user, fetchFavoriteRecipes, { immediate: true });
</script>

<style scoped>
/* Add any additional styles you need here */
</style>

<style scoped>
.force-padding-left {
  padding-left: 42px !important;
}
</style>
