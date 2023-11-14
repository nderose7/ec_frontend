<template>
  <div class="xl:flex h-full">
    <Recipes :recipes="recipes" />
    <div class="w-full px-5 xl:px-10 pb-48 min-[1600px]:flex gap-10">
      <div
        class="recipe-search w-full xl:px-16"
        :class="recipes.length ? '' : 'min-[1600px]:px-48 xl:px-48'"
      >
        <div class="text-center mb-10 pt-12">
          <h1 class="text-center mb-5 mt-5 text-5xl dark:text-slate-300">
            Insanely good recipes in an instant.
          </h1>
          <p class="lead">
            Generate unique recipes from any idea, ingredient, region, or
            dietary need.
          </p>
        </div>
        <div class="min-[1600px]:px-32">
          <button
            @click="showFilters = !showFilters"
            class="w-full p-2 px-4 font-bold rounded-lg border dark:border-transparent text-lg hover:dark:text-white hover:dark:bg-midnight-500"
            :class="
              showFilters
                ? 'bg-slate-100 dark:bg-midnight-900 dark:border-blue-900'
                : 'bg-white dark:bg-midnight-400'
            "
          >
            <Icon name="bx:filter" class="icon-style" />
            {{ (showFilters ? "Hide" : "Show") + " Recipe Options" }}
          </button>
        </div>
        <div
          v-if="showFilters"
          class="mt-3 px-5 pt-2 pb-2 slide-down bg-slate-100 dark:bg-midnight-900 rounded-lg form-control min-[1600px]:mx-32"
        >
          <div class="search-filter">
            <button @click="showCourseOptions = !showCourseOptions">
              <label
                class="mb-0"
                :class="showCourseOptions ? 'text-brand-500' : ''"
              >
                <Icon
                  :name="showCourseOptions ? 'bx:minus' : 'bx:plus'"
                  class="icon-style"
                />
                Course
              </label>
            </button>
            <div v-if="showCourseOptions" class="md:flex gap-4 mb-3 m-2">
              <label class="custom-radio">
                <input
                  type="radio"
                  v-model="selectedCourseOption"
                  value="Any"
                />
                <span class="radio-circle"></span>
                Any
              </label>
              <label class="custom-radio">
                <input
                  type="radio"
                  v-model="selectedCourseOption"
                  value="courseBreakfast"
                />
                <span class="radio-circle"></span>
                Breafast
              </label>
              <label class="custom-radio">
                <input
                  type="radio"
                  v-model="selectedCourseOption"
                  value="courseBrunch"
                />
                <span class="radio-circle"></span>
                Brunch
              </label>
              <label class="custom-radio">
                <input
                  type="radio"
                  v-model="selectedCourseOption"
                  value="courseLunch"
                />
                <span class="radio-circle"></span>
                Lunch
              </label>
              <label class="custom-radio">
                <input
                  type="radio"
                  v-model="selectedCourseOption"
                  value="courseDinner"
                />
                <span class="radio-circle"></span>
                Dinner
              </label>
              <label class="custom-radio">
                <input
                  type="radio"
                  v-model="selectedCourseOption"
                  value="courseAppetizers"
                />
                <span class="radio-circle"></span>
                Appetizers
              </label>
            </div>
          </div>

          <div class="search-filter">
            <button @click="showCuisineOptions = !showCuisineOptions">
              <label
                class=""
                :class="showCuisineOptions ? 'text-brand-500' : ''"
              >
                <Icon
                  :name="showCuisineOptions ? 'bx:minus' : 'bx:plus'"
                  class="icon-style"
                />
                Region / Cuisine
              </label>
            </button>
            <div v-if="showCuisineOptions" class="md:flex gap-4 mb-3 mt-3">
              <input
                type="text"
                v-model="cuisineOption"
                placeholder="Example: Italy or pasta"
                class="rounded-lg"
              />
            </div>
          </div>

          <div class="search-filter">
            <button @click="showDifficultyOptions = !showDifficultyOptions">
              <label
                class=""
                :class="showDifficultyOptions ? 'text-brand-500' : ''"
              >
                <Icon
                  :name="showDifficultyOptions ? 'bx:minus' : 'bx:plus'"
                  class="icon-style"
                />
                Difficulty / Time
              </label>
            </button>
            <div v-if="showDifficultyOptions" class="md:flex gap-4 mb-3">
              <label class="custom-radio">
                <input
                  type="radio"
                  v-model="selectedDifficultyOption"
                  value="Any"
                />
                <span class="radio-circle"></span>
                Any Difficulty
              </label>
              <label class="custom-radio">
                <input
                  type="radio"
                  v-model="selectedDifficultyOption"
                  value="Easy"
                />
                <span class="radio-circle"></span>
                Quick & Easy
              </label>
              <label class="custom-radio">
                <input
                  type="radio"
                  v-model="selectedDifficultyOption"
                  value="Medium Difficulty"
                />
                <span class="radio-circle"></span>
                Medium
              </label>
              <label class="custom-radio">
                <input
                  type="radio"
                  v-model="selectedDifficultyOption"
                  value="Gourmet"
                />
                <span class="radio-circle"></span>
                Gourmet
              </label>
            </div>
          </div>

          <div class="search-filter">
            <button @click="showDietOptions = !showDietOptions">
              <label class="" :class="showDietOptions ? 'text-brand-500' : ''">
                <Icon
                  :name="showDietOptions ? 'bx:minus' : 'bx:plus'"
                  class="icon-style"
                />
                Dietary Restrictions
              </label>
            </button>
            <div v-if="showDietOptions" class="md:flex gap-4 mb-3 mt-3">
              <input
                type="text"
                v-model="dietOption"
                placeholder="Example: Lactose intolerant or gluten free"
                class="rounded-lg"
              />
            </div>
          </div>

          <div class="search-filter">
            <button @click="showImagination = !showImagination">
              <label class="" :class="showImagination ? 'text-brand-500' : ''">
                <Icon
                  :name="showDietOptions ? 'bx:minus' : 'bx:plus'"
                  class="icon-style"
                />
                Imagination Level
              </label>
            </button>
            <div class="slider-container" v-if="showImagination">
              <p class="mb-4 pt-0 mt-0">How unique do you want your recipes?</p>
              <div class="relative max-w-[320px]">
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  v-model="sliderValue"
                  @input="updateSliderFill"
                  class="slider"
                  id="myRange"
                />
                <label for="myRange" class="mt-2"
                  >Level: {{ sliderValue }}</label
                >
              </div>
            </div>
          </div>
        </div>
        <form
          @submit.prevent="fetchRecipes"
          class="search-bar form-control mt-5 flex mb-0 min-[1600px]:px-32"
        >
          <input
            type="text"
            placeholder="Recipe, ingredients, or cuisine..."
            class="rounded-l-lg"
            v-model="ingredientInput"
          />
          <button
            type="submit"
            class="bg-brand-500 text-white mb-1 rounded-r-lg border-brand-500 border-r border-t border-b"
          >
            <div class="px-4">
              <Icon
                name="mdi:arrow-right"
                class="icon-style text-white"
                size="1.5rem"
              />
            </div>
          </button>
        </form>

        <div class="min-[1600px]:px-32 text-base font-medium text-right pt-1">
          <span class="pl-1">{{ freeCreditsLeft }} free credits left</span>
        </div>
        <div
          v-if="isLoadingRecipes"
          class="mb-3 px-5 xl:px-0 pl-1 min-[1600px]:px-32"
        >
          <b>Creating your recipe...</b>
          <Icon name="svg-spinners:3-dots-bounce" size="2rem" class="ml-3" />
        </div>
        <div
          v-if="createRecipesError"
          class="text-red-600 min-[1600px]:px-32 font-medium"
        >
          <Icon
            name="material-symbols:error-outline-rounded"
            class="icon-style"
          />
          {{ createRecipesError }}
        </div>
        <div
          class="pb-10 min-[1600px]:px-32"
          :class="!data > 0 ? 'xl:px-48' : ''"
        >
          <div v-if="!existingRecipeData">
            <h1
              @click="toggleDetails = !toggleDetails"
              class="mb-4 cursor-pointer text-brand-500"
            >
              {{ newRecipe.recipe_name }}
            </h1>

            <div class="mt-6 mb-5">
              <div class="flex gap-5 mt-2">
                <div v-if="newRecipe.prep_time">
                  <Icon name="bx:time" class="icon-style" />
                </div>
                <div>
                  <b>{{
                    isLoadingRecipes || newRecipe.prep_time ? "Prep:" : ""
                  }}</b>
                  <span v-if="isLoadingRecipes && !newRecipe.prep_time"
                    ><Icon
                      name="svg-spinners:3-dots-bounce"
                      size="1rem"
                      class="ml-3"
                  /></span>
                  {{ newRecipe.prep_time ? newRecipe.prep_time : "" }}
                </div>
                <div>
                  <b>{{
                    isLoadingRecipes || newRecipe.cook_time ? "Cook:" : ""
                  }}</b>
                  <span v-if="isLoadingRecipes && !newRecipe.cook_time"
                    ><Icon
                      name="svg-spinners:3-dots-bounce"
                      size="1rem"
                      class="ml-3"
                  /></span>
                  {{ newRecipe.cook_time ? newRecipe.cook_time : "" }}
                </div>
                <div>
                  <b>{{
                    isLoadingRecipes || newRecipe.total_time ? "Total:" : ""
                  }}</b>
                  <span v-if="isLoadingRecipes && !newRecipe.total_time"
                    ><Icon
                      name="svg-spinners:3-dots-bounce"
                      size="1rem"
                      class="ml-3"
                  /></span>
                  {{ newRecipe.total_time ? newRecipe.total_time : "" }}
                </div>
              </div>
              <div class="flex gap-5 mt-2">
                <div v-if="newRecipe.servings">
                  <Icon name="mdi:silverware" class="icon-style" />
                </div>
                <div>
                  <b>{{
                    isLoadingRecipes || newRecipe.servings ? "Servings:" : ""
                  }}</b>
                  <span v-if="isLoadingRecipes && !newRecipe.servings"
                    ><Icon
                      name="svg-spinners:3-dots-bounce"
                      size="1rem"
                      class="ml-3"
                  /></span>
                  {{ newRecipe.servings ? newRecipe.servings : "" }}
                </div>
                <div>
                  <b>{{
                    isLoadingRecipes || newRecipe.calories ? "Servings:" : ""
                  }}</b>
                  <span v-if="isLoadingRecipes && !newRecipe.calories"
                    ><Icon
                      name="svg-spinners:3-dots-bounce"
                      size="1rem"
                      class="ml-3"
                  /></span>
                  {{ newRecipe.calories ? newRecipe.calories : "" }}
                </div>
              </div>
            </div>
            <p v-if="newRecipe.paragraph_description">
              {{ newRecipe.paragraph_description }}
            </p>
            <p v-else-if="!newRecipe.paragraph_description && isLoadingRecipes">
              <Icon
                name="svg-spinners:3-dots-bounce"
                size="1rem"
                class="ml-3"
              />
            </p>

            <div v-if="toggleDetails">
              <div>
                <h2
                  class="mt-8 mb-4"
                  v-if="formattedIngredients.length || isLoadingRecipes"
                >
                  Ingredients
                </h2>
                <Icon
                  v-if="!formattedIngredients.length && isLoadingRecipes"
                  name="svg-spinners:3-dots-bounce"
                  size="2rem"
                  class="ml-3"
                />
                <ul class="list-disc ml-8">
                  <li v-for="ingredient in formattedIngredients">
                    {{ ingredient }}
                  </li>
                </ul>
              </div>
              <div>
                <h2
                  class="mt-8 mb-4"
                  v-if="formattedInstructions.length || isLoadingRecipes"
                >
                  Cooking Instructions
                </h2>
                <Icon
                  v-if="!formattedInstructions.length && isLoadingRecipes"
                  name="svg-spinners:3-dots-bounce"
                  size="2rem"
                  class="ml-3"
                />
                <ol class="list-decimal ml-8">
                  <li v-for="instruction in formattedInstructions">
                    {{ instruction }}
                  </li>
                </ol>
              </div>

              <div>
                <h2
                  class="mt-8 mb-4"
                  v-if="formattedNotes.length || isLoadingRecipes"
                >
                  Cooking Notes
                </h2>
                <Icon
                  v-if="!formattedNotes.length && isLoadingRecipes"
                  name="svg-spinners:3-dots-bounce"
                  size="2rem"
                  class="ml-3"
                />
                <ul class="list-disc ml-8">
                  <li v-for="note in formattedNotes">
                    {{ note }}
                  </li>
                </ul>
              </div>

              <div>
                <h2
                  class="mt-8 mb-4"
                  v-if="newRecipe.beer_pairing || isLoadingRecipes"
                >
                  Beer, Wine, & Cocktail Pairings
                </h2>
                <Icon
                  v-if="!newRecipe.beer_pairing && isLoadingRecipes"
                  name="svg-spinners:3-dots-bounce"
                  size="2rem"
                  class="ml-3"
                />
                <ul class="list-disc ml-8" v-if="newRecipe.beer_pairing">
                  <li v-if="newRecipe.beer_pairing">
                    <b>Beer Pairing:</b> {{ newRecipe.beer_pairing }}
                  </li>
                  <div v-else-if="!newRecipe.beer_pairing && isLoadingRecipes">
                    <Icon
                      name="svg-spinners:3-dots-bounce"
                      size="1rem"
                      class="ml-3"
                    />
                  </div>
                  <li v-if="newRecipe.wine_pairing">
                    <b>Wine Pairing:</b> {{ newRecipe.wine_pairing }}
                  </li>
                  <div v-else-if="!newRecipe.wine_pairing && isLoadingRecipes">
                    <Icon
                      name="svg-spinners:3-dots-bounce"
                      size="1rem"
                      class="ml-3"
                    />
                  </div>
                  <li v-if="newRecipe.cocktail_pairing">
                    <b>Cocktail Pairing:</b> {{ newRecipe.cocktail_pairing }}
                  </li>
                  <div
                    v-else-if="!newRecipe.cocktail_pairing && isLoadingRecipes"
                  >
                    <Icon
                      name="svg-spinners:3-dots-bounce"
                      size="1rem"
                      class="ml-3"
                    />
                  </div>
                </ul>
              </div>
            </div>
          </div>

          <!-- Insert recipe from strapi -->
          <div v-else>
            <div>
              <h1
                @click="toggleDetails = !toggleDetails"
                class="mb-4 cursor-pointer text-brand-500"
              >
                {{ existingRecipeData.recipe_name }}
              </h1>

              <div class="mt-6 mb-5">
                <div class="flex gap-5 mt-2">
                  <div v-if="newRecipe.prep_time">
                    <Icon name="bx:time" class="icon-style" />
                  </div>
                  <div><b>Prep:</b> {{ existingRecipeData.prep_time }}</div>
                  <div><b>Cook:</b> {{ existingRecipeData.cook_time }}</div>
                  <div><b>Totalk:</b> {{ existingRecipeData.total_time }}</div>
                </div>
                <div class="flex gap-5 mt-2">
                  <div v-if="newRecipe.servings">
                    <Icon name="mdi:silverware" class="icon-style" />
                  </div>
                  <div><b>Servings:</b> {{ existingRecipeData.servings }}</div>
                  <div><b>Calories:</b> {{ existingRecipeData.calories }}</div>
                </div>
              </div>
              <p>
                {{ existingRecipeData.paragraph_description }}
              </p>

              <div v-if="toggleDetails">
                <div>
                  <h2 class="mt-8 mb-4">Ingredients</h2>

                  <ul class="list-disc ml-8">
                    <li v-for="ingredient in existingFormattedIngredients">
                      {{ ingredient }}
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 class="mt-8 mb-4">Cooking Instructions</h2>

                  <ol class="list-decimal ml-8">
                    <li v-for="instruction in existingFormattedInstructions">
                      {{ instruction }}
                    </li>
                  </ol>
                </div>

                <div>
                  <h2 class="mt-8 mb-4">Cooking Notes</h2>

                  <ul class="list-disc ml-8">
                    <li v-for="note in existingFormattedNotes">
                      {{ note }}
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 class="mt-8 mb-4">Beer, Wine, & Cocktail Pairings</h2>

                  <ul class="list-disc ml-8">
                    <li>
                      <b>Beer Pairing:</b> {{ existingRecipeData.beer_pairing }}
                    </li>
                    <li>
                      <b>Wine Pairing:</b> {{ existingRecipeData.wine_pairing }}
                    </li>
                    <li>
                      <b>Cocktail Pairing:</b>
                      {{ existingRecipeData.cocktail_pairing }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <!--

            <div class="mt-6">
              <div class="flex gap-5 mt-2">
                <div>
                  <Icon name="bx:time" class="icon-style" />
                </div>
                <div><b>Prep:</b> {{ recipe?.prep_time }}</div>
                <div><b>Cook:</b> {{ recipe?.cook_time }}</div>
                <div><b>Total:</b> {{ recipe?.total_time }}</div>
              </div>
              <div class="flex gap-5 mt-2">
                <div>
                  <Icon name="mdi:silverware" class="icon-style" />
                </div>
                <div><b>Servings:</b> {{ recipe?.servings }}</div>
                <div><b>Calories:</b> {{ recipe?.calories }}</div>
              </div>
            </div>

            <div v-if="visibleDetails.includes(recipeIndex)">
              <h2 class="mt-8 mb-4">Ingredients</h2>
              <ul class="list-disc ml-5 mb-10">
                <li
                  v-for="(ingredient, ingredientIndex) in formattedIngredients[
                    recipeIndex
                  ]"
                  :key="`ingredient-${ingredientIndex}`"
                >
                  {{ ingredient }}
                </li>
              </ul>

              <h2 class="mt-5 mb-4">Instructions</h2>
              <ol class="ml-2 mb-10">
                <li
                  v-for="(
                    instruction, instructionIndex
                  ) in formattedInstructions[recipeIndex]"
                  :key="`instruction-${instructionIndex}`"
                >
                  {{ instruction }}
                </li>
              </ol>

              <h2 class="mt-5 mb-4">Cooking Notes</h2>
              {{ recipe.cooking_notes }}

              <h2 class="mt-10 mb-4">Beer / Wine / Cocktail Pairings</h2>
              {{ recipe.alcohol }}
              <div class="flex gap-5 mt-8">
                <div><b>Course:</b> {{ recipe?.course }}</div>
                <div><b>Cuisine:</b> {{ recipe?.cuisine_type }}</div>
              </div>
            </div>
            -->
          </div>
        </div>
        <SignUpOffer v-if="!user" />
        <MembershipOffer v-if="user && !paidMemberTierOne" />
        <LatestRecipes />
      </div>
    </div>
  </div>
