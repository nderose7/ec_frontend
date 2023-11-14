<template>
  <div class="xl:flex">
    <Recipes :recipes="recipes" />
    <div class="w-full px-5 xl:px-10 pb-48 min-[1600px]:flex gap-10">
      <div class="recipe-search w-full xl:px-16">
        <div class="text-center mb-10 pt-12">
          <h1 class="text-center mb-5 mt-5 text-5xl dark:text-slate-300">
            Insanely good recipes in an instant.
          </h1>
          <p class="lead">
            Generate unique recipes from any idea, ingredient, region, or
            dietary need.
          </p>
        </div>
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
          {{
            sortOption || (showFilters ? "Hide" : "Show") + " Recipe Options"
          }}
        </button>
        <div
          v-if="showFilters"
          class="mt-3 px-5 pt-2 pb-2 slide-down bg-slate-100 dark:bg-midnight-900 rounded-lg form-control"
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
              />
            </div>
          </div>
        </div>
        <div class="search-bar form-control mt-5 flex mb-2">
          <input
            type="text"
            placeholder="Recipe, ingredients, or cuisine..."
            class="rounded-l"
            v-model="ingredientInput"
          />
          <button
            @click="fetchRecipes"
            type="submit"
            class="bg-brand-500 text-white mb-1 rounded-r-lg dark:border-midnight-600 border-r border-t border-b"
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
        <div v-if="isLoadingRecipes" class="my-3 px-5 xl:px-0 pl-1">
          <b>Generating up to 3 recipes...</b>
          <Icon name="svg-spinners:3-dots-bounce" size="2rem" class="ml-3" />
        </div>

        <div v-if="!isLoadingRecipes" class="pb-10">
          <div
            v-for="(recipe, recipeIndex) in data.recipes"
            :key="`recipe-${recipeIndex}`"
            class="border-b pb-10 pt-10 dark:border-midnight-200"
          >
            <h1
              @click="toggleDetails(recipeIndex)"
              class="mb-4 cursor-pointer text-brand-500"
            >
              {{ recipe?.recipe_name }}
            </h1>
            <p>{{ recipe?.short_description }}</p>

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
              <div class="flex gap-5 mt-8">
                <div><b>Course:</b> {{ recipe?.course }}</div>
                <div><b>Cuisine:</b> {{ recipe?.cuisine_type }}</div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="border-b-2 dark:border-midnight-200 w-1/5 mx-auto text-center hidden"
        ></div>
        <div class="offer mt-10 mb-10 sm:text-center">
          <h2>Sign up for a free account</h2>
          <p class="pt-1 mb-2">
            Get 50 free credits and save your favorite recipes.
          </p>
          <NuxtLink
            to="/sign-up"
            class="btn-primary inline-block my-2 btn-lg font-bold"
            >Sign Up</NuxtLink
          >
        </div>
      </div>

      <LatestRecipes />
    </div>
  </div>
</template>

<script setup>
import swalMixins from "~/mixins/swalMixins";
const { Toast } = swalMixins.data();
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

const { create } = useStrapi();

const isLoadingRecipes = ref(false);
const credits = ref(0);

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
  checkCredits();
  loadRecipes();
});

const data = ref([]);
const recipes = ref([]);

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

