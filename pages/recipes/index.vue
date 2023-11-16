<template>
  <div class="container mx-auto mt-10 xl:pr-96 pb-48">
    <div class="flex items-top justify-between">
      <div>
        <h1 class="font-bold">Browse Recipes</h1>
      </div>
      <div class="pagination-controls text-center">
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
    <div v-if="!recipes.length" class="text-center my-20">
      <p>Loading recipes...</p>
    </div>
    <div v-else class="">
      <div
        v-for="recipe in recipes"
        :key="recipe.id"
        class="mb-6 p-4 card flex gap-10"
      >
        <div v-if="recipe.image?.data" class="w-1/3">
          <nuxt-link :to="`/recipes/${recipe.uid}`">
            <img
              :src="`${strapiURL}${recipe.image?.data.attributes.url}`"
              class="rounded-lg mb-6 lg:mb-0"
          /></nuxt-link>
        </div>
        <div class="w-full">
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
                recipe.diet_type_if_set && recipe.diet_type_if_set != 'None'
              "
            >
              <b>Diet:</b> {{ recipe.diet_type_if_set }}
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
    <div class="pagination-controls text-center mt-10">
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
const { find } = useStrapi();

const {
  public: { strapiURL },
} = useRuntimeConfig();

const recipes = ref([]);
const currentPage = ref(1);
const pageSize = 10; // or any other number you prefer
const totalRecipes = ref(0);
const totalPages = computed(() => Math.ceil(totalRecipes.value / pageSize));
const ingredientInput = ref("");
const isInputFocused = ref(false);

const isLastPage = computed(() => currentPage.value >= totalPages.value);

const fetchRecipes = async (page = 1) => {
  console.log("Fetching recipes...");
  const recipesData = await find("recipes", {
    pagination: { page, pageSize },
    populate: ["userdata", "image"],
  });
  console.log("Data: ", recipesData);

  if (recipesData) {
    recipes.value = recipesData?.data.map((recipeEntity) => ({
      id: recipeEntity.id,
      ...recipeEntity.attributes,
    }));
    totalRecipes.value = recipesData?.meta.pagination.total;
  }
};

watch(currentPage, (newPage) => {
  fetchRecipes(newPage);
});

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (!isLastPage.value) currentPage.value++;
};

onMounted(() => {
  console.log("Fetching recipes...");
  fetchRecipes();
});
</script>

<style scoped>
.force-padding-left {
  padding-left: 42px !important;
}
</style>
