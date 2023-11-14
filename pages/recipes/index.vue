<template>
  <div class="container mx-auto mt-10">
    <h1 class="font-bold my-4">Browse Recipes</h1>
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
      <div v-for="recipe in recipes" :key="recipe.id" class="mb-6 p-4 card">
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
        <p>{{ recipe.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { find } = useStrapi();

const recipes = ref([]);

const isInputFocused = ref(false);

const { data: recipesData } = await useAsyncData("recipe", () =>
  find("recipes", {
    ppopulate: ["userdata"],
  })
);

onMounted(async () => {
  if (recipesData.value) {
    recipes.value = recipesData.value?.data.map((recipeEntity) => ({
      id: recipeEntity.id,
      ...recipeEntity.attributes,
    }));
  }
});
</script>

<style scoped>
.force-padding-left {
  padding-left: 42px !important;
}
</style>