</template>

<script setup>
import { slugify } from "~/utils/slugify.js";
import swalMixins from "~/mixins/swalMixins";
const { Toast } = swalMixins.data();

import {
  realCredits,
  decrementCredits,
  updateCreditsOnMounted,
} from "~/composables/useCredits.js";

const showFilters = ref(false);
const showCourseOptions = ref(false);
const selectedCourseOption = ref("Any");
const showCuisineOptions = ref(false);
const showDifficultyOptions = ref(false);
const selectedDifficultyOption = ref("Any");
const showDietOptions = ref(false);
const dietOption = ref("");
const cuisineOption = ref("");
const ingredientInput = ref("");

const showImagination = ref(false);
const paidMemberTierOne = ref(false);

const toggleDetails = ref(true);

const user = useStrapiUser();

const { create, update, find } = useStrapi();

const isLoadingRecipes = ref(false);
const credits = ref(0);

const controller = new AbortController();
const { signal } = controller;

/* Test data
const data = ref({
  recipes: [
    {
      recipe_number: "1",
      recipe_name: "Coq au Vin",
      prep_time: "20 minutes",
      cook_time: "1 hour 30 minutes",
      total_time: "1 hour 50 minutes",
      servings: "4",
      calories: "420",
      short_description:
        "Coq au Vin is a classic French dish that features tender chicken braised in red wine, bacon, and aromatic vegetables. This rich and flavorful dish is perfect for a gourmet dinner.",
      ingredients: [
        "4 chicken legs or thighs\n- 4 slices of bacon, diced\n- 1 onion, chopped\n- 2 carrots, chopped\n- 2 garlic cloves, minced\n- 8 ounces mushrooms, sliced\n- 2 cups red wine\n- 1 cup chicken broth\n- 2 tablespoons tomato paste\n- 2 teaspoons fresh thyme leaves\n- Salt and pepper, to taste\n- 2 tablespoons all-purpose flour\n- 2 tablespoons butter\n- Fresh parsley, chopped (for garnish)",
      ],
      cooking_instructions:
        "1. In a large skillet, cook the bacon over medium heat until crispy. Remove the bacon and set aside, leaving the bacon fat in the skillet.\n2. Season the chicken with salt and pepper, then brown it in the skillet with the bacon fat over medium-high heat. Remove the chicken and set aside.\n3. In the same skillet, sauté the onion, carrots, garlic, and mushrooms until softened.\n4. Stir in the tomato paste and cook for an additional minute.\n5. Slowly add the red wine and chicken broth, stirring well to combine.\n6. Return the chicken and bacon to the skillet, and sprinkle with thyme leaves.\n7. Cover the skillet and simmer for about 1 hour, or until the chicken is cooked through and tender.\n8. In a small bowl, mix together the flour and butter to form a paste. Stir this paste into the skillet and cook for another 10 minutes, or until the sauce thickens.\n9. Serve the Coq au Vin over mashed potatoes or crusty bread, and garnish with fresh parsley.",
      cooking_notes:
        "- For best results, use a good quality red wine such as Burgundy or Pinot Noir.\n- This dish tastes even better when prepared a day in advance and reheated before serving.",
      course: "Main Course",
      cuisine_type: "French",
    },
    {
      recipe_number: "2",
      recipe_name: "Chicken Piccata",
      prep_time: "15 minutes",
      cook_time: "15 minutes",
      total_time: "30 minutes",
      servings: "4",
      calories: "380",
      short_description:
        "Chicken Piccata is an elegant Italian dish made with tender chicken cutlets cooked in a tangy, lemony sauce. This gourmet recipe is quick and easy to make, yet it's bursting with bright and fresh flavors.",
      ingredients: [
        "4 chicken cutlets\n- Salt and pepper, to taste\n- 1/2 cup all-purpose flour\n- 2 tablespoons olive oil\n- 2 tablespoons butter\n- 1/4 cup lemon juice\n- 1/2 cup chicken broth\n- 2 tablespoons capers, drained\n- 2 tablespoons fresh parsley, chopped",
      ],
      cooking_instructions:
        "1. Season the chicken cutlets with salt and pepper, then dredge them in flour, shaking off any excess.\n2. In a large skillet, heat the olive oil and butter over medium-high heat.\n3. Add the chicken cutlets to the skillet and cook for about 3-4 minutes per side, until golden brown.\n4. Remove the chicken from the skillet and set aside.\n5. In the same skillet, add the lemon juice, chicken broth, and capers. Bring the mixture to a simmer and cook for a couple of minutes to let the flavors meld together.\n6. Return the chicken to the skillet and cook for an additional 2-3 minutes, until the sauce has thickened slightly.\n7. Sprinkle the chicken piccata with fresh parsley and serve immediately.",
      cooking_notes:
        "- Serve the chicken piccata with pasta, rice, or a side of roasted vegetables for a complete meal.\n- Add a splash of white wine to the sauce for an extra layer of complexity.",
      course: "Main Course",
      cuisine_type: "Italian",
    },
    {
      recipe_number: "3",
      recipe_name: "Moroccan Chicken Tagine",
      prep_time: "20 minutes",
      cook_time: "1 hour 30 minutes",
      total_time: "1 hour 50 minutes",
      servings: "4",
      calories: "420",
      short_description:
        "Moroccan Chicken Tagine is a fragrant and exotic dish that combines tender chicken with warm spices, sweet dried fruits, and savory olives. This gourmet recipe will transport your taste buds to the vibrant streets of Morocco.",
      ingredients: [
        "4 chicken thighs\n- Salt and pepper, to taste\n- 2 tablespoons olive oil\n- 1 onion, finely chopped\n- 2 garlic cloves, minced\n- 1 teaspoon ground cumin\n- 1 teaspoon ground coriander\n- 1 teaspoon ground ginger\n- 1/2 teaspoon ground cinnamon\n- 1/2 teaspoon turmeric\n- 1/2 teaspoon paprika\n- 1/4 teaspoon cayenne pepper (optional)\n- 1 cup chicken broth\n- 1/2 cup dried apricots, halved\n- 1/2 cup pitted green olives\n- 2 tablespoons fresh cilantro, chopped",
      ],
      cooking_instructions:
        "1. Season the chicken thighs with salt and pepper.\n2. Heat the olive oil in a tagine or a large skillet over medium heat.\n3. Brown the chicken thighs on all sides, then remove them from the skillet and set aside.\n4. In the same skillet, sauté the onion and garlic until softened.\n5. Add the cumin, coriander, ginger, cinnamon, turmeric, paprika, and cayenne pepper (if using), stirring well to coat the onions and garlic.\n6. Pour in the chicken broth and bring the mixture to a simmer.\n7. Return the chicken thighs to the skillet, cover, and cook for about 1 hour, or until the chicken is tender and cooked through.\n8. Add the dried apricots and green olives to the skillet and continue cooking for 15 minutes, allowing the flavors to meld together.\n9. Sprinkle the Moroccan Chicken Tagine with fresh cilantro before serving.",
      cooking_notes:
        "- Serve the tagine with couscous or warm crusty bread to soak up the flavorful sauce.\n- Feel free to add other dried fruits such as raisins or prunes for extra sweetness.",
      course: "Main Course",
      cuisine_type: "Moroccan",
    },
  ],
});
*/

