<template>
  <div
    v-if="recipesFromStrapi.today?.length"
    class="min-[1600px]:w-1/4 w-1/3 px-5 pb-4 hidden xl:block sticky top-[82px] h-full border-r dark:border-midnight-600"
  >
    <div>
      <ul class="xl:pr-2 pt-5">
        <div class="h-screen-minus-header overflow-y-scroll xl:pl-5">
          <h5
            v-if="recipesFromStrapi.today?.length"
            class="text-sm text-slate-500 mb-3"
          >
            TODAY'S CREATIONS
          </h5>

          <li
            v-for="recipe in recipesFromStrapi.today"
            :key="recipe.id"
            class=""
          >
            <div :class="user ? 'flex items-top gap-2' : ''">
              <div v-if="user">
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
                    {{ truncateString(recipe.recipe_name, 28) }}
                  </h2>
                </NuxtLink>

                <div class="flex gap-5 text-base mb-4">
                  <p>
                    <Icon name="bx:time" class="icon-style" />
                    {{ truncateString(recipe.total_time, 16) }}
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

          <h5
            v-if="recipesFromStrapi.yesterday.length"
            class="text-sm text-slate-500 mb-3"
          >
            YESTERDAY
          </h5>

          <li
            v-for="recipe in recipesFromStrapi.yesterday"
            :key="recipe.id"
            class=""
          >
            <div :class="user ? 'flex items-top gap-2' : ''">
              <div v-if="user">
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
                    {{ truncateString(recipe.recipe_name, 28) }}
                  </h2>
                </NuxtLink>

                <div class="flex gap-5 text-base mb-4">
                  <p>
                    <Icon name="bx:time" class="icon-style" />
                    {{ truncateString(recipe.total_time, 16) }}
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

          <h5
            v-if="recipesFromStrapi.lastSevenDays.length"
            class="text-sm text-slate-500 mb-3"
          >
            Previous 7 Days
          </h5>

          <li
            v-for="recipe in recipesFromStrapi.lastSevenDays"
            :key="recipe.id"
            class=""
          >
            <div :class="user ? 'flex items-top gap-2' : ''">
              <div v-if="user">
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
                    {{ truncateString(recipe.recipe_name, 28) }}
                  </h2>
                </NuxtLink>

                <div class="flex gap-5 text-base mb-4">
                  <p>
                    <Icon name="bx:time" class="icon-style" />
                    {{ truncateString(recipe.total_time, 16) }}
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

          <h5
            v-if="recipesFromStrapi.older.length"
            class="text-sm text-slate-500 mb-3"
          >
            Older
          </h5>

          <li
            v-for="recipe in recipesFromStrapi.older"
            :key="recipe.id"
            class=""
          >
            <div :class="user ? 'flex items-top gap-2' : ''">
              <div v-if="user">
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
                    {{ truncateString(recipe.recipe_name, 28) }}
                  </h2>
                </NuxtLink>

                <div class="flex gap-5 text-base mb-4">
                  <p>
                    <Icon name="bx:time" class="icon-style" />
                    {{ truncateString(recipe.total_time, 16) }}
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
          class="border-b-2 dark:border-midnight-200 w-1/5 mx-auto text-center pt-4"
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
const { find, update, delete: _delete, create } = useStrapi();

const user = useStrapiUser();
const userFavoritesIds = ref([]);

const pageSize = 100;
let page = 1;
//let recipesFromStrapi = [];

const props = defineProps({
  triggerUpdate: Number,
});

watch(
  () => props.triggerUpdate,
  () => {
    fetchRecipesFromStrapi();
    fetchUserFavorites();
  }
);

const recipesFromStrapi = ref([]);

const { data: userData } = await useAsyncData("userdata", () =>
  find("userdatas", {
    populate: ["owner", "recipes"],
    filters: {
      owner: user?.value?.id,
    },
  })
);

