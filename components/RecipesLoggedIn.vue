<template>
  <div
    v-show="
      recipesFromStrapi.today?.length ||
      recipesFromStrapi.yesterday?.length ||
      recipesFromStrapi.lastSevenDays?.length ||
      recipesFromStrapi.older?.length
    "
    class="sticky top-[78px] px-5 pb-24 lg:pb-0 h-full lg:border-r dark:border-midnight-600 lg:min-w-[320px] lg:max-w-[360px] xl:min-w-[380px]"
  >
    <div class="h-full">
      <ul class="xl:pr-2 pb-5 pt-2 sticky top-[78px]">
        <div
          class="h-screen-minus-header overflow-y-scroll xl:pl-5"
          ref="scrollContainer"
        >
          <div class="bg-white dark:bg-midnight-800 sticky top-0 z-20">
            <h5
              v-if="recipesFromStrapi.today?.length"
              class="text-sm text-slate-500 mb-3 py-2"
            >
              TODAY'S CREATIONS
            </h5>
          </div>
          <li
            v-for="recipe in recipesFromStrapi.today"
            :key="recipe.id"
            class=""
          >
            <div :class="user ? 'flex items-top gap-2' : ''">
              <div v-if="user">
                <button @click="toggleFavorite(recipe)">
                  <Icon
                    :name="recipe.isFavorited ? 'bx:bxs-heart' : 'bx:heart'"
                    :class="
                      recipe.isFavorited
                        ? 'icon-style text-yellow-500'
                        : 'icon-style text-slate-500'
                    "
                  />
                </button>
              </div>
              <div>
                <NuxtLink @click="emitCloseMenu" :to="`/recipes/${recipe.uid}`">
                  <h2
                    class="mb-0 text-lg dark:text-slate-300 text-left hover:text-brand-500"
                  >
                    {{ truncateString(recipe.recipe_name, 28) }}
                  </h2>
                </NuxtLink>

                <div class="flex gap-5 text-base mb-4">
                  <p v-if="recipe.total_time">
                    <Icon name="bx:time" class="icon-style" />
                    {{
                      truncateString(
                        recipe.total_time ? recipe.total_time : "",
                        16
                      )
                    }}
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
          <div class="bg-white dark:bg-midnight-800 sticky top-0 z-20">
            <h5
              v-if="recipesFromStrapi.yesterday?.length"
              class="text-sm text-slate-500 mb-3 py-2"
            >
              YESTERDAY
            </h5>
          </div>
          <li
            v-for="recipe in recipesFromStrapi.yesterday"
            :key="recipe.id"
            class=""
          >
            <div :class="user ? 'flex items-top gap-2' : ''">
              <div v-if="user">
                <button @click="toggleFavorite(recipe)">
                  <Icon
                    :name="recipe.isFavorited ? 'bx:bxs-heart' : 'bx:heart'"
                    :class="
                      recipe.isFavorited
                        ? 'icon-style text-yellow-500'
                        : 'icon-style text-slate-500'
                    "
                  />
                </button>
              </div>
              <div>
                <NuxtLink @click="emitCloseMenu" :to="`/recipes/${recipe.uid}`">
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
          <div class="bg-white dark:bg-midnight-800 sticky top-0 z-20">
            <h5
              v-if="recipesFromStrapi.lastSevenDays?.length"
              class="text-sm text-slate-500 mb-3 py-2"
            >
              PREVIOUS 7 DAYS
            </h5>
          </div>
          <li
            v-for="recipe in recipesFromStrapi.lastSevenDays"
            :key="recipe.id"
            class=""
          >
            <div :class="user ? 'flex items-top gap-2' : ''">
              <div v-if="user">
                <button @click="toggleFavorite(recipe)">
                  <Icon
                    :name="recipe.isFavorited ? 'bx:bxs-heart' : 'bx:heart'"
                    :class="
                      recipe.isFavorited
                        ? 'icon-style text-yellow-500'
                        : 'icon-style text-slate-500'
                    "
                  />
                </button>
              </div>
              <div>
                <NuxtLink @click="emitCloseMenu" :to="`/recipes/${recipe.uid}`">
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
          <div class="bg-white dark:bg-midnight-800 sticky top-0 z-20">
            <h5
              v-if="recipesFromStrapi.older?.length"
              class="text-sm text-slate-500 mb-3 py-2"
            >
              OLDER THAN 7 DAYS
            </h5>
          </div>
          <li
            v-for="recipe in recipesFromStrapi.older"
            :key="recipe.id"
            class=""
          >
            <div :class="user ? 'flex items-top gap-2' : ''">
              <div v-if="user">
                <button @click="toggleFavorite(recipe)">
                  <Icon
                    :name="recipe.isFavorited ? 'bx:bxs-heart' : 'bx:heart'"
                    :class="
                      recipe.isFavorited
                        ? 'icon-style text-yellow-500'
                        : 'icon-style text-slate-500'
                    "
                  />
                </button>
              </div>
              <div>
                <NuxtLink @click="emitCloseMenu" :to="`/recipes/${recipe.uid}`">
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
        <div v-if="isFetching" class="text-center">
          <Icon name="svg-spinners:bars-scale" size="1rem" class="mt-2" />
        </div>
        <div
          class="hidden border-b-2 dark:border-midnight-200 w-1/5 mx-auto text-center pt-4"
        ></div>
        <div v-if="user" class="hidden">
          <p class="mt-5 text-center">
            <NuxtLink to="/favorites" @click="emitCloseMenu" class="link"
              >Go To Favorites
              <Icon name="mdi:arrow-right" class="icon-style" />
            </NuxtLink>
          </p>
        </div>
        <div v-else>
          <p class="mt-5 text-center">
            <NuxtLink to="/login" @click="emitCloseMenu" class="link"
              >Login</NuxtLink
            >
            or
            <NuxtLink to="/sign-up" @click="emitCloseMenu" class="link"
              >Sign Up</NuxtLink
            >
            to save recipes.
          </p>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { zonedTimeToUtc, utcToZonedTime, format } from "date-fns-tz";

