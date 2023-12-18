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
            <div class="average-rating">
              <span>
                <div v-if="averageRating" class="star-rating">
                  <span class="pr-1"><b>Rating:</b></span>
                  <span v-for="index in 5" :key="index">
                    <Icon
                      :name="getStarType(index, parseFloat(averageRating))"
                      :class="
                        getStarType(index, parseFloat(averageRating)) ===
                        'bx:star'
                          ? 'text-slate-300 dark:text-slate-700 icon-style'
                          : 'text-orange-500 icon-style'
                      "
                    />
                  </span>
                </div>
              </span>
              <!-- You can also display stars based on the average rating -->
            </div>
            <div v-if="user" class="mb-5 mt-5">
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

      <div class="reviews">
        <h2 class="mt-8 mb-4">Reviews</h2>
        <div
          v-if="reviews.length"
          v-for="review in reviews"
          :key="review.id"
          class="mb-5"
        >
          <div class="text-base font-bold flex items-center gap-2">
            <img
              v-if="
                review.attributes.user.data.attributes.userdata.data.attributes
                  .avatar.data
              "
              :src="`${review?.attributes?.user?.data?.attributes?.userdata?.data?.attributes?.avatar?.data?.attributes?.url}`"
              alt="avatar"
              class="h-[32px] w-[32px] cursor-pointer rounded-full"
            />

            {{
              review.attributes.user.data.attributes.fullName ||
              review.attributes.user.data.attributes.username
            }}
          </div>
          <!-- Editable Review -->
          <div v-if="editingReviewId === review.id" class="form-control mt-2">
            <!-- Editable Rating -->
            <div class="star-rating-editable">
              <Icon
                v-for="index in 5"
                :key="index"
                :name="index <= editableRating ? 'bxs:star' : 'bx:star'"
                :class="
                  index <= editableRating
                    ? 'text-orange-500'
                    : 'text-slate-300 dark:text-slate-700'
                "
                @click="setEditableRating(index)"
              />
            </div>
            <textarea
              v-model="editableReviewText"
              class="edit-textarea rounded-lg mt-2"
            ></textarea>
            <div class="flex gap-2">
              <button
                @click="saveEdit(review)"
                class="btn-primary font-bold px-3 py-1"
              >
                Save
              </button>
              <button @click="cancelEdit" class="link">Cancel</button>
            </div>
          </div>

          <!-- Non-editable Review -->
          <div v-else>
            <!-- Static Star Rating Display -->
            <div class="flex mt-2">
              <span v-for="n in review.attributes.rating" :key="n">
                <Icon name="bxs:star" class="text-orange-500" />
              </span>
              <span v-for="n in 5 - review.attributes.rating" :key="n + 5">
                <Icon
                  name="bx:star"
                  class="text-slate-300 dark:text-slate-700"
                />
              </span>
            </div>
            <!-- Review Content -->
            <div class="review-content mt-2">
              {{ review.attributes.reviewText }}
            </div>
            <!-- Edit and Delete Buttons -->
            <div
              v-if="user && user.id === review.attributes.user.data.id"
              class="review-actions mt-2 flex gap-2 text-base"
            >
              <button @click="startEdit(review)" class="link">Edit</button>
              <!-- Delete Confirmation -->
              <div
                v-if="confirmingDeleteReviewId === review.id"
                class="confirm-delete"
              >
                <div class="flex gap-1">
                  <span class="p-2">Are you sure? </span>
                  <button
                    @click="confirmDelete(review.id)"
                    class="yes-button link px-3 border dark:border-midnight-200 rounded-lg"
                  >
                    Yes
                  </button>
                  <button
                    @click="cancelDelete"
                    class="no-button px-3 link border dark:border-midnight-200 rounded-lg"
                  >
                    No, cancel
                  </button>
                </div>
              </div>

              <!-- Delete Button -->
              <button
                v-else
                @click="askDeleteConfirmation(review.id)"
                class="link"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <div v-else>No reviews yet.</div>
      </div>

      <!-- Pagination Controls -->
      <div
        v-if="Math.ceil(totalReviews / pageSize) > 1"
        class="pagination-controls flex items-center mb-8"
      >
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage <= 1"
        >
          <Icon
            name="material-symbols:arrow-circle-left-rounded"
            class="text-brand-500"
            size="2rem"
          />
        </button>
        <span class="mx-2 text-base font-bold"
          >Page {{ currentPage }} of
          {{ Math.ceil(totalReviews / pageSize) }}</span
        >
        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage * pageSize >= totalReviews"
        >
          <Icon
            name="material-symbols:arrow-circle-right-rounded"
            class="text-brand-500"
            size="2rem"
          />
        </button>
      </div>
      <div
        v-if="user && !reviewSubmitted"
        class="leave-review form-control mt-10 bg-slate-100 dark:bg-midnight-600 rounded-lg p-5 px-6"
      >
        <form @submit.prevent="submitReview()">
          <label for="reviewText" class="mb-2 font-bold text-xl"
            >Leave a Review</label
          >
          <!-- Star Rating -->
          <div class="flex gap-1 items-center my-2">
            <div>
              <b>Rating: </b>
            </div>
            <div>
              <div class="star-rating">
                <Icon
                  v-for="index in 5"
                  :key="index"
                  :name="index <= rating ? 'bxs:star' : 'bx:star'"
                  :class="
                    index <= rating
                      ? 'text-orange-500 icon-style'
                      : 'text-slate-400 dark:text-slate-700 icon-style'
                  "
                  @click="setRating(index)"
                />
              </div>
            </div>
          </div>

          <textarea
            name="reviewText"
            id="reviewText"
            v-model="reviewText"
            class="rounded-lg"
            required
            placeholder="Your review..."
          />
          <button
            type="submit"
            class="btn-primary inline-block px-3 py-2 font-bold"
          >
            Submit Review
          </button>
        </form>
      </div>
      <div v-else-if="user && reviewSubmitted">
        <Icon
          name="line-md:confirm-circle"
          class="text-brand-500 icon-style mr-1"
          size="1.5rem"
        />
        <b>Review submitted!</b>
      </div>
      <div v-else class="mt-10">
        <p class="my-4">
          <NuxtLink to="/login" class="link">Login</NuxtLink> or
          <NuxtLink to="/sign-up" class="link">Sign Up</NuxtLink> to leave
          reviews.
        </p>
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
const { update, find, delete: _delete, create, findOne } = useStrapi();