onMounted(() => {
  loadUserData();
  updateCreditsOnMounted();
  checkCredits();
  loadRecipes();
});

const data = ref([]);
const recipes = ref([]);
const userData = ref([]);
const freeCreditsLeft = ref(0);

const createRecipesError = ref("");

const fullRecipe = ref("");

let isError = false;

async function loadUserData() {
  try {
    // Await the async call to resolve the Promise
    const response = await find("userdatas", {
      populate: ["recipes", "owner"],
      filters: {
        owner: user.value?.id,
      },
    });
    // Once the data is retrieved, update the userData ref with the result
    userData.value = response.data; // Correctly update the ref value here
    freeCreditsLeft.value = userData.value[0].attributes.freeCreditsLeft;
    console.log("freeCreditsLeft", freeCreditsLeft.value);
  } catch (e) {
    console.error("Failed to load user data:", e);
  }
}

function loadRecipes() {
  const storedRecipes = localStorage.getItem("recipes");
  try {
    // Initialize recipes.value as an array regardless of localStorage contents
    recipes.value = []; // Default to an empty array

    if (storedRecipes) {
      // Parse the stored string back into an object
      const parsedObject = JSON.parse(storedRecipes);

      // Check if the parsed object has a 'recipes' property that is an array
      if (parsedObject && Array.isArray(parsedObject.recipes)) {
        // Set the 'recipes' ref to the 'recipes' array from the parsed object
        recipes.value = parsedObject.recipes;
      }
    }
  } catch (e) {
    console.error("Failed to parse recipes from localStorage:", e);
  }
}

