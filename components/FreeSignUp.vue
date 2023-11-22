<template>
  <VForm
    :validation-schema="schema"
    :initial-values="initialValues"
    class="vue-form p-5 text-left lg:mx-auto lg:w-full lg:max-w-[500px] lg:rounded-3xl lg:p-10"
  >
    <div class="">
      <h1 class="mb-3 text-4xl font-bold">Sign Up</h1>
      <p class="mb-6">Get 25 free credits, save recipes, and more.</p>
    </div>
    <div class="mt-5 hidden">
      <a
        :href="`${strapiURL}/api/connect/google`"
        class="btn-primary inline-block py-3 px-4 text-center"
      >
        <span class="mr-1 inline-block h-[27px] w-[27px] rounded-full bg-white">
          <Icon name="logos:google-icon" class="icon-style h-[20px] w-[20px]"
        /></span>
        Sign Up With Google
      </a>
    </div>

    <div class="mt-8">
      <p class="mt-6 hidden text-lg font-bold">Or sign up with your email:</p>
      <div class="form-control w-full text-xl">
        <VTextInput
          type="email"
          name="email"
          id="email"
          label="Your Email"
          :debug="debug"
          v-model="email"
        />

        <div class="relative mt-2">
          <VTextInput
            :type="showPassword ? 'text' : 'password'"
            name="password"
            id="password"
            label="Choose a Password"
            :debug="debug"
            v-model="password"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute top-[42px] right-3"
          >
            <Icon :name="`${showPassword ? 'mdi:eye-off' : 'mdi:eye'}`" />
          </button>
          <div v-if="password" class="password-strength">
            <div
              :class="getStrengthColor(passwordStrength)"
              class="strength-bar h-2 rounded-full"
              :style="{ width: passwordStrength * 25 + '%' }"
            ></div>
          </div>
        </div>
      </div>

      <p class="mt-4 text-base">
        By signing up, you agree to our
        <NuxtLink to="/terms" class="link">Terms of Use</NuxtLink>
        and our
        <NuxtLink to="/privacy" class="link">Privacy Agreement</NuxtLink>. We
        <i>never</i>
        share your data.
      </p>

      <div class="mt-5">
        <button
          type="submit"
          @click="onSubmit()"
          class="btn-primary px-6 py-3 mt-2 block w-full rounded-lg text-xl font-bold lg:inline-block lg:w-auto"
        >
          Next
        </button>
        <p v-if="errorMessage" class="mt-5 text-red-500">
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </VForm>
</template>

<style>
.password-strength {
  @apply w-full bg-white rounded-full mt-2 border dark:border-midnight-200;
}

.strength-bar {
  transition: width 0.3s ease;
}
</style>

<script setup>
import swalMixins from "~/mixins/swalMixins";
import { slugify } from "~/utils/slugify.js";
import { object, string, ref as yupRef } from "yup";
import { configure } from "vee-validate";
const { Toast } = swalMixins.data();

const {
  public: { strapiURL },
} = useRuntimeConfig();

const email = ref("");
const password = ref("");
const { register } = useStrapiAuth();
const { update, find, create } = useStrapi();

const debug = ref(false);
const showPassword = ref(false);
const errorMessage = ref(null);

onMounted(() => {
  document.getElementById("email").focus();
});

// Check if email exists in database
/*
const existingEmail = async (value) => {
  const result = await $fetch("/api/checkemail?email=" + value);
  return result ? true : false;


  onMounted(() => {
  debug.value =
    useRouter().currentRoute.value.query.debug === "true" ? true : false;
  document.getElementById("email").focus();
});
};*/