const { find, update, delete: _delete, create } = useStrapi();

const user = useStrapiUser();
const userFavoritesIds = ref([]);

const pageSize = 25; // Adjust as needed
let page = ref(1);
const isFetching = ref(false);
const endOfList = ref(false);
let isFetchingMore = ref(false);
const learnAboutFavorites = ref(false);

const emit = defineEmits(["closeMenu"]);

const emitCloseMenu = () => {
  emit("closeMenu");
};

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

// Fetch recipes associated with the user through the userrecipes API
const fetchRecipesFromStrapi = async (isInfiniteScroll = false) => {
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
        pagination: {
          page: page.value,
          pageSize: pageSize,
        },
      });

      // ... process the response ...
      if (userRecipesResponse.length === 0) {
        endOfList.value = true; // No more recipes to fetch
      }

      if (userRecipesResponse) {
        //recipesFromStrapi.value = {};
        const newRecipes = userRecipesResponse.map((userRecipe) => {
          return {
            ...userRecipe.attributes.recipe.data.attributes,
            id: userRecipe.attributes.recipe.data.id,
            addedAt: userRecipe.attributes.addedAt,
            isFavorited: userFavoritesIds.value.includes(
              userRecipe.attributes.recipe.data.id
            ),
          };
        });

        const newGroupedRecipes = groupRecipesByDate(newRecipes);
        //recipesFromStrapi.value = groupedRecipes;
        // Append new recipes to existing groups
        /*
        Object.keys(newGroupedRecipes).forEach((group) => {
          if (recipesFromStrapi.value[group]) {
            recipesFromStrapi.value[group].push(...newGroupedRecipes[group]);
          } else {
            recipesFromStrapi.value[group] = newGroupedRecipes[group];
          }
        });*/
        // Updated logic to merge new recipes
        Object.keys(newGroupedRecipes).forEach((group) => {
          if (!recipesFromStrapi.value[group]) {
            recipesFromStrapi.value[group] = [];
          }

          if (isInfiniteScroll) {
            // For infinite scroll, append and then reverse each group
            newGroupedRecipes[group].forEach((newRecipe) => {
              if (
                !recipesFromStrapi.value[group].some(
                  (existingRecipe) => existingRecipe.id === newRecipe.id
                )
              ) {
                recipesFromStrapi.value[group].push(newRecipe);
              }
            });
            recipesFromStrapi.value[group].reverse();
          } else {
            // For regular updates, unshift in reverse order
            newGroupedRecipes[group].reverse().forEach((newRecipe) => {
              if (
                !recipesFromStrapi.value[group].some(
                  (existingRecipe) => existingRecipe.id === newRecipe.id
                )
              ) {
                recipesFromStrapi.value[group].unshift(newRecipe);
              }
            });
          }
        });

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
    //console.log("UserId, recipeId: ", userId, recipeId);
    const response = await find("userfavorites", {
      populate: "*",
      filters: {
        user: userId,
        recipe: recipeId,
      },
    });
    //console.log("Response from findUserFavoriteEntry: ", response);
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
      //console.log("Trying to favorite recipe id: ", recipeId);
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

const groupRecipesByDate = (recipes, userTimeZone) => {
  const groups = {
    today: [],
    yesterday: [],
    lastSevenDays: [],
    older: [],
  };

  // Use the user's timezone or fallback to UTC
  const timeZone =
    userTimeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Get the current date in the user's timezone
  const now = utcToZonedTime(new Date(), timeZone);
  // Start of today (00:00) in user's timezone
  const startOfToday = startOfDay(now);

  recipes.forEach((recipe) => {
    // Convert addedAt to user's timezone
    const addedAt = utcToZonedTime(new Date(recipe.addedAt), timeZone);
    const addedAtDate = startOfDay(addedAt);

    // Calculate the difference in calendar days
    const dayDifference = differenceInCalendarDays(startOfToday, addedAtDate);

    if (dayDifference === 0) {
      groups.today.push(recipe);
    } else if (dayDifference === 1) {
      groups.yesterday.push(recipe);
    } else if (dayDifference < 7) {
      groups.lastSevenDays.push(recipe);
    } else {
      groups.older.push(recipe);
    }
  });

  return groups;
};

// Helper functions to get the start of the day and calculate the difference in calendar days
function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function differenceInCalendarDays(date1, date2) {
  return Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));
}

const scrollContainer = ref(null);

// Infinite scrolling
const checkScroll = () => {
  //console.log("Scroll event detected");
  if (!scrollContainer.value) return;

  const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value;
  if (
    scrollTop + clientHeight >= scrollHeight - 5 &&
    !isFetching.value &&
    !endOfList.value
  ) {
    console.log("End of list, loading more recipes...");
    // Load more recipes
    loadMoreRecipes();
  }
};

onMounted(() => {
  //console.log("Component mounted");
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener("scroll", checkScroll);
  }
});

onUnmounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener("scroll", checkScroll);
  }
});
const loadMoreRecipes = async () => {
  isFetching.value = true;
  isFetchingMore.value = true; // Set flag for infinite scrolling
  page.value += 1;
  await fetchRecipesFromStrapi(true); // Pass true for infinite scrolling
  isFetching.value = false;
  isFetchingMore.value = false; // Reset flag after fetching
};
</script>