const fetchRecipes = async () => {
  try {
    if (credits.value > 0) {
      credits.value -= 1;
      localStorage.setItem("8589d68a7d2253bf", encodeCredits(credits.value));
    } else {
      // Handle the case when credits are 0 or not found
      Toast.fire({
        icon: "error",
        title: "You're out of credits.",
        text: "Please purchase a membership for more.",
      });
      return;
    }
    isLoadingRecipes.value = true;
    // Transform 'value' strings to match expected API format if needed
    // Example: 'courseBreakfast' to 'Breakfast'
    const course = selectedCourseOption.value.replace("course", "") || "Any";
    const cuisine = cuisineOption.value || "Any";
    const difficulty = selectedDifficultyOption.value || "Any";
    const diet = dietOption.value || "Any";

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
    };

    // Make the POST request to your FastAPI backend
    const response = await fetch("http://localhost:8000/get-recipes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // After you get the response from the fetch call and parse the JSON:
    const newRecipesResponse = await response.json();

    // Assuming newRecipesResponse is an object with a 'recipes' key
    const newRecipes = newRecipesResponse.recipes;

    console.log("newRecipes: ", newRecipes);

    // Retrieve existing recipes from localStorage and parse them
    // Make sure to access the 'recipes' array within the 'existingRecipes' object
    const existingRecipesStorage = localStorage.getItem("recipes");
    const existingRecipesObject = existingRecipesStorage
      ? JSON.parse(existingRecipesStorage)
      : { recipes: [] }; // Ensure this is an object with a 'recipes' key
    const existingRecipes = existingRecipesObject.recipes; // This should always be an array
    console.log("existingRecipes: ", existingRecipes);

    // Combine the existing recipes with the new ones
    // Now, since both existingRecipes and newRecipes are proper arrays, you can concatenate them
    const updatedRecipes = existingRecipes.concat(newRecipes);

    // Store the updated array back into localStorage as an object with a 'recipes' key
    localStorage.setItem(
      "recipes",
      JSON.stringify({ recipes: updatedRecipes })
    );

    console.log("updatedRecipes: ", updatedRecipes);

    // Update recipes component
    loadRecipes();

    // Now set your reactive data value to the updated list of recipes
    data.value = { recipes: newRecipes };

    credits.value--;
    localStorage.setItem("ec_credits", credits.value.toString());

    const createRecipes = async () => {
      const creationPromises = [];

      for (const recipe of data.value.recipes) {
        // Check if ingredients is an array and join it to a string if so
        if (!recipe.ingredients[0].startsWith("-")) {
          recipe.ingredients[0] = "- " + recipe.ingredients[0];
        }

        // Ensure all ingredients have a dash, including the first one
        const ingredientsWithDash = recipe.ingredients.map((ingredient) =>
          ingredient.trim().startsWith("-")
            ? ingredient
            : "- " + ingredient.trim()
        );

        // Join the ingredients into a string
        const ingredientsString = ingredientsWithDash.join("\n");

        // Log the corrected ingredients string for verification
        console.log(
          `Corrected ingredients for recipe ${recipe.recipe_name}: ${ingredientsString}`
        );

        creationPromises.push(
          create("recipes", {
            title: recipe.recipe_name,
            description: recipe.short_description,
            prepTime: recipe.prep_time,
            cookTime: recipe.cook_time,
            totalTime: recipe.total_time,
            servings: recipe.servings,
            calories: recipe.calories,
            ingredients: ingredientsString, // Use the joined string for ingredients
            instructions: recipe.cooking_instructions,
            cookingNotes: recipe.cooking_notes,
          })
            .then((result) => {
              console.log(`Recipe created:`, result);
              return result;
            })
            .catch((error) => {
              console.error(
                `Error creating recipe ${recipe.recipe_name}:`,
                error
              );
              throw error;
            })
        );
      }

      try {
        const createdRecipes = await Promise.all(creationPromises);
        console.log(`All recipes created successfully:`, createdRecipes);
        return createdRecipes;
      } catch (error) {
        console.error(`An error occurred during recipe creation:`, error);
      }
    };

    createRecipes(); // Call the function to create the recipes

    console.log(data.value);
  } catch (error) {
    console.error("There was an error fetching the recipes", error);
  }
  isLoadingRecipes.value = false;
};

// Computed property to create a list of ingredients from the string
const formattedIngredients = computed(() => {
  if (data.value && data.value.recipes) {
    return data.value.recipes.map((recipe) =>
      recipe.ingredients.flatMap((ingredient) =>
        // Split the string into an array of strings on newline characters
        ingredient.split("\n").map((item) => item.trim().replace(/^- /, ""))
      )
    );
  }
  return []; // Return an empty array if data.value is null or undefined
});

// Computed property to create a list of instructions from the string
const formattedInstructions = computed(() => {
  if (data.value && data.value.recipes) {
    return data.value.recipes.map((recipe) =>
      // Split the string into an array of strings on newline characters
      recipe.cooking_instructions.split("\n").map((step) => step.trim())
    );
  }
  return []; // Return an empty array if data.value is null or undefined
});

const visibleDetails = ref([]);

const toggleDetails = (index) => {
  const position = visibleDetails.value.indexOf(index);
  if (position > -1) {
    visibleDetails.value.splice(position, 1); // If index is already in the array, remove it
  } else {
    visibleDetails.value.push(index); // Otherwise, add the index to the array
  }
};

// Function to encode credits value before storing it
function encodeCredits(value) {
  return btoa(value.toString());
}

// Function to decode credits value after retrieving it
function decodeCredits(encodedValue) {
  return atob(encodedValue);
}

// Function to check for credits in local storage or initialize them
function checkCredits() {
  // Retrieve the encoded credits value from localStorage
  const savedCredits = localStorage.getItem("8589d68a7d2253bf");

  if (savedCredits !== null) {
    // If found, decode it from Base64 and parse it to an integer
    credits.value = parseInt(decodeCredits(savedCredits), 10);
  } else {
    // If not found, initialize with 10 credits for anonymous users
    // and store it in localStorage after encoding
    credits.value = 10;
    localStorage.setItem("8589d68a7d2253bf", encodeCredits(credits.value));
  }
}
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
form {
  @apply mb-5;
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

::placeholder {
  @apply italic;
}
</style>
