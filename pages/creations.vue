<template>
  <div class="container mx-auto lg:mt-10 mt-4 pb-48 px-5 lg:flex">
    <div class="w-full">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="font-bold mt-4 lg:my-4 text-3xl lg:text-4xl">
            Your Creations
          </h1>
        </div>
        <div
          v-if="recipes.length"
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
          placeholder="Recipe, ingredients, cuisine, or diet..."
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
      <div v-if="!recipes.length && !loadingRecipes" class="text-center my-20">
        <p>No recipes found.</p>
      </div>
      <div v-else class="">
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
          v-for="recipe in recipes"
          :key="recipe.id"
          class="mb-6 p-4 card lg:flex gap-10"
        >
          <div v-if="recipe.image?.data" class="lg:w-1/3">
            <nuxt-link :to="`/recipes/${recipe.uid}`">
              <img
                :src="`${recipe.image?.data.attributes.url}`"
                class="rounded-lg mb-6 lg:mb-0"
            /></nuxt-link>
          </div>
          <div class="w-full">
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
      <div v-if="recipes.length" class="pagination-controls text-center mt-10">
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
  </div>
</template>

<script setup>
const { find } = useStrapi();

useSeoMeta({
  title: "Browse Recipes",
  description: "Browse all recipes created the EatClassy community.",
});

const recipes = ref([]);
const currentPage = ref(1);
const pageSize = 100; // or any other number you prefer
const totalRecipes = ref(0);
const numberRecipesFound = ref(0);
const totalPages = computed(() => Math.ceil(totalRecipes.value / pageSize));
const ingredientInput = ref("");
const isInputFocused = ref(false);
const isSearchActive = ref(false);
const searchQueryValue = ref("");
const loadingRecipes = ref(false);
const user = useStrapiUser();

const isLastPage = computed(() => currentPage.value >= totalPages.value);

const fetchAllUserRecipes = async () => {
  let page = 1;
  let userRecipeIDs = [];
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await find("userrecipes", {
        filters: { user: { id: user.value?.id } },
        populate: ["recipe"],
        pagination: { page: page, pageSize: 25 }, // Adjust pageSize if needed
      });

      const data = response.data.map(
        (userRecipe) => userRecipe.attributes.recipe.data.id
      );
      userRecipeIDs.push(...data);

      hasMore =
        response.meta.pagination.page < response.meta.pagination.pageCount;
      page++;
    } catch (error) {
      console.error("Error fetching user recipes:", error);
      hasMore = false; // Stop loop in case of an error
    }
  }

  return userRecipeIDs;
};

const fetchRecipes = async (page = 1, searchQuery = ingredientInput.value) => {
  loadingRecipes.value = true;
  console.log("Fetching recipes...");

  searchQueryValue.value = searchQuery;

  try {
    const userRecipeIDs = await fetchAllUserRecipes();

    if (userRecipeIDs.length === 0) {
      // Handle the case where no recipes are found
      loadingRecipes.value = false;
      return;
    }

    console.log("userRecipeIDs: ", userRecipeIDs);

    let queryParams = {
      pagination: { page, pageSize },
      populate: ["image"],
      sort: ["createdAt:desc"],
      filters: {
        id: userRecipeIDs, // Filter by recipe IDs
      },
    };
    if (isSearchActive.value && searchQuery) {
      queryParams.filters = {
        id: userRecipeIDs,
        $or: [
          { recipe_name: { $containsi: searchQuery } },
          { ingredients: { $containsi: searchQuery } },
          { cuisine: { $containsi: searchQuery } },
          { course: { $containsi: searchQuery } },
          { diet_type_if_set: { $containsi: searchQuery } },
          // Add more fields here if needed
        ],
      };
    }
    try {
      const recipesData = await find("recipes", queryParams);
      console.log("Data: ", recipesData);
    } catch (e) {
      console.error("Error fetching recipes with queryParams:", error);
    }

    if (recipesData) {
      recipes.value = recipesData.data.map((recipeEntity) => ({
        id: recipeEntity.id,
        ...recipeEntity.attributes,
      }));
      totalRecipes.value = recipesData.meta.pagination.total;

      // Update numberRecipesFound based on whether a search is active
      numberRecipesFound.value = isSearchActive.value
        ? recipesData.meta.pagination.total
        : totalRecipes.value;
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
    // Handle the error appropriately
  }
  loadingRecipes.value = false;
};

const handleSearch = () => {
  currentPage.value = 1; // Reset to first page for new search
  isSearchActive.value = true; // Set search as active
  fetchRecipes(currentPage.value, ingredientInput.value);
};

watch(currentPage, (newPage) => {
  if (isSearchActive.value) {
    fetchRecipes(newPage, ingredientInput.value);
  } else {
    fetchRecipes(newPage);
  }
});

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    window.scrollTo(0, 0); // Scroll to the top of the page
  }
};

const nextPage = () => {
  if (!isLastPage.value) {
    currentPage.value++;
    window.scrollTo(0, 0); // Scroll to the top of the page
  }
};

onMounted(() => {
  console.log("Fetching recipes...");
  fetchTotalRecipeCount();
  fetchRecipes();
});

const clearResults = () => {
  ingredientInput.value = "";
  isSearchActive.value = false;
  currentPage.value = 1;
  fetchTotalRecipeCount();
  fetchRecipes();
};

const fetchTotalRecipeCount = async () => {
  try {
    const response = await find("userrecipes", {
      pagination: { page: 1, pageSize: 1 },
      filters: { user: { id: user.value?.id } },
    });
    if (response && response.meta) {
      numberRecipesFound.value = response.meta.pagination.total;
    }
  } catch (error) {
    console.error("Error fetching total recipe count:", error);
  }
};
</script>

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
