<template>
  <div class="xl:w-full px-5 lg:px-10 xl:px-48 pb-48 pt-5">
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
      class="pt-5 pb-10"
    >
      <div class="lg:flex justify-between gap-10 xl:gap-16">
        <div v-if="recipe.attributes?.image.data" class="lg:order-2 lg:w-2/3">
          <img
            :src="`${recipe.attributes.image?.data?.attributes?.url}`"
            class="rounded-lg mb-6 lg:mb-0"
          />
        </div>
        <div class="w-full">
          <div>
            <h1
              class="mb-4 lg:text-5xl text-3xl leading-tight lg:leading-tight"
            >
              {{ recipe?.attributes.recipe_name }}
            </h1>
            <div v-if="user" class="mb-5">
              <button
                @click="toggleFavorite(recipe)"
                class="flex items-center gap-2 font-semibold btn-outline"
                :class="
                  recipe.isFavorited ? 'btn-outline-filled' : 'btn-outline'
                "
              >
                <Icon
                  :name="recipe.isFavorited ? 'bx:bxs-heart' : 'bx:heart'"
                  size="1.25rem"
                  class=""
                  :class="
                    recipe.isFavorited ? ' text-yellow-500' : ' text-brand-500'
                  "
                />
                <span v-if="recipe.isFavorited">Remove From</span
                ><span v-else>Add To</span> Favorites
              </button>
            </div>
            <div v-else>
              <p class="my-4">
                <NuxtLink to="/login" class="link">Login</NuxtLink> or
                <NuxtLink to="/sign-up" class="link">Sign Up</NuxtLink> to save
                recipes.
              </p>
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
            <div class="md:flex gap-5 mt-1 space-y-1 items-center">
              <div class="text-slate-500">
                <Icon name="bx:time" class="" />
                <span
                  class="md:hidden text-sm font-bold ml-1 relative top-[1px]"
                  >TIME</span
                >
              </div>
              <div><b>Prep:</b> {{ recipe?.attributes.prep_time }}</div>
              <div><b>Cook:</b> {{ recipe?.attributes.cook_time }}</div>
              <div><b>Total:</b> {{ recipe?.attributes.total_time }}</div>
            </div>
            <div class="md:flex gap-5 md:mt-2 mt-3 space-y-1 items-center">
              <div class="text-slate-500">
                <Icon name="mdi:silverware" class="" />
                <span
                  class="md:hidden text-sm font-bold ml-1 relative top-[1px]"
                  >SERVINGS</span
                >
              </div>
              <div class="lg:w-1/4">
                <b>Servings:</b> {{ recipe?.attributes.servings }}
              </div>
              <div><b>Calories:</b> {{ recipe?.attributes.calories }}</div>
            </div>
            <div
              v-if="
                recipe?.attributes.diet_type_if_set &&
                recipe?.attributes.diet_type_if_set != 'None' &&
                recipe?.attributes.diet_type_if_set != 'N/A' &&
                recipe?.attributes.diet_type_if_set != 'n/a'
              "
              class="md:flex gap-5 mt-3"
            >
              <div class="hidden md:block">
                <Icon
                  name="pepicons-pop:line-slant-up-circle"
                  class="icon-style p-[2px]"
                />
              </div>
              <div class="text-slate-500 md:hidden">
                <Icon name="mdi:cancel" class="" />
                <span
                  class="md:hidden text-sm font-bold ml-1 relative top-[1px]"
                  >DIET</span
                >
              </div>
              <div>
                <b>Diet:</b>
                {{ recipe?.attributes.diet_type_if_set }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 class="mt-8 mb-4">Ingredients</h2>
        <ul v-html="parsedIngredients" class="ml-8 list-disc"></ul>

        <h2 class="mt-8 mb-4">Instructions</h2>
        <div v-html="parsedInstructions" class="ml-5"></div>

        <h2 class="mt-8 mb-4">Cooking Notes</h2>
        <ul v-html="parsedNotes" class="ml-8 list-disc"></ul>

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
    <SignUpOffer v-if="!user" />
    <MembershipOffer v-if="user && !paidMemberTierOne" />
  </div>
</template>

<style scoped></style>

<script setup>
import {
  parseDashesToHTML,
  parseNumbersToHTML,
} from "~/utils/parseIngredients.js";
const route = useRoute();
const { update, find, delete: _delete, create } = useStrapi();

const recipeId = ref();
const user = useStrapiUser();
const userFavoritesIds = ref([]);

const paidMemberTierOne = ref(false);

const {
  public: { strapiURL },
} = useRuntimeConfig();

const { data: recipes } = await useFetch(
  `${strapiURL}/api/recipes?filters[uid][$eq]=${route.params.uid}&populate=*`
);

recipeId.value = recipes.value?.data[0].id;

// Computed property to parse ingredients to HTML
const parsedIngredients = computed(() => {
  if (recipes.value && recipes.value.data && recipes.value.data.length > 0) {
    const firstRecipeIngredients = recipes.value.data[0].attributes.ingredients;
    //console.log(firstRecipeIngredients);
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

// Fetch user's favorite recipes and populate the set for quick lookup
const fetchUserFavorites = async () => {
  if (user.value?.id) {
    try {
      const response = await find("userfavorites", {
        filters: {
          user: user.value?.id,
        },
        populate: {
          recipe: "id",
        },
      });

      if (response.data) {
        userFavoritesIds.value = response.data.map(
          (userFavorite) => userFavorite.attributes.recipe.data.id
        );
        setUserFavorites(userFavoritesIds.value);
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

const findUserFavoriteEntry = async (userId, recipeId) => {
  try {
    const response = await find("userfavorites", {
      filters: {
        user: userId,
        recipe: recipeId,
      },
    });
    return response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error("Error fetching user favorite entry:", error);
    return null;
  }
};

const toggleFavorite = async (clickedRecipe) => {
  const isFavorited = userFavoritesIds.value.includes(clickedRecipe.id);

  try {
    if (isFavorited) {
      // Find and delete the userfavorite entry
      const userFavoriteEntry = await findUserFavoriteEntry(
        user.value?.id,
        clickedRecipe.id
      );
      if (userFavoriteEntry) {
        await _delete("userfavorites", userFavoriteEntry.id);
        userFavoritesIds.value = userFavoritesIds.value.filter(
          (id) => id !== clickedRecipe.id
        );
      }
    } else {
      // Create a new userfavorite entry
      await create("userfavorites", {
        recipe: {
          connect: [clickedRecipe.id],
        },
        user: {
          connect: [user.value?.id],
        },
        favoritedAt: new Date().toISOString(),
      });
      userFavoritesIds.value.push(clickedRecipe.id);
    }

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

useSeoMeta({
  title: () => recipes?.value?.data[0]?.attributes?.recipe_name,
  description: () => recipes?.value?.data[0]?.attributes?.paragraph_description,
  ogImage: () =>
    recipes?.value?.data[0]?.attributes?.image?.data?.attributes?.url,
});
</script>