const newRecipe = ref({});

const fetchRecipes = async () => {
  createRecipesError.value = false;
  existingRecipeData.value = false;
  if ((!user.value && realCredits.value <= 0) || freeCreditsLeft.value <= 0) {
    console.log("No credits left!");
    Toast.fire({
      icon: "error",
      title: "You're out of credits!",
      text: "Please sign up for more credits.",
    });
    return;
  }
  isLoadingRecipes.value = true;
  newRecipe.value = {};
  // Transform 'value' strings to match expected API format if needed
  // Example: 'courseBreakfast' to 'Breakfast'
  const course = selectedCourseOption.value.replace("course", "") || "Any";
  const cuisine = cuisineOption.value || "Any";
  const difficulty = selectedDifficultyOption.value || "Any";
  const diet = dietOption.value || "Any";
  const uniqueness = String(sliderValue.value) || "3";

  // Format ingredients as an array of strings
  const ingredients = ingredientInput.value
    .split(",")
    .map((ingredient) => ingredient.trim());

  // Construct the payload object to match RecipeRequest model in Python
  const payload = {
    ingredients: ingredients || "Any",
    course: course === "Any" ? "Any" : course,
    cuisine: cuisine || "Any",
    difficulty: difficulty === "Any" ? "Any" : difficulty,
    diet: diet === "Any" ? "Any" : diet,
    uniqueness: uniqueness,
  };

  let receivedChunks = "";
  let reader;

  // Function to recursively read from the stream
  const processStream = async () => {
    const { value, done } = await reader.read();
    if (done) {
      if (!isError) {
        processChunk(receivedChunks); // Process the last chunk
        updateUIAfterStream();
      }
      isLoadingRecipes.value = false;
      console.log("Finished receiving stream.");
      return;
    }

    // Decode received chunk
    receivedChunks += new TextDecoder().decode(value, { stream: true });

    // Check for new lines indicating end of JSON objects
    const parts = receivedChunks.split("\n");
    // Leave any incomplete chunk in the buffer
    receivedChunks = parts.pop();

    // Process each complete chunk
    parts.forEach((part) => {
      if (part) {
        //console.log("Part: ", part);
        processChunk(part); // Process each complete chunk
      }
    });

    // Continue processing the next part of the stream
    processStream();
  };

  try {
    const response = await fetch("http://localhost:8000/get-recipes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Handle streaming responses
    reader = response.body.getReader();

    // Start processing the stream
    processStream();
  } catch (error) {
    console.error("Error during fetch:", error);
    isLoadingRecipes.value = false;
    createRecipesError.value =
      "An error has occurred. Please try to create another recipe.";
  }
};

const existingRecipeData = ref("");
const existingRecipe = ref(null);

// Helper function to process a complete chunk
const processChunk = async (chunk) => {
  try {
    const data = JSON.parse(chunk);
    if (data.error) {
      console.error("Error in chunk:", data.error);
      isError = true; // Set the error flag
      isLoadingRecipes.value = false;
      createRecipesError.value =
        "An error has occurred. Please try to create another recipe.";
      return; // Skip processing this chunk
    }

    console.log("data: ", data);

    if (data.recipe_name) {
      console.log("data.recipe_name found from GPT: ", data.recipe_name);
      // Slugify the title from OpenAI's response
      const titleSlug = slugify(data.recipe_name); // Assuming data has a title field
      console.log(
        "Attempt to fetch the existing recipe from Strapi with uid: ",
        titleSlug
      );
      // Attempt to fetch the existing recipe from Strapi
      existingRecipe.value = await fetchExistingRecipeFromStrapi(titleSlug);
      console.log("existingRecipe.value: ", existingRecipe.value);
    }

    if (existingRecipe.value) {
      console.log("Recipe already exists in Strapi. Using existing recipe.");
      controller.abort();
      existingRecipeData.value = existingRecipe.value; // Use the existing recipe from Strapi
      isLoadingRecipes.value = false;
      updateLocalStorage();
      loadRecipes();
      decrementLoggedInCredits();
      return;
    } else {
      // If the recipe does not exist in Strapi, use the OpenAI generated recipe
      Object.assign(newRecipe.value, data);
    }
  } catch (e) {
    isLoadingRecipes.value = false;
    console.error("Error parsing chunk:", chunk, e);
    createRecipesError.value =
      "An error has occurred. Please try to create another recipe.";
    // Handle parsing error or ignore the chunk
  }
};

const fetchExistingRecipeFromStrapi = async (slug) => {
  try {
    const response = await fetch(
      `http://localhost:1337/api/recipes?filters[uid][$eq]=${slug}`
    );
    console.log("Response value:", response);
    const recipes = await response.json();

    // This is working!!!

    let recipesLength;

    if (recipes.data[0]) {
      recipesLength = true;
    }

    console.log("Recipes.length? ", recipesLength);

    console.log("Response data attributes:", recipes.data[0].attributes);
    return recipesLength ? recipes.data[0].attributes : null;
  } catch (error) {
    console.error("Error fetching recipe from Strapi:", error);
    return null;
  }
};

// Call this function to update UI and local storage after the stream ends
const updateUIAfterStream = () => {
  if (isError) {
    return;
  }
  updateLocalStorage();
  createRecipes();
  loadRecipes();
  decrementLoggedInCredits();
  //let recipeObject = parseFullRecipeText(newRecipe.value.full_recipe);
  //fullRecipe.value.push(recipeObject);
};

function updateLocalStorage() {
  // Combine the existing recipes with the new ones
  const existingRecipesStorage = localStorage.getItem("recipes");
  const existingRecipes = existingRecipesStorage
    ? JSON.parse(existingRecipesStorage).recipes
    : [];

  let updatedRecipes;

  if (!existingRecipe.value) {
    updatedRecipes = existingRecipes.concat(newRecipe.value);
  } else {
    console.log(
      "Updating local storage with existing recipe",
      existingRecipe.value
    );
    updatedRecipes = existingRecipes.concat(existingRecipe.value);
  }

  // Store the updated array back into localStorage
  localStorage.setItem("recipes", JSON.stringify({ recipes: updatedRecipes }));
  console.log("Updated recipes in localStorage:", updatedRecipes);

  // Update your reactive property to trigger the UI update
  data.value = { recipes: updatedRecipes };
}

// Computed property to create a list of ingredients from the string
const formattedIngredients = computed(() => {
  if (!newRecipe.value.ingredients) {
    return [];
  }
  // Split the ingredients string into an array, trim each item to remove extra spaces
  return newRecipe.value.ingredients
    .split(/(?<=^|\s)-\s*/)
    .map((ingredient) => ingredient.trim())
    .filter(Boolean);
});

// Computed property to create a list of ingredients from the string
const existingFormattedIngredients = computed(() => {
  if (!existingRecipeData.value.ingredients) {
    return [];
  }
  // Split the ingredients string into an array, trim each item to remove extra spaces
  return existingRecipeData.value.ingredients
    .split(/(?<=^|\s)-\s*/)
    .map((ingredient) => ingredient.trim())
    .filter(Boolean);
});

const formattedNotes = computed(() => {
  if (!newRecipe.value.cooking_notes) {
    return [];
  }
  // Split the ingredients string into an array, trim each item to remove extra spaces
  return newRecipe.value.cooking_notes
    .split("-")
    .map((note) => note.trim())
    .filter(Boolean);
});

const existingFormattedNotes = computed(() => {
  if (!existingRecipeData.value.cooking_notes) {
    return [];
  }
  // Split the ingredients string into an array, trim each item to remove extra spaces
  return existingRecipeData.value.cooking_notes
    .split("-")
    .map((note) => note.trim())
    .filter(Boolean);
});

// Computed property to create a list of instructions from the string
const formattedInstructions = computed(() => {
  if (!newRecipe.value.cooking_instructions) {
    return [];
  }
  // Split the instructions into steps based on number patterns
  return newRecipe.value.cooking_instructions
    .split(/\d+\./)
    .map((step) => step.trim())
    .filter(Boolean);
});

const existingFormattedInstructions = computed(() => {
  if (!existingRecipeData.value.cooking_instructions) {
    return [];
  }
  // Split the instructions into steps based on number patterns
  return existingRecipeData.value.cooking_instructions
    .split(/\d+\./)
    .map((step) => step.trim())
    .filter(Boolean);
});

// Function to check for credits in local storage or initialize them
function checkCredits() {
  const savedCredits = localStorage.getItem("ec_credits");
  if (savedCredits !== null) {
    credits.value = parseInt(savedCredits, 10);
  } else {
    credits.value = 10; // Initialize with 10 credits for anonymous users
    localStorage.setItem("ec_credits", credits.value.toString());
  }
}

// Function to decrement logged-in freeCreditsLeft
async function decrementLoggedInCredits() {
  console.log("Decrementing strapi");
  // Check if userData is populated and has a freeCreditsLeft value
  if (userData.value && userData.value[0].attributes.freeCreditsLeft > 0) {
    console.log("More than 0");
    try {
      console.log("Updating userdata: ", userData.value[0].id);
      await update("userdatas", userData.value[0].id, {
        freeCreditsLeft: userData.value[0].attributes.freeCreditsLeft - 1,
      });
      // If the update is successful, manually decrement the local value too
      //userData[0].attributes.attributes.freeCreditsLeft -= 1;
    } catch (error) {
      console.error("Failed to update credits:", error);
    }
  }
  await loadUserData();
}

// Slider for Uniquness Level
const slider = ref(null);
const sliderValue = ref(2); // Default value

const updateSliderFill = () => {
  if (slider.value) {
    const value =
      ((sliderValue.value - slider.value.min) /
        (slider.value.max - slider.value.min)) *
      100;
    slider.value.style.background = `linear-gradient(to right, #009688 0%, #009688 ${value}%, #ddd ${value}%, #ddd 100%)`;
  }
};

// Update the slider fill color whenever the sliderValue changes
watch(sliderValue, updateSliderFill, { immediate: true });

const createRecipes = async () => {
  const creationPromises = [];

  if (newRecipe.value?.cooking_instructions?.startsWith(" ")) {
    newRecipe.value.cooking_instructions =
      newRecipe.value.cooking_instructions.trim();
  }

  creationPromises.push(
    create("recipes", {
      recipe_name: newRecipe.value.recipe_name,
      paragraph_description: newRecipe.value.paragraph_description,
      prep_time: newRecipe.value.prep_time,
      cook_time: newRecipe.value.cook_time,
      total_time: newRecipe.value.total_time,
      servings: newRecipe.value.servings,
      calories: newRecipe.value.calories,
      ingredients: newRecipe.value.ingredients, // Use the joined string for ingredients
      cooking_instructions: newRecipe.value.cooking_instructions,
      cooking_notes: newRecipe.value.cooking_notes,
      course: newRecipe.value.course,
      cuisine: newRecipe.value.cuisine_type,
      beer_pairing: newRecipe.value.beer_pairing,
      wine_pairing: newRecipe.value.wine_pairing,
      cocktail_pairing: newRecipe.value.cocktail_pairing,
    })
      .then((result) => {
        console.log(`Recipe created:`, result);
        return result;
      })
      .catch((error) => {
        console.error(`Error creating recipe ${recipe.recipe_name}:`, error);
        throw error;
      })
  );

  try {
    const createdRecipes = await Promise.all(creationPromises);
    console.log(`All recipes created successfully:`, createdRecipes);
    return createdRecipes;
  } catch (error) {
    console.error(`An error occurred during recipe creation:`, error);
  }
};
</script>

<style scoped>
.nav {
  @apply xl:flex gap-2 mb-4 mt-5;
}
.nav li {
  @apply px-0 py-2;
}
.nav li button {
  @apply border dark:border-midnight-200 rounded-lg px-3 py-1;
}
.router-link-active {
  @apply text-blue-600 font-normal dark:bg-midnight-900;
}
.nav label {
  @apply text-lg font-medium px-3 pb-1 pt-[2px] border rounded-lg dark:border-midnight-200 my-2 bg-white dark:bg-midnight-800;
}
label {
  @apply text-lg font-bold inline-block;
}
input {
  @apply text-lg;
}

.search-filter {
  @apply py-2;
}

.segment-spacing > div:first-child {
  @apply mb-6;
}

label.block {
  @apply my-3;
}
.slide-down {
  position: relative;
  top: 0px; /* Initial position above the viewport */
  animation: slideDown 0.25s forwards; /* Animation to slide down */
}
.slide-down label {
  @apply cursor-pointer;
}

@keyframes slideDown {
  from {
    top: -10px;
  }
  to {
    top: 0;
  }
}

.custom-radio {
  user-select: none;
  @apply relative pl-[30px] pr-[20px] cursor-pointer text-lg block xl:inline-block;
}

.custom-radio input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.radio-circle {
  position: absolute;
  top: 4px;
  left: 0;
  height: 20px;
  width: 20px;
  @apply bg-slate-700;
  border: 1px solid #ccc;
  border-radius: 50%;
}

.custom-radio:hover input ~ .radio-circle {
  @apply bg-slate-400;
}

.custom-radio input:checked ~ .radio-circle {
  background-color: #00866d;
  border-color: #00866d;
}

.radio-circle:after {
  content: "";
  position: absolute;
  display: none;
  top: 4px;
  left: 4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: white;
}

.custom-radio input:checked ~ .radio-circle:after {
  display: block;
}
.custom-checkbox {
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  font-size: 18px;
  user-select: none;
  border-radius: 4px;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 1px;
  left: 0;
  height: 20px;
  width: 20px;
  @apply bg-slate-700;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.custom-checkbox:hover input ~ .checkmark {
  @apply bg-slate-400;
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: #00866d;
  border-color: #00866d;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

.custom-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.slider-container {
  width: 100%;
  margin: 1rem 0 2rem 0;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 12px;
  border-radius: 5px;
  @apply bg-slate-300;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 6px;
  @apply bg-brand-500;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 6px;
  @apply bg-brand-500;
  cursor: pointer;
}

.slider-label {
  display: block;
  text-align: center;
  margin-top: 0.5rem;
}

::placeholder {
  @apply italic;
}
</style>