// Fetch recipes from Strapi when the component is mounted
/*
const fetchRecipesFromStrapi = async () => {
  console.log("Fetching recipes after adding a recipe...");
  if (user.value?.id) {
    try {
      const { data: response } = await find("recipes", {
        populate: "*",
        filters: {
          created_by_user: user.value?.id,
        },
      });
      if (response) {
        recipesFromStrapi.value = response.reverse();
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }
};*/
// Fetch recipes associated with the user through the userrecipes API
const fetchRecipesFromStrapi = async () => {
  console.log("Fetching recipes associated with the user...");
  if (user.value?.id) {
    try {
      const { data: userRecipesResponse } = await find("userrecipes", {
        populate: {
          recipe: "*",
          user: "*",
        },
        filters: {
          user: user.value?.id,
        },
        sort: ["addedAt:desc"],
      });

      if (userRecipesResponse) {
        const recipes = userRecipesResponse.map((userRecipe) => {
          return {
            ...userRecipe.attributes.recipe.data.attributes,
            id: userRecipe.attributes.recipe.data.id,
            addedAt: userRecipe.attributes.addedAt,
            isFavorited: userFavoritesIds.value.includes(
              userRecipe.attributes.recipe.data.id
            ),
          };
        });

        const groupedRecipes = groupRecipesByDate(recipes);
        recipesFromStrapi.value = groupedRecipes;
        setUserFavorites(userFavoritesIds.value); // Ensure the isFavorited status is set correctly
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }
};

//onMounted(fetchRecipesFromStrapi);

// Fetch user's favorite recipes and populate the set for quick lookup
const fetchUserFavorites = async () => {
  if (user.value?.id) {
    try {
      const { data: userFavoritesResponse } = await find("userfavorites", {
        populate: {
          recipe: "*",
        },
        filters: {
          user: user.value?.id,
        },
        sort: ["favoritedAt:desc"],
      });

      if (userFavoritesResponse) {
        userFavoritesIds.value = userFavoritesResponse.map(
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
  const updateIsFavorited = (recipes) => {
    return recipes.map((recipe) => ({
      ...recipe,
      isFavorited: userFavorites.includes(recipe.id),
    }));
  };

  if (recipesFromStrapi.value) {
    Object.keys(recipesFromStrapi.value).forEach((group) => {
      recipesFromStrapi.value[group] = updateIsFavorited(
        recipesFromStrapi.value[group]
      );
    });
  }
};

const findUserFavoriteEntry = async (userId, recipeId) => {
  try {
    console.log("UserId, recipeId: ", userId, recipeId);
    const response = await find("userfavorites", {
      populate: "*",
      filters: {
        user: userId,
        recipe: recipeId,
      },
    });
    console.log("Response from findUserFavoriteEntry: ", response);
    return response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error("Error fetching user favorite entry:", error);
    return null;
  }
};

const toggleFavorite = async (clickedRecipe) => {
  const isFavorited = clickedRecipe.isFavorited;
  const userId = user.value?.id;
  const recipeId = clickedRecipe.id;

  try {
    const userFavoriteEntry = await findUserFavoriteEntry(userId, recipeId);

    if (isFavorited && userFavoriteEntry) {
      // Remove from favorites (delete the entry)
      await _delete("userfavorites", userFavoriteEntry.id, {
        recipe: { disconnect: [recipeId] },
      });
      userFavoritesIds.value = userFavoritesIds.value.filter(
        (id) => id !== recipeId
      );
    } else if (!isFavorited) {
      console.log("Trying to favorite recipe id: ", recipeId);
      // Add to favorites (create a new entry)
      await create("userfavorites", {
        recipe: {
          connect: [recipeId],
        },
        user: {
          connect: [userId],
        },
        favoritedAt: new Date().toISOString(),
      });
      userFavoritesIds.value.push(recipeId);
    }
    setUserFavorites(userFavoritesIds.value);
    clickedRecipe.isFavorited = !isFavorited;
  } catch (error) {
    console.error("Error toggling favorite status:", error);
  }
};

watch(userFavoritesIds, (newFavorites) => {
  setUserFavorites(newFavorites);
});

/*
watch(
  user,
  (currentUser, prevUser) => {
    if (currentUser && !prevUser) {
      // This checks if the user was null before and now you have a user object
      fetchUserFavorites(); // Fetch user data when user becomes available
    }
  },
  { immediate: true }
);*/

watch(
  () => user.value?.id,
  async (userId) => {
    if (userId) {
      await fetchRecipesFromStrapi();
      await fetchUserFavorites();
    }
  },
  { immediate: true }
);

const groupRecipesByDate = (recipes) => {
  const groups = {
    today: [],
    yesterday: [],
    lastSevenDays: [],
    older: [],
  };

  const now = new Date();
  recipes.forEach((recipe) => {
    const addedAt = new Date(recipe.addedAt); // Assuming recipe.addedAt is a valid date string
    const dayDifference = (now - addedAt) / (1000 * 3600 * 24);

    if (dayDifference < 1) {
      groups.today.push(recipe);
    } else if (dayDifference < 2) {
      groups.yesterday.push(recipe);
    } else if (dayDifference < 7) {
      groups.lastSevenDays.push(recipe);
    } else {
      groups.older.push(recipe);
    }
  });

  return groups;
};
</script>
