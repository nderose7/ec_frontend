<template>
  <div class="xl:w-3/4 px-5 lg:px-10 xl:px-48 pb-48 pt-5">
    <div class="flex">
      <button
        type="button"
        @click.prevent="$router.back()"
        class="mb-4 btn-gray btn-sm"
      >
        &larr; Back
      </button>
    </div>
    <div
      v-for="(recipe, recipeIndex) in recipes.data"
      :key="`recipe-${recipeIndex}`"
      class="pt-5"
    >
      <div>
        <h1 class="mb-4 text-5xl leading-tight">
          {{ recipe?.attributes.recipe_name }}
        </h1>
        <div class="mb-5">
          <button
            @click="toggleFavorite(recipe)"
            class="flex items-center gap-2 font-semibold btn-outline"
            :class="recipe.isFavorited ? 'btn-outline-filled' : 'btn-outline'"
          >
            <Icon
              :name="recipe.isFavorited ? 'bx:bxs-star' : 'bx:star'"
              size="1.5rem"
              class="icon-style"
              :class="
                recipe.isFavorited ? ' text-yellow-500' : ' text-brand-500'
              "
            />
            <span v-if="recipe.isFavorited">Remove From</span
            ><span v-else>Add To</span> Favorites
          </button>
        </div>
      </div>
      <div class="flex gap-5 mt-2 mb-4">
        <div><b>Course:</b> {{ recipe?.attributes.course }}</div>
        <div><b>Cuisine:</b> {{ recipe?.attributes.cuisine }}</div>
      </div>
      <p>{{ recipe?.attributes.paragraph_description }}</p>

      <div
        class="mt-6 bg-slate-100 dark:bg-midnight-600 border dark:border-midnight-200 rounded-lg px-5 py-2 pb-3 w-fit"
      >
        <div class="flex gap-5 mt-2">
          <div>
            <Icon name="bx:time" class="icon-style" />
          </div>
          <div><b>Prep:</b> {{ recipe?.attributes.prep_time }}</div>
          <div><b>Cook:</b> {{ recipe?.attributes.cook_time }}</div>
          <div><b>Total:</b> {{ recipe?.attributes.total_time }}</div>
        </div>
        <div class="flex gap-5 mt-2">
          <div>
            <Icon name="mdi:silverware" class="icon-style" />
          </div>
          <div><b>Servings:</b> {{ recipe?.attributes.servings }}</div>
          <div><b>Calories:</b> {{ recipe?.attributes.calories }}</div>
        </div>
      </div>

      <div>
        <h2 class="mt-8 mb-4">Ingredients</h2>
        <div v-html="parsedIngredients" class="ml-5"></div>

        <h2 class="mt-8 mb-4">Instructions</h2>
        <div v-html="parsedInstructions" class="ml-5"></div>

        <h2 class="mt-8 mb-4">Cooking Notes</h2>
        <div v-html="parsedNotes" class="ml-5"></div>

        <h2 class="mt-8 mb-4">Beer, Wine, Cocktail Pairings</h2>
        <ul class="list-disc ml-8">
          <li><b>Beer Pairing:</b> {{ recipe?.attributes.beer_pairing }}</li>
          <li><b>Wine Pairing:</b> {{ recipe?.attributes.wine_pairing }}</li>
          <li>
            <b>Cocktail Pairing:</b> {{ recipe?.attributes.cocktail_pairing }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
li {
  @apply pl-2;
}
</style>

<script setup>
import {
  parseDashesToHTML,
  parseNumbersToHTML,
} from "~/utils/parseIngredients.js";
const route = useRoute();
const { update, find } = useStrapi();

const recipeId = ref();

const {
  public: { strapiURL },
} = useRuntimeConfig();

const { data: recipes } = await useFetch(
  `${strapiURL}/api/recipes?filters[uid][$eq]=${route.params.uid}`
);

recipeId.value = recipes.value?.data[0].id;

// Computed property to parse ingredients to HTML
const parsedIngredients = computed(() => {
  if (recipes.value && recipes.value.data && recipes.value.data.length > 0) {
    const firstRecipeIngredients = recipes.value.data[0].attributes.ingredients;
    console.log(firstRecipeIngredients);
    return parseDashesToHTML(firstRecipeIngredients);
  }
  return "";
});

const parsedInstructions = computed(() =>
  parseNumbersToHTML(recipes.value.data[0].attributes.cooking_instructions)
);

const parsedNotes = computed(() => {
  if (recipes.value && recipes.value.data && recipes.value.data.length > 0) {
    const firstRecipeNotes = recipes.value.data[0].attributes.cooking_notes;
    return parseDashesToHTML(firstRecipeNotes);
  }
  return "";
});

const user = useStrapiUser();
const userFavoritesIds = ref([]);

// Fetch user's favorite recipes and populate the set for quick lookup
const fetchUserFavorites = async () => {
  if (user.value?.id) {
    try {
      const response = await find("userdatas", {
        populate: ["recipes"],
        filters: {
          owner: user.value.id,
        },
      });

      if (response.data) {
        // Set the array of favorite recipe IDs based on the response
        userFavoritesIds.value = response.data[0].attributes.recipes.data.map(
          (favorite) => favorite.id
        );

        // Set the isFavorited state for the current recipe
        //recipe.isFavorited = userFavoritesIds.value.includes(recipeId.value);
      }
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
  }
};

const setUserFavorites = (userFavorites) => {
  userFavoritesIds.value = userFavorites;
  if (recipes.value && recipes.value.data) {
    // Loop through each recipe to set the isFavorited status based on the fetched favorites
    recipes.value.data = recipes.value.data.map((recipe) => ({
      ...recipe,
      isFavorited: userFavorites.includes(recipe.id),
    }));
  }
};

const toggleFavorite = async (clickedRecipe) => {
  // Check if the recipe is currently a favorite
  const isFavorited = userFavoritesIds.value.includes(clickedRecipe.id);

  try {
    // Perform the update action based on the current favorite state
    await update("recipes", clickedRecipe.id, {
      userdata: isFavorited
        ? { disconnect: [user.value.id] }
        : { connect: [user.value.id] },
    });

    // Update the userFavoritesIds and the isFavorited property after successful update
    if (isFavorited) {
      // Remove from user favorites
      userFavoritesIds.value = userFavoritesIds.value.filter(
        (id) => id !== clickedRecipe.id
      );
    } else {
      // Add to user favorites
      userFavoritesIds.value.push(clickedRecipe.id);
    }

    // Update the isFavorited property of the clicked recipe
    clickedRecipe.isFavorited = !isFavorited;
  } catch (error) {
    console.error("Error toggling favorite status:", error);
  }
};

watch(userFavoritesIds, (newFavorites) => {
  setUserFavorites(newFavorites);
});

watch(
  user,
  (currentUser, prevUser) => {
    if (currentUser && !prevUser) {
      // This checks if the user was null before and now you have a user object
      fetchUserFavorites(); // Fetch user data when user becomes available
    }
  },
  { immediate: true }
);
</script>
