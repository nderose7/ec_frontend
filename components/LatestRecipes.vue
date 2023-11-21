<template>
  <div v-if="recipes && recipes.length" class="xl:mt-32">
    <ul class="dark:border-midnight-600 pt-5">
      <h5 class="text-sm text-slate-500 mb-4">COMMUNITY CREATIONS</h5>
      <div
        class="lg:grid grid-cols-3 gap-x-10 xl:grid-cols-2 min-[1600px]:grid-cols-3"
      >
        <li v-for="recipe in recipes" :key="recipe.id" class="card">
          <div v-if="recipe.attributes.image?.data" class="mb-4">
            <NuxtLink :to="`/recipes/${recipe.attributes.uid}`">
              <img
                :src="`${recipe.attributes.image?.data.attributes.url}`"
                class="rounded-lg mb-6 lg:mb-0"
              />
            </NuxtLink>
          </div>
          <NuxtLink :to="`/recipes/${recipe.attributes.uid}`">
            <h2 class="dark:text-slate-300 text-left mb-4 hover:text-brand-500">
              {{ truncateString(recipe.attributes.recipe_name, 60) }}
            </h2>
          </NuxtLink>
          <p>
            {{ truncateString(recipe.attributes.paragraph_description, 140) }}
          </p>
          <div class="flex gap-5 text-base mb-0 mt-4">
            <p>
              <Icon name="bx:time" class="icon-style" />
              {{ truncateString(recipe.attributes.total_time, 20) }}
            </p>

            <p>
              <Icon name="material-symbols:bar-chart" class="icon-style" />
              {{ truncateString(recipe.attributes.calories, 4) }}
            </p>
          </div>
        </li>
      </div>
      <div class="text-center pt-8">
        <NuxtLink to="/recipes" class="link"
          >More Creations <Icon name="mdi:arrow-right" class="icon-style"
        /></NuxtLink>
      </div>
    </ul>
  </div>
</template>

<script setup>
import { truncateString } from "~/utils/truncateString.js";
const { find } = useStrapi();
const recipes = ref(null);

const {
  public: { strapiURL },
} = useRuntimeConfig();

const fetchRecipes = async () => {
  try {
    const response = await find("recipes", {
      populate: "image",
      sort: { id: "desc" },
    });
    if (response.data) {
      // Assuming response.data is an array and can be reversed
      recipes.value = response.data.slice(0, 6); // This will reverse the array
    }
  } catch (error) {
    // Handle errors, e.g., log them or show a user-friendly message
    console.error("Error fetching recipes:", error);
  }
};

onMounted(() => {
  fetchRecipes(); // Fetch immediately when the component is mounted
  const intervalId = setInterval(fetchRecipes, 6000000); // Set up the interval to fetch every 60 seconds

  onUnmounted(() => {
    clearInterval(intervalId); // Clear the interval when the component is unmounted
  });
});
</script>
