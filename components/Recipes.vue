<template>
  <div
    v-if="recipes && recipes.length"
    class="lg:min-w-[350px] lg:max-w-[350px] px-5 pb-4 lg:sticky lg:top-[78px] h-full lg:border-r dark:border-midnight-600"
  >
    <div class="">
      <ul class="xl:pr-2 pt-5">
        <h5 class="text-sm text-slate-500 mb-3 xl:pl-5">YOUR CREATIONS</h5>
        <div class="h-screen-minus-header overflow-y-scroll xl:pl-5">
          <li
            v-for="recipe in reversedRecipes"
            :key="recipe.recipe_number || recipe.id"
            class=""
          >
            <div :class="user ? 'flex items-top gap-2' : ''">
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
            <NuxtLink to="/favorites" class="link"
              >Go To Favorites
              <Icon name="mdi:arrow-right" class="icon-style" />
            </NuxtLink>
          </p>
        </div>
        <div v-else>
          <p class="mt-3 text-center">
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

const props = defineProps({
  recipes: Array,
});

const reversedRecipes = computed(() => {
  return [...props.recipes].reverse();
});

const { find } = useStrapi();
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
      populate: "*",
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

onMounted(() => {
  fetchRecipesFromStrapi();
});
</script>
