<template>
  <div
    v-if="recipes && recipes.length"
    class="min-[1600px]:w-1/4 w-1/3 px-5 pb-4 hidden xl:block sticky top-[82px] h-full border-r dark:border-midnight-600"
  >
    <div>
      <ul class="xl:pr-2 pt-5">
        <h5 class="text-sm text-slate-500 mb-3 xl:pl-5">YOUR CREATIONS</h5>
        <div class="h-screen-minus-header overflow-y-scroll xl:pl-5">
          <li
            v-for="recipe in reversedRecipesWithFavorites"
            :key="recipe.recipe_number"
            class=""
          >
            <div :class="user ? 'flex items-top gap-2' : ''">
              <div>
                <button @click="toggleFavorite(recipe)">
                  <Icon
                    :name="recipe.isFavorited ? 'bx:bxs-star' : 'bx:star'"
                    :class="
                      recipe.isFavorited
                        ? 'icon-style text-yellow-500'
                        : 'icon-style text-slate-500'
                    "
                  />
                </button>
              </div>
              <div>
                <NuxtLink :to="`/recipes/${slugify(recipe.recipe_name)}`">
                  <h2
                    class="mb-0 text-lg dark:text-slate-300 text-left hover:text-brand-500"
                  >
                    {{ truncateString(recipe.recipe_name, 30) }}
                  </h2>
                </NuxtLink>

                <div class="flex gap-5 text-base mb-4">
                  <p>
                    <Icon name="bx:time" class="icon-style" />
                    {{ recipe.total_time }}
                  </p>

                  <p>
                    <Icon
                      name="material-symbols:bar-chart"
                      class="icon-style"
                    />
                    {{ truncateString(recipe.calories, 4) }}
                  </p>
                </div>
              </div>
            </div>
          </li>
        </div>
        <div
          class="border-b-2 dark:border-midnight-200 w-1/5 mx-auto text-center"
        ></div>
        <div v-if="user">
          <p class="mt-5 text-center">
            <NuxtLink to="/recipes/favorites" class="link"
              >Go To Favorites
              <Icon name="mdi:arrow-right" class="icon-style" />
            </NuxtLink>
          </p>
        </div>
        <div v-else>
          <p class="mt-5 text-center">
            <NuxtLink to="/login" class="link">Login</NuxtLink> or
            <NuxtLink to="/sign-up" class="link">Sign Up</NuxtLink> to save
            recipes.
          </p>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { slugify } from "~/utils/slugify.js";
import { truncateString } from "~/utils/truncateString.js";

const user = useStrapiUser();
const userData = ref(null);

const props = defineProps({
  recipes: Array,
});

const reversedRecipes = computed(() => {
  return [...props.recipes].reverse();
});

const { find, findOne, update } = useStrapi();
const recipesFromStrapi = ref([]);

//const recipesDataFromStrapi = ref(recipesFromStrapi.value);

watch(
  () => props.recipes,
  (newVal, oldVal) => {
    console.log("Updating fetchrecipesfromstrapi");
    fetchRecipesFromStrapi();
  },
  { deep: true }
); // Use deep watch if recipes is an array of objects

// Handle favorites

const pageSize = 100;
let page = 1;
//let recipesFromStrapi = [];

const fetchRecipesFromStrapi = async () => {
  while (true) {
    const { data: response, meta } = await find("recipes", {
      "pagination[pageSize]": pageSize,
      "pagination[page]": page,
    });

    recipesFromStrapi.value = recipesFromStrapi.value.concat(response);

    if (page * pageSize >= meta.pagination.total) {
      break;
    }

    page++;
  }
};

/*
const fetchRecipesFromStrapi = async () => {
  try {
    const response = await find("recipes", {
      populate: "*",

    });
    if (response.data) {
      recipesFromStrapi.value = response.data;
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};*/

onMounted(() => {
  fetchRecipesFromStrapi();
});

const toggleFavorite = async (clickedRecipe) => {
  await fetchRecipesFromStrapi();
  // Find the corresponding recipe in Strapi based on UID, which corresponds to the title
  const uid = slugify(clickedRecipe.recipe_name); // Slugify once and reuse the variable
  console.log("UID: ", uid);
  const recipeInStrapi = recipesFromStrapi.value.find(
    (recipe) => recipe.attributes.uid === uid
  );
  console.log(recipeInStrapi);

  if (recipeInStrapi) {
    const isFavorited = userFavoritesUids.value.includes(uid);
    try {
      // Send the update request to Strapi
      await update("recipes", recipeInStrapi.id, {
        userdata: isFavorited
          ? { disconnect: [user.value.id] }
          : { connect: [user.value.id] },
      });
      // Toggle the local favorite state based on the action performed
      if (isFavorited) {
        // If the recipe is currently favorited, remove it from the array
        userFavoritesUids.value = userFavoritesUids.value.filter(
          (favUid) => favUid !== uid
        );
      } else {
        // If the recipe is not currently favorited, add it to the array
        userFavoritesUids.value.push(uid);
      }
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  } else {
    console.error("Recipe not found in Strapi with name:", uid);
  }

  reversedRecipesWithFavorites.value = reversedRecipesWithFavorites.value.map(
    (recipe) => ({
      ...recipe,
      isFavorited: userFavoritesUids.value.includes(
        slugify(recipe.recipe_name)
      ),
    })
  );
};

const userFavoritesUids = ref([]); // To efficiently check if a recipe is in favorites

// Fetch user's favorite recipes and populate the set for quick lookup
const fetchUserFavorites = async () => {
  if (user.value?.id) {
    try {
      const { data: userDataResponse } = await useAsyncData("userdata", () =>
        find("userdatas", {
          populate: ["recipes", "owner"],
          filters: {
            owner: user?.value?.id,
          },
        })
      );

      if (userDataResponse.value) {
        console.log("userDataResponse: ", userDataResponse.value.data[0]);

        if (userDataResponse.value) {
          userFavoritesUids.value =
            userDataResponse.value.data[0].attributes.recipes.data.map(
              (recipe) => recipe.attributes.uid
            );
        }

        console.log(userFavoritesUids.value);
      }
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
  }
};

// Create a computed property that maps the favorited status using 'uid' and 'title'
const reversedRecipesWithFavorites = computed(() => {
  return props.recipes
    .slice()
    .reverse()
    .map((recipe) => ({
      ...recipe,
      // Check if the slugified title is in the userFavorites set
      isFavorited: userFavoritesUids.value.includes(
        slugify(recipe.recipe_name)
      ),
    }));
});

// Ensure we have user data first
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
