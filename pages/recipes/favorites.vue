<template>
  <div class="container mx-auto mt-10 xl:pr-96">
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
        <div class="lg:flex justify-between gap-10">
          <div v-if="recipe.image" class="lg:w-1/3">
            <img
              :src="`${strapiURL}${recipe.image}`"
              class="rounded-lg mb-6 lg:mb-0"
            />
          </div>
          <div class="lg:w-full">
            <nuxt-link
              :to="`/recipes/${recipe.uid}`"
              class="text-brand-500 hover:underline"
              ><h2 class="mb-2">{{ recipe.recipe_name }}</h2></nuxt-link
            >
            <div class="flex gap-5 text-base mb-4">
              <p><b>Course:</b> {{ recipe.course }}</p>
              <p><b>Cuisine:</b> {{ recipe.cuisine }}</p>
              <p
                v-if="
                  recipe.diet_type_if_set &&
                  recipe.diet_type_if_set != 'None' &&
                  recipe.diet_type_if_set != 'N/A' &&
                  recipe.diet_type_if_set != 'n/a'
                "
              >
                <b>Cuisine:</b> {{ recipe.recipe.diet_type_if_set }}
              </p>
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
    </div>
  </div>
</template>

<script setup>
import { truncateString } from "~/utils/truncateString.js";
const { find } = useStrapi();
const user = useStrapiUser();
const favoriteRecipes = ref([]);

const ingredientInput = ref("");
const isInputFocused = ref(false);

const {
  public: { strapiURL },
} = useRuntimeConfig();

const fetchFavoriteRecipes = async () => {
  if (!user.value) {
    return;
  }

  try {
    const response = await find("userfavorites", {
      filters: {
        user: user.value.id,
      },
      populate: {
        recipe: {
          populate: "image",
        },
      },
      sort: ["favoritedAt:desc"], // Sort by favorited time
    });

    if (response.data) {
      favoriteRecipes.value = response.data.map((fav) => {
        const recipe = fav.attributes.recipe.data.attributes;
        return {
          id: recipe.id,
          recipe_name: recipe.recipe_name,
          paragraph_description: recipe.paragraph_description,
          uid: recipe.uid,
          total_time: recipe.total_time,
          calories: recipe.calories,
          cuisine: recipe.cuisine,
          course: recipe.course,
          image: recipe.image?.data?.attributes?.url,
          favoritedAt: fav.attributes.favoritedAt, // Store the favorited time if needed
        };
      });
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
