<template>
  <div class="container mx-auto lg:mt-10 mt-4 xl:pr-96 px-5">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-bold mt-4 lg:my-4 text-3xl lg:text-4xl">
          Your Favorite Recipes
        </h1>
      </div>
      <div
        v-if="favoriteRecipes.length"
        class="pagination-controls text-center hidden lg:block"
      >
        <button
          class="btn-primary p-2 px-4 font-semibold"
          @click="previousPage"
          :disabled="currentPage <= 1"
        >
          <Icon name="mdi:arrow-left" class="icon-style" />
        </button>
        <span class="mx-4">Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          class="btn-primary p-2 px-4 font-semibold"
          @click="nextPage"
          :disabled="isLastPage"
        >
          <Icon name="mdi:arrow-right" class="icon-style" />
        </button>
      </div>
    </div>
    <form
      @submit.prevent="handleSearch"
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
        class="rounded-l-lg force-padding-left outline-0"
        v-model="ingredientInput"
        @focus="isInputFocused = true"
        @blur="isInputFocused = false"
      />
      <button
        type="submit"
        class="bg-brand-500 text-white mb-1 rounded-r-lg border-brand-500 border-r border-t border-b inline-block py-3"
      >
        <div class="px-4">
          <Icon
            name="mdi:arrow-right"
            class="icon-style text-white"
            size="1.5rem"
          />
        </div>
      </button>
    </form>
    <div v-if="loadingRecipes">
      <Icon name="svg-spinners:3-dots-bounce" size="3rem" class="ml-3 my-3" />
    </div>
    <div v-if="favoriteRecipes.length === 0" class="text-center my-20">
      <p>You have no favorite recipes yet.</p>
    </div>
    <div v-else>
      <div class="meta flex justify-between my-5">
        <div class="font-bold">
          Found {{ numberRecipesFound }} recipes
          <span v-if="isSearchActive && searchQueryValue !== ''"
            >for "{{ searchQueryValue }}"</span
          >
        </div>
        <div class="min-w-[110px] text-right">
          <button v-if="ingredientInput" @click="clearResults" class="link">
            Clear Results
          </button>
        </div>
      </div>
      <div
        v-for="recipe in favoriteRecipes"
        :key="recipe.id"
        class="mb-6 p-4 card"
      >
        <div class="lg:flex justify-between gap-10">
          <div v-if="recipe.image" class="lg:w-1/3">
            <img :src="`${recipe.image}`" class="rounded-lg mb-6 lg:mb-0" />
          </div>
          <div class="lg:w-full">
            <nuxt-link
              :to="`/recipes/${recipe.uid}`"
              class="text-brand-500 hover:underline"
              ><h2 class="mb-2">{{ recipe.recipe_name }}</h2></nuxt-link
            >
            <div class="lg:flex gap-5 text-base mb-4">
              <p><b>Course:</b> {{ recipe.course }}</p>
              <p><b>Cuisine:</b> {{ recipe.cuisine }}</p>
              <p
                v-if="
                  recipe.diet_type_if_set &&
                  recipe.diet_type_if_set != 'None' &&
                  recipe.diet_type_if_set != 'N/A' &&
                  recipe.diet_type_if_set != 'NA' &&
                  recipe.diet_type_if_set != 'Not Available' &&
                  recipe.diet_type_if_set != 'n/a'
                "
              >
                <b>Diet:</b> {{ recipe.diet_type_if_set }}
              </p>
            </div>
            <div class="lg:flex gap-5 text-base mb-4">
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
    <div
      v-if="favoriteRecipes.length"
      class="pagination-controls text-center mt-10"
    >
      <button
        class="btn-primary p-2 px-4 font-semibold"
        @click="previousPage"
        :disabled="currentPage <= 1"
      >
        <Icon name="mdi:arrow-left" class="icon-style" /> Prev
      </button>
      <span class="mx-4">Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        class="btn-primary p-2 px-4 font-semibold"
        @click="nextPage"
        :disabled="isLastPage"
      >
        Next <Icon name="mdi:arrow-right" class="icon-style" />
      </button>
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
const isSearchActive = ref(false);
const numberRecipesFound = ref(0);
const loadingRecipes = ref(false);

const currentPage = ref(1);
const pageSize = 10; // Adjust the page size as needed
const totalPages = ref(0);
const totalFavoriteRecipes = ref(0);
const searchQueryValue = ref("");

const {
  public: { strapiURL },
} = useRuntimeConfig();

const fetchFavoriteRecipes = async (
  page = currentPage.value,
  searchQuery = ingredientInput.value
) => {
  if (!user.value) {
    return;
  }

  searchQueryValue.value = searchQuery;

  let queryParams = {
    filters: { user: user.value.id },
    populate: { recipe: { populate: "image" } },
    sort: ["favoritedAt:desc"],
    pagination: { page, pageSize },
  };

  if (isSearchActive.value && searchQuery) {
    queryParams.filters.recipe = {
      $or: [
        { recipe_name: { $containsi: searchQuery } },
        { ingredients: { $containsi: searchQuery } },
        { cuisine: { $containsi: searchQuery } },
        { course: { $containsi: searchQuery } },
        { diet_type_if_set: { $containsi: searchQuery } },
        // Add other recipe fields to search in
      ],
    };
  }

  try {
    const response = await find("userfavorites", queryParams);

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

      totalFavoriteRecipes.value = response.meta.pagination.total;
      totalPages.value = Math.ceil(totalFavoriteRecipes.value / pageSize);

      // Update numberRecipesFound based on whether a search is active
      numberRecipesFound.value = isSearchActive.value
        ? recipesData.meta.pagination.total
        : totalRecipes.value;
    }
  } catch (error) {
    console.error("Failed to fetch favorite recipes:", error);
  }
};

// Fetch favorite recipes on mount
onMounted(() => {
  console.log("Fetching recipes...");
  fetchTotalRecipeCount();
  fetchFavoriteRecipes();
});

// Optionally, re-fetch favorites when user state changes (e.g., after login/logout)
watch(user, fetchFavoriteRecipes, { immediate: true });

const fetchTotalRecipeCount = async () => {
  try {
    const response = await find("userfavorites", {
      filters: {
        user: user.value.id,
      },
    });
    if (response && response.meta) {
      numberRecipesFound.value = response.meta.pagination.total;
    }
  } catch (error) {
    console.error("Error fetching total recipe count:", error);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchFavoriteRecipes();
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchFavoriteRecipes();
  }
};

const handleSearch = () => {
  isSearchActive.value = true;
  currentPage.value = 1;
  fetchFavoriteRecipes();
};

const clearResults = () => {
  ingredientInput.value = "";
  isSearchActive.value = false;
  currentPage.value = 1;
  fetchFavoriteRecipes();
};

useSeoMeta({
  title: "Favorites",
  description: "Your favorite recipes.",
});
</script>

<style scoped>
/* Add any additional styles you need here */
</style>

<style scoped>
.force-padding-left {
  padding-left: 42px !important;
}
input {
  -webkit-border-top-right-radius: 0;
  border-top-right-radius: 0;
  -webkit-border-bottom-right-radius: 0;
  border-bottom-right-radius: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>