const regexSpecialCharacters = /^(?=.*?[~!@#$%^&*()]).*$/i;
const regexCapitalLetters = /^(?=.*?[A-Z]).*$/i;
const regexNumerical = /^(?=.*?[0-9]).*$/i;

const validatePasswordSpecial = async (value) => {
  if (!regexSpecialCharacters.test(value)) {
    return true;
  }
  return false;
};

const validatePasswordCapital = async (value) => {
  if (!regexCapitalLetters.test(value)) {
    return true;
  }
  return false;
};

const validatePasswordNumerical = async (value) => {
  if (!regexNumerical.test(value)) {
    return true;
  }
  return false;
};

configure({
  validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
  validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
  validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
  validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
});

const schema = object({
  email: string().required().email().label("Email Address"),
  password: string()
    .required()
    .test(
      "password-no-special",
      "Must contain at least one: ~!@#$%^&*().",
      async (value) => !(await validatePasswordSpecial(value))
    )
    .test(
      "password-no-number",
      "Must contain at least one number.",
      async (value) => !(await validatePasswordNumerical(value))
    )
    .min(8)
    .test(
      "password-no-capital",
      "Must contain at least one capital letter.",
      async (value) => !(await validatePasswordCapital(value))
    )
    .label("Password"),
  confirmed: string()
    .required()
    .oneOf([yupRef("password")], "Passwords do not match") //Cross-Field Validation
    .label("Your Confirmation Password"),
});
const initialValues = { email: "", password: "" };
//const mail = useMail();

const displayErrorMessage = (msg) => {
  errorMessage.value = msg;
};

const displayUsernameField = () => {
  showUsernameField.value = true;
};

const passwordStrength = computed(() => {
  let strength = 0;
  if (regexSpecialCharacters.test(password.value)) strength++;
  if (regexCapitalLetters.test(password.value)) strength++;
  if (regexNumerical.test(password.value)) strength++;
  if (password.value.length >= 8) strength++;

  return strength; // This will be a number between 0-4 based on the criteria met
});

const getStrengthColor = (strength) => {
  switch (strength) {
    case 1:
      return "bg-brand-500";
    case 2:
      return "bg-brand-500";
    case 3:
      return "bg-brand-500";
    case 4:
      return "bg-brand-500";
    default:
      return "bg-transparent";
  }
};

const onSubmit = async () => {
  //console.log("Clicked");

  try {
    // Step 1: Register the user using the Strapi function
    const userRegistered = await register({
      username: email.value,
      email: email.value,
      password: password.value,
    });

    let userId;

    if (userRegistered) {
      console.log("User registered: ", userRegistered);
      userId = userRegistered.user?.value?.id;
    } else {
      console.log("User not registered...");
    }

    const localStorageData = JSON.parse(
      localStorage.getItem("recipes") || "{}"
    );
    const localStorageRecipes = localStorageData.recipes || [];

    if (!Array.isArray(localStorageRecipes)) {
      console.error(
        "localStorageRecipes is not an array:",
        localStorageRecipes
      );
      return; // Exit the function or handle this scenario appropriately
    }

    //console.log("Retrieved localStorageRecipes:", localStorageRecipes);

    const strapiRecipes = await fetchRecipesFromStrapi();

    const strapiRecipesToUpdate = strapiRecipes.filter((strapiRecipe) =>
      localStorageRecipes.some(
        (localRecipe) =>
          slugify(localRecipe.recipe_name) === strapiRecipe.attributes.uid
      )
    );

    await Promise.all(
      strapiRecipesToUpdate.map((recipe) =>
        updateRecipeInStrapi(recipe.id, userId)
      )
    );

    navigateTo("/check-email");
  } catch (error) {
    console.error(error);
    Toast.fire({
      icon: "error",
      title: "Error signing up",
      text: "Please try again or contact support.",
    });
  }
};

const fetchRecipesFromStrapi = async () => {
  let allRecipes = [];
  let page = 1;
  let pageSize = 25; // Adjust the page size if needed
  let totalRecipes = 0;

  try {
    do {
      // Fetching a page of recipes
      const response = await find("recipes", {
        pagination: {
          page: page,
          pageSize: pageSize,
        },
      });

      if (response) {
        console.log(
          `Fetched page ${page} with ${response.data.length} recipes.`
        );
        allRecipes.push(...response.data);
        totalRecipes = response.meta.pagination.total; // Total number of recipes
      } else {
        break; // Break if no response
      }

      page++;
    } while (allRecipes.length < totalRecipes);

    console.log("Total recipes fetched: ", allRecipes.length);
    return allRecipes;
  } catch (error) {
    console.error("Error with the find operation:", error);
  }
};

const updateRecipeInStrapi = async (recipeId, userId) => {
  try {
    await update("recipes", recipeId, {
      created_by_user: {
        connect: [userId],
      },
    });
  } catch (error) {
    console.error("Error with the recipe update:", error);
  }
  try {
    await create("userrecipes", {
      user: {
        connect: [userId],
      },
      recipe: {
        connect: [recipeId],
      },
      addedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.log("Error creating userrecipe: ", error);
  }
};
</script>