const reviewText = ref("");
const recipeId = ref();
const user = useStrapiUser();
const userFavoritesIds = ref([]);
const reviews = ref([]);

const paidMemberTierOne = ref(false);
const reviewSubmitted = ref(false);

const editingReviewId = ref(null);
const editableReviewText = ref("");
const confirmingDeleteReviewId = ref(null);

const currentPage = ref(1);
const pageSize = 10; // Number of reviews per page
const totalReviews = ref(0);

const {
  public: { strapiURL },
} = useRuntimeConfig();

const { data: recipes } = await useFetch(
  `${strapiURL}/api/recipes?filters[uid][$eq]=${route.params.uid}&populate=*`
);

const fetchReviews = async (page = 1) => {
  const start = (page - 1) * pageSize;

  try {
    const response = await find("reviews", {
      populate: {
        recipe: {
          fields: ["id"],
        },
        user: {
          fields: ["id", "username", "fullName"],
          populate: {
            userdata: {
              fields: ["id"],
              populate: {
                avatar: true,
              },
            },
          },
        },
      },
      filters: {
        recipe: recipes.value.data[0].id,
      },
      sort: { id: "desc" },
      pagination: {
        start: start,
        limit: pageSize,
      },
    });
    reviews.value = response.data;
    totalReviews.value = response.meta.pagination.total;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchReviews(currentPage.value);
});

const averageRating = computed(() => {
  if (reviews.value.length === 0) return null;

  const totalRating = reviews.value.reduce((acc, review) => {
    return acc + review.attributes.rating; // Adjust this according to your data structure
  }, 0);

  return (totalRating / reviews.value.length).toFixed(1); // Rounds to one decimal place
});

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

const rating = ref(0);

const setRating = (newRating) => {
  rating.value = newRating;
};

const submitReview = async () => {
  try {
    await create("reviews", {
      rating: rating.value,
      reviewText: reviewText.value,
      user: user.value.id,
      recipe: recipeId.value,
    });
    reviewSubmitted.value = true;
    fetchReviews();
  } catch (error) {
    console.error(error);
  }
};

const editableRating = ref(0);

const startEdit = (review) => {
  editingReviewId.value = review.id;
  editableReviewText.value = review.attributes.reviewText;
  editableRating.value = review.attributes.rating; // Load current rating for editing
};

const setEditableRating = (newRating) => {
  editableRating.value = newRating;
};

const saveEdit = async (review) => {
  try {
    await update("reviews", review.id, {
      reviewText: editableReviewText.value,
      rating: editableRating.value,
    });
    // Reset editing state
    editingReviewId.value = null;
    fetchReviews();
  } catch (error) {
    console.error("Error saving review:", error);
  }
};

const askDeleteConfirmation = (reviewId) => {
  confirmingDeleteReviewId.value = reviewId;
};

const cancelDelete = () => {
  confirmingDeleteReviewId.value = null;
};

const confirmDelete = async (reviewId) => {
  confirmingDeleteReviewId.value = null;
  try {
    await _delete("reviews", reviewId);
    // Reset editing state
    editingReviewId.value = null;
    reviewSubmitted.value = false;
    fetchReviews();
  } catch (error) {
    console.error("Error deleting review:", error);
  }
};

const cancelEdit = () => {
  editingReviewId.value = null;
};

const changePage = (newPage) => {
  if (newPage >= 1 && newPage <= Math.ceil(totalReviews.value / pageSize)) {
    currentPage.value = newPage;
    fetchReviews(currentPage.value);
  }
};

const getStarType = (index, average) => {
  const ratingFloor = Math.floor(average);
  const hasHalfStar = average % 1 >= 0.5;

  if (index <= ratingFloor) {
    return "bxs:star"; // Full star
  } else if (hasHalfStar && index === ratingFloor + 1) {
    return "bxs:star-half"; // Half star
  }
  return "bx:star"; // Empty star
};

useSeoMeta({
  title: () => recipes?.value?.data[0]?.attributes?.recipe_name,
  description: () => recipes?.value?.data[0]?.attributes?.paragraph_description,
  ogImage: () =>
    recipes?.value?.data[0]?.attributes?.image?.data?.attributes?.url,
});
</script>
