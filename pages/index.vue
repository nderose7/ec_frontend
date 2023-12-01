<template>
  <div class="lg:flex h-full">
    <RecipesLoggedIn
      v-if="user"
      :triggerUpdate="triggerUpdate"
      class="hidden lg:block w-full"
    />
    <Recipes v-else :recipes="recipes" class="hidden lg:block w-full" />
    <div class="w-full px-5 xl:px-10 pb-48 min-[1600px]:flex gap-10">
      <div class="recipe-search w-full xl:px-16">
        <div class="text-center mb-10 lg:pt-12 pt-4">
          <h1 class="text-center mb-5 mt-5 xl:text-5xl dark:text-slate-300">
            Insanely good recipes in an instant.
          </h1>
          <p class="lead">
            Create unique recipes from any idea, ingredient, region, or dietary
            need.
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
            <div v-if="showCourseOptions" class="mb-0 m-2">
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
                Main / Dinner
              </label>

              <label class="custom-radio">
                <input
                  type="radio"
                  v-model="selectedCourseOption"
                  value="courseAppetizers"
                />
                <span class="radio-circle"></span>
                Appetizer
              </label>
              <label class="custom-radio">
                <input
                  type="radio"
                  v-model="selectedCourseOption"
                  value="courseSide"
                />
                <span class="radio-circle"></span>
                Side
              </label>

              <label class="custom-radio">
                <input
                  type="radio"
                  v-model="selectedCourseOption"
                  value="courseDessert"
                />
                <span class="radio-circle"></span>
                Dessert
              </label>
            </div>
            <div v-if="showCourseOptions" class="mx-2">
              <label class="custom-radio">
                <input
                  type="radio"
                  v-model="selectedCourseOption"
                  value="courseCocktail"
                />
                <span class="radio-circle"></span>
                Cocktail
              </label>
              <label class="custom-radio">
                <input
                  type="radio"
                  v-model="selectedCourseOption"
                  value="courseMocktail"
                />
                <span class="radio-circle"></span>
                Mocktail
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
            <div v-if="showDifficultyOptions" class="md:flex gap-4 mb-3 mx-2">
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
                  :name="showImagination ? 'bx:minus' : 'bx:plus'"
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
          @submit.prevent="fetchRecipeTitle"
          class="search-bar form-control mt-5 mb-0 min-[1600px]:px-32"
        >
          <div class="flex w-full items-center">
            <div class="w-full relative">
              <input
                type="text"
                placeholder="Create a recipe..."
                class="rounded-l-lg outline-0 ingredient-input"
                v-model="ingredientInput"
                ref="inputRef"
              />

              <div class="scroll-target mt-1"></div>
              <div v-if="ingredientInput">
                <button
                  type="button"
                  class="absolute right-2 top-3 text-brand-500"
                  @click="clearAllFilters()"
                >
                  <Icon name="bx:x" class="icon-style" size="2rem" />
                </button>
              </div>
            </div>
            <div>
              <button
                type="submit"
                class="bg-brand-500 text-white mb-2 rounded-r-lg border-brand-500 border-r border-t border-b inline-block py-3"
              >
                <div class="px-4">
                  <Icon
                    name="mdi:arrow-right"
                    class="icon-style text-white"
                    size="1.5rem"
                  />
                </div>
              </button>
            </div>
          </div>
        </form>
        <div class="xl:pb-12 pb-10">
          <div class="min-[1600px]:px-32 flex justify-between">
            <div class="w-full">
              <SearchSuggestions />
            </div>
            <div
              class="text-base font-medium text-right pb-3 pt-1 md:pt-1 w-2/3"
            >
              <span class="pl-1"
                ><span v-if="user && !user.paidMembershipTierThree"
                  ><b>{{ freeCreditsLeft }}</b>
                  {{ user.freeAccount ? "free" : "" }} credits left</span
                >
                <CreditsAnon v-else-if="!user" />
              </span>
            </div>
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
        </div>
        <div
          v-if="isLoadingRecipes"
          class="mb-5 px-5 xl:px-0 pl-1 min-[1600px]:px-32"
        >
          <b>Creating your recipe...</b>
          <Icon name="svg-spinners:3-dots-bounce" size="2rem" class="ml-3" />
          <div class="mt-2">
            <Adsbygoogle />
          </div>
        </div>

        <div class="min-[1600px]:px-32 pb-12">
          <div v-if="!existingRecipeData" class="">
            <div v-if="!isLoadingRecipes && showAds" class="mt-2">
              <Adsbygoogle />
            </div>
            <div class="lg:flex items-top justify-between gap-16">
              <div class="lg:order-2 lg:w-1/3 text-center mb-5 lg:mb-0">
                <img
                  v-if="newRecipe.image_url"
                  :src="newRecipe.image_url"
                  class="lg:max-w-full rounded-lg cropped-image"
                />
                <Icon
                  v-if="!newRecipe.image_url && isLoadingRecipes"
                  name="svg-spinners:blocks-wave"
                  size="4rem"
                  class="ml-3 text-slate-300 dark:text-midnight-200"
                />
              </div>
              <div class="lg:w-2/3">
                <h1
                  @click="toggleDetails = !toggleDetails"
                  class="mb-4 cursor-pointer text-brand-500 leading-tight"
                >
                  {{ newRecipe.recipe_name }}
                </h1>

                <div class="md:flex gap-5 mt-6">
                  <div v-if="newRecipe.course" class="hidden md:block">
                    <Icon name="mdi:earth" class="icon-style" size="" />
                  </div>
                  <div>
                    <b>{{
                      isLoadingRecipes || newRecipe.course ? "Course:" : ""
                    }}</b>
                    <span v-if="isLoadingRecipes && !newRecipe.course"
                      ><Icon
                        name="svg-spinners:3-dots-bounce"
                        size="1rem"
                        class="ml-3"
                    /></span>
                    {{ newRecipe.course ? newRecipe.course : "" }}
                  </div>
                  <div>
                    <b>{{
                      isLoadingRecipes || newRecipe.cuisine_type
                        ? "Cuisine:"
                        : ""
                    }}</b>
                    <span v-if="isLoadingRecipes && !newRecipe.cuisine_type"
                      ><Icon
                        name="svg-spinners:3-dots-bounce"
                        size="1rem"
                        class="ml-3"
                    /></span>
                    {{ newRecipe.cuisine_type ? newRecipe.cuisine_type : "" }}
                  </div>
                </div>

                <div class="mt-2 mb-5">
                  <div class="md:flex gap-5 mt-2">
                    <div v-if="newRecipe.prep_time" class="hidden md:block">
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
                  <div class="md:flex gap-5 mt-2">
                    <div v-if="newRecipe.servings" class="hidden md:block">
                      <Icon name="mdi:silverware" class="icon-style" />
                    </div>
                    <div>
                      <b>{{
                        isLoadingRecipes || newRecipe.servings
                          ? "Servings:"
                          : ""
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
                        isLoadingRecipes || newRecipe.calories
                          ? "Calories:"
                          : ""
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
                  <div
                    v-if="
                      newRecipe.diet_type_if_set &&
                      newRecipe.diet_type_if_set != 'None' &&
                      newRecipe.diet_type_if_set != 'N/A' &&
                      newRecipe.diet_type_if_set != 'NA' &&
                      newRecipe.diet_type_if_set != 'Not Available' &&
                      newRecipe.diet_type_if_set != 'n/a'
                    "
                    class="md:flex gap-5 mt-2"
                  >
                    <div class="hidden md:block">
                      <Icon
                        name="pepicons-pop:line-slant-up-circle"
                        class="icon-style p-[2px]"
                      />
                    </div>
                    <div>
                      <b>Diet:</b>
                      {{
                        newRecipe.diet_type_if_set
                          ? newRecipe.diet_type_if_set
                          : ""
                      }}
                    </div>
                  </div>
                </div>
                <p v-if="newRecipe.paragraph_description">
                  {{ newRecipe.paragraph_description }}
                </p>

                <p
                  v-else-if="
                    !newRecipe.paragraph_description && isLoadingRecipes
                  "
                >
                  <Icon
                    name="svg-spinners:3-dots-bounce"
                    size="1rem"
                    class="ml-3"
                  />
                </p>
              </div>
            </div>

            <div v-if="toggleDetails" class="xl:pb-16">
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
            <div class="lg:flex items-top justify-between gap-16">
              <div class="lg:order-2 lg:w-1/3 text-center mb-5 lg:mb-0">
                <img
                  v-if="existingRecipeData.attributes.image"
                  :src="`${existingRecipeData.attributes.image?.data?.attributes?.url}`"
                  class="lg:max-w-full rounded-lg cropped-image"
                />
                <Icon
                  v-if="
                    !existingRecipeData.attributes.image_url && isLoadingRecipes
                  "
                  name="svg-spinners:blocks-wave"
                  size="4rem"
                  class="ml-3 text-slate-300 dark:text-midnight-200"
                />
              </div>
              <div class="lg:w-2/3">
                <h1
                  @click="toggleDetails = !toggleDetails"
                  class="mb-4 cursor-pointer text-brand-500"
                >
                  {{ existingRecipeData.attributes.recipe_name }}
                </h1>

                <div class="md:flex gap-5 mt-6">
                  <div v-if="existingRecipeData.course" class="hidden md:block">
                    <Icon name="mdi:earth" class="icon-style" size="" />
                  </div>
                  <div>
                    <b>{{
                      isLoadingRecipes || existingRecipeData.course
                        ? "Course:"
                        : ""
                    }}</b>
                    <span v-if="isLoadingRecipes && !existingRecipeData.course"
                      ><Icon
                        name="svg-spinners:3-dots-bounce"
                        size="1rem"
                        class="ml-3"
                    /></span>
                    {{
                      existingRecipeData.course ? existingRecipeData.course : ""
                    }}
                  </div>
                  <div>
                    <b>{{
                      isLoadingRecipes || existingRecipeData.cuisine_type
                        ? "Cuisine:"
                        : ""
                    }}</b>
                    <span
                      v-if="
                        isLoadingRecipes && !existingRecipeData.cuisine_type
                      "
                      ><Icon
                        name="svg-spinners:3-dots-bounce"
                        size="1rem"
                        class="ml-3"
                    /></span>
                    {{
                      existingRecipeData.cuisine_type
                        ? existingRecipeData.cuisine_type
                        : ""
                    }}
                  </div>
                </div>

                <div class="mt-6 mb-5">
                  <div class="flex gap-5 mt-2">
                    <div v-if="existingRecipeData.attributes.prep_time">
                      <Icon name="bx:time" class="icon-style" />
                    </div>
                    <div>
                      <b>Prep:</b> {{ existingRecipeData.attributes.prep_time }}
                    </div>
                    <div>
                      <b>Cook:</b> {{ existingRecipeData.attributes.cook_time }}
                    </div>
                    <div>
                      <b>Total:</b>
                      {{ existingRecipeData.attributes.total_time }}
                    </div>
                  </div>
                  <div class="flex gap-5 mt-2">
                    <div v-if="existingRecipeData.attributes.servings">
                      <Icon name="mdi:silverware" class="icon-style" />
                    </div>
                    <div>
                      <b>Servings:</b>
                      {{ existingRecipeData.attributes.servings }}
                    </div>
                    <div>
                      <b>Calories:</b>
                      {{ existingRecipeData.attributes.calories }}
                    </div>
                  </div>
                </div>
                <p>
                  {{ existingRecipeData.attributes.paragraph_description }}
                </p>
              </div>
            </div>

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
                    <b>Beer Pairing:</b>
                    {{ existingRecipeData.attributes.beer_pairing }}
                  </li>
                  <li>
                    <b>Wine Pairing:</b>
                    {{ existingRecipeData.attributes.wine_pairing }}
                  </li>
                  <li>
                    <b>Cocktail Pairing:</b>
                    {{ existingRecipeData.attributes.cocktail_pairing }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <SignUpOffer v-if="!user" />
        <MembershipOffer v-if="user && !user.paidMembershipTierThree" />
        <LatestRecipes />
      </div>
    </div>
  </div>
</template>

<script setup>
import { globalState } from "../store/store.js";
import { slugify } from "~/utils/slugify.js";
import swalMixins from "~/mixins/swalMixins";
const { Toast } = swalMixins.data();

import {
  realCredits,
  decrementCredits,
  updateCreditsOnMounted,
} from "~/composables/useCredits.js";

const {
  public: { strapiURL },
} = useRuntimeConfig();

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
const triggerUpdate = ref(0);
const inputRef = ref(null);
const showAds = ref(false);

const showImagination = ref(false);
const paidMemberTierOne = ref(false);

const toggleDetails = ref(true);

const user = useStrapiUser();

const { create, update, find } = useStrapi();

const isLoadingRecipes = ref(false);
const credits = ref(0);

const controller = new AbortController();
const { signal } = controller;

onMounted(() => {
  if (user.value) {
    loadUserData();
  }
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

//const user_recipes = await find("user_recipes");

async function loadUserData() {
  if (user.value) {
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
      //console.log("freeCreditsLeft", freeCreditsLeft.value);
    } catch (e) {
      console.error("Failed to load user data:", e);
    }
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

const titleFromFetch = ref("");

const fetchRecipeTitle = async () => {
  showAds.value = true;
  createRecipesError.value = false;
  existingRecipeData.value = false;
  newRecipe.value = {};
  if (
    (!user.value && realCredits.value <= 0) ||
    (user.value && freeCreditsLeft.value <= 0)
  ) {
    if (user.value) {
      Toast.fire({
        icon: "error",
        title: "You're out of credits!",
        text: "Please upgrade or pay for more credits.",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "You're out of credits!",
        text: "Please sign up for more credits.",
      });
    }
    return;
  }
  isLoadingRecipes.value = true;
  const scrollTarget = document.querySelector(".scroll-target");
  if (scrollTarget) {
    scrollTarget.scrollIntoView({ behavior: "smooth" });
  }
  // Transform 'value' strings to match expected API format if needed
  // Example: 'courseBreakfast' to 'Breakfast'
  const course = selectedCourseOption.value.replace("course", "") || "Any";
  const cuisine = cuisineOption.value || "Any";
  const difficulty = selectedDifficultyOption.value || "Any";
  const diet = dietOption.value || "Any";
  const uniqueness = String(sliderValue.value) || "3";

  //console.log("IngredientInput: ", ingredientInput.value);

  // Format ingredients as an array of strings
  const ingredients = ingredientInput.value;

  //console.log("Ingredients: ", ingredients[0]);

  // Construct the payload object to match RecipeRequest model in Python
  const payload = {
    ingredients: ingredients === "" ? "Surprise me" : ingredients,
    course: course === "Any" ? "Any" : course,
    cuisine: cuisine || "Any",
    difficulty: difficulty === "Any" ? "Any" : difficulty,
    diet: diet === "Any" ? "Any" : diet,
    uniqueness: uniqueness,
  };

  try {
    const response = await fetch(
      "https://data.eatclassy.com/get-recipe-title/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    //console.log("response found from GPT: ", responseData);
    // Slugify the title from OpenAI's response
    titleFromFetch.value = responseData.recipe_name;
    const titleSlug = slugify(responseData.recipe_name); // Assuming data has a title field
    //console.log(
    //  "Attempt to fetch the existing recipe from Strapi with uid: ",
    //  titleSlug
    //);
    // Attempt to fetch the existing recipe from Strapi
    existingRecipe.value = await fetchExistingRecipeFromStrapi(titleSlug);
    //console.log("existingRecipe.value: ", existingRecipe.value);

    if (existingRecipe.value) {
      controller.abort();
      existingRecipeData.value = existingRecipe.value; // Use the existing recipe from Strapi
      /*console.log(
        "Recipe already exists in Strapi. Using existing recipe:",
        existingRecipeData.value
      );*/
      isLoadingRecipes.value = false;
      updateLocalStorage();
      loadRecipes();
      decrementLoggedInCredits();
      decrementCredits();
      /*console.log(
        "Trying to connect user to existing recipe with id",
        existingRecipeData.value.id
      );*/

      if (user.value) {
        //console.log("User exists, attempting to create userrecipes data");
        await create("userrecipes", {
          user: {
            connect: [user.value.id],
          },
          recipe: {
            connect: [existingRecipeData.value.id],
          },
          addedAt: new Date().toISOString(),
        });
        triggerUpdate.value++;
        globalState.triggerUpdate++;
      }
      //console.log("Userrecipes complete...");
      return;
    } else {
      // If the recipe does not exist in Strapi, use the OpenAI generated recipe
      //console.log("No existing recipe value, generating recipe...");
      fetchRecipes();
    }
  } catch (error) {
    console.error("Error during fetch:", error);
    isLoadingRecipes.value = false;
    createRecipesError.value =
      "An error has occurred. Please try to create another recipe.";
  }
};

const newRecipe = ref({});

const fetchRecipes = async () => {
  // Transform 'value' strings to match expected API format if needed
  // Example: 'courseBreakfast' to 'Breakfast'
  const title = titleFromFetch.value;
  const course = selectedCourseOption.value.replace("course", "") || "Any";
  const cuisine = cuisineOption.value || "Any";
  const difficulty = selectedDifficultyOption.value || "Any";
  const diet = dietOption.value || "Any";
  const uniqueness = String(sliderValue.value) || "3";

  //console.log("IngredientInput: ", ingredientInput.value);

  // Format ingredients as an array of strings
  const ingredients = ingredientInput.value;

  //console.log("Ingredients: ", ingredients[0]);

  // Construct the payload object to match RecipeRequest model in Python
  const payload = {
    title: title,
    ingredients: ingredients === "" ? "Surprise me" : ingredients,
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
      //console.log("Finished receiving stream.");
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
    const response = await fetch("https://data.eatclassy.com/get-recipes/", {
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

    Object.assign(newRecipe.value, data);
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
      `${strapiURL}/api/recipes?filters[uid][$eq]=${slug}&populate=*`
    );
    //console.log("Response value:", response);
    const recipes = await response.json();

    // This is working!!!

    let recipesLength;

    if (recipes.data[0]) {
      recipesLength = true;
    }

    //console.log("Recipes.length? ", recipesLength);

    //console.log("Response data attributes:", recipes.data[0].attributes);
    return recipesLength ? recipes.data[0] : null;
  } catch (error) {
    //console.error("Error fetching recipe from Strapi:", error);
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
  decrementCredits();
};

function updateLocalStorage() {
  // Combine the existing recipes with the new ones
  const existingRecipesStorage = localStorage.getItem("recipes");
  const existingRecipes = existingRecipesStorage
    ? JSON.parse(existingRecipesStorage).recipes
    : [];

  let updatedRecipes;

  if (!existingRecipe.value && newRecipe.value.recipe_name) {
    //console.log("Updating local storage with new recipe", newRecipe.value);
    updatedRecipes = existingRecipes.concat(newRecipe.value);
    localStorage.setItem(
      "recipes",
      JSON.stringify({ recipes: updatedRecipes })
    );
    data.value = { recipes: updatedRecipes };
  }
  if (existingRecipe.value) {
    /*console.log(
      "Updating local storage with existing recipe",
      existingRecipe.value
    );*/
    updatedRecipes = existingRecipes.concat(existingRecipe.value.attributes);
    localStorage.setItem(
      "recipes",
      JSON.stringify({ recipes: updatedRecipes })
    );
    data.value = { recipes: updatedRecipes };
  }
}

const formattedIngredients = computed(() => {
  if (!newRecipe.value.ingredients) {
    return [];
  }

  // Adjusted regex to split the ingredients string into an array.
  // The regex now matches "- " at the start of the string or after a newline character.
  // The "?" in "(?:^|\n)- " makes the preceding group (?:^|\n) non-capturing.
  return newRecipe.value.ingredients
    .split(/\n?- /)
    .map((ingredient) => ingredient.trim())
    .filter(Boolean);
});

// Computed property to create a list of ingredients from the string
const existingFormattedIngredients = computed(() => {
  if (!existingRecipeData.value.attributes.ingredients) {
    return [];
  }
  // Split the ingredients string into an array, trim each item to remove extra spaces
  return existingRecipeData.value.attributes.ingredients
    .split(/\n?- /)
    .map((ingredient) => ingredient.trim())
    .filter(Boolean);
});

const formattedNotes = computed(() => {
  if (!newRecipe.value.cooking_notes) {
    return [];
  }
  // Split the notes string into an array using a regular expression that matches dashes that are not attached to words
  return newRecipe.value.cooking_notes
    .split(/\s-\s|^-|-\s|\s-$/)
    .map((note) => note.trim())
    .filter(Boolean);
});

const existingFormattedNotes = computed(() => {
  if (!existingRecipeData.value.attributes.cooking_notes) {
    return [];
  }
  // Split the ingredients string into an array, trim each item to remove extra spaces
  return existingRecipeData.value.attributes.cooking_notes
    .split(/\s-\s|^-|-\s|\s-$/)
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
  if (!existingRecipeData.value.attributes.cooking_instructions) {
    return [];
  }
  // Split the instructions into steps based on number patterns
  return existingRecipeData.value.attributes.cooking_instructions
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
  //console.log("Decrementing strapi");
  // Check if userData is populated and has a freeCreditsLeft value
  if (userData.value && userData.value[0]?.attributes?.freeCreditsLeft > 0) {
    //console.log("More than 0");
    try {
      //console.log("Updating userdata: ", userData.value[0].id);
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

async function decrementLoggedOutCredits() {
  if (!user.value) {
    realCredits.value--;
    //console.log("Realcredits.value: ", realCredits.value);
    localStorage.setItem("ec_credits", realCredits.value.toString());
  }
}

// Slider for Uniquness Level
const slider = ref(null);
const sliderValue = ref(3); // Default value

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
  if (newRecipe.value?.recipe_name) {
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
        image_url: newRecipe.value.image_url,
        diet_type_if_set: newRecipe.value.diet_type_if_set,
        created_by_user: {
          connect: [user.value?.id || null],
        },
      })
        .then((result) => {
          //console.log(`Recipe created:`, result);
          return result;
        })
        .catch((error) => {
          console.error(
            `Error creating recipe ${newRecipe.recipe_name}:`,
            error
          );
          throw error;
        })
    );

    try {
      const createdRecipe = await Promise.all(creationPromises);
      //console.log(`All recipes created successfully:`, createdRecipe[0]);
      if (user.value) {
        //console.log("User exists, attempting to create userrecipes data");
        try {
          await create("userrecipes", {
            user: {
              connect: [user.value.id],
            },
            recipe: {
              connect: [createdRecipe[0].data.id],
            },
            addedAt: new Date().toISOString(),
          });
        } catch (error) {
          console.log("Error creating userrecipe: ", error);
        }
      }
      //console.log("Userrecipes complete...");
      triggerUpdate.value++;
      globalState.triggerUpdate++;
      return createdRecipe;
    } catch (error) {
      console.error(`An error occurred during recipe creation:`, error);
    }
  }
};

function clearAllFilters() {
  ingredientInput.value = "";
  selectedCourseOption.value = "Any";
  selectedDifficultyOption.value = "Any";
  cuisineOption.value = "";
  dietOption.value = "";
  sliderValue.value = 3;
}

/*
const paymentStatus = inject("paymentStatus", "none");

watch(paymentStatus, (newStatus) => {
  if (newStatus === "success") {
    loadUserData();
  }
});*/

useSeoMeta({
  title: "EatClassy - Create Unique Recipes Using AI",
  description:
    "Create original, insanely good recipes for any idea, ingredient, cuisine, region, or dietary need using the EatClassy AI-powered recipe engine.",
});
</script>

<style scoped>
input.ingredient-input {
  -webkit-border-top-right-radius: 0;
  border-top-right-radius: 0;
  -webkit-border-bottom-right-radius: 0;
  border-bottom-right-radius: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
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
.cropped-image {
  width: 100%;
  height: 240px;
  object-fit: cover;
  object-position: center;
}
</style>
