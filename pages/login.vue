<template>
  <div class="h-screen px-4 text-center dark:bg-midnight-900 bg-slate-100">
    <div class="h-screen-minus-header flex items-center justify-center">
      <div class="xl:w-1/5 lg:w-1/3 min-w-[320px]">
        <div v-if="route.query.emailConfirmed">
          <Icon
            name="line-md:confirm-circle"
            class="text-brand-500"
            size="5rem"
          />
          <p class="text-xl pb-4 font-semibold">
            Your email address is confirmed.<br />Please sign in.
          </p>
        </div>
        <div
          class="rounded-xl border bg-white px-8 pb-12 pt-10 dark:border-midnight-400 dark:bg-midnight-700 lg:rounded-3xl"
        >
          <div class="logo mb-6 px-10 text-4xl text-center">
            <NuxtLink to="/" class="inline-block">
              <Logo />
            </NuxtLink>
          </div>
          <p class="hidden">Login to your Momentum account.</p>
          <div v-if="error">
            <div v-show="error !== ''" class="p-3">
              <p>{{ error }}</p>
            </div>
          </div>
          <div class="mt-4 mb-8 text-center hidden">
            <a
              :href="`${strapiURL}/api/connect/google`"
              class="btn-primary inline-block min-w-[200px] rounded-full border px-3 py-2 text-lg font-bold text-white dark:border-blue-500"
            >
              <span
                class="mr-1 inline-block h-[28px] w-[28px] rounded-full bg-white"
              >
                <Icon
                  name="logos:google-icon"
                  class="icon-style h-[18px] w-[18px] relative top-[-1px]"
              /></span>
              Login With Google
            </a>
          </div>
          <form @submit="loginUser" class="form-control mt-4 text-left">
            <div class="form-group">
              <label for="email" class="label font-bold">Email Address</label>
              <input
                v-model="email"
                class="rounded-md"
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            <div class="form-group relative">
              <label for="password" class="label font-bold">Password</label>
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                class="rounded-md"
                id="password"
                type="password"
                name="password"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute top-[42px] right-3"
              >
                <Icon :name="`${showPassword ? 'mdi:eye-off' : 'mdi:eye'}`" />
              </button>
            </div>
            <div class="mt-8 flex justify-center">
              <button
                :disabled="email === '' || password === ''"
                class="btn-primary rounded-full px-10 py-3 text-xl font-bold text-white"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <div
          v-if="route.query.emailConfirmed && recipeImportLoading"
          class="mt-2"
        >
          Importing your creations for first login...
          <Icon name="svg-spinners:3-dots-bounce" size="1rem" class="ml-3" />
        </div>
        <div class="mt-4">
          <p
            class="mb-2 text-center text-base"
            v-if="!route.query.emailConfirmed"
          >
            Don't have an account?
            <NuxtLink to="/sign-up" class="link">Sign Up.</NuxtLink>
          </p>
          <p class="text-center text-base">
            <NuxtLink to="/forgot-password" class="link"
              >Forgot your password?</NuxtLink
            >
          </p>
          <NuxtLink
            to="/forgot-password"
            class="hidden rounded bg-slate-700 px-3 py-2 font-bold text-white"
            >Forgot Password</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.h-screen-minus-header {
  height: calc(100vh - 100px); /* Default height */
  @screen lg {
    /* Tailwind's way to apply media queries */
    height: calc(100vh - 100px); /* Adjusted height for large screens */
  }
}
input[type="password"] {
  font-family: Verdana;
}
</style>

<script setup>
import swalMixins from "~/mixins/swalMixins";
const { Toast } = swalMixins.data();
const route = useRoute();

const recipeImportLoading = ref(false);

const { find, create, update } = useStrapi();

definePageMeta({
  layout: "blank",
  middleware: "loggedin",
});

useHead({
  title: "Login",
});

const {
  public: { strapiURL },
} = useRuntimeConfig();

// form state
const email = ref("");
const password = ref("");
const error = ref("");

const showPassword = ref(false);

const { login } = useStrapiAuth();
const router = useRouter();

const loginUser = async (e) => {
  e.preventDefault();
  try {
    const response = await login({
      identifier: email.value,
      password: password.value,
    });
    console.log("Response: ", response.user);
    if (response.user && route.query.emailConfirmed) {
      const user = useStrapiUser();
      console.log("Login response okay...");
      try {
        // Step 2: Complete the registration by creating a Stripe customer
        const responseAuth = await fetch(`${strapiURL}/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.value?.email,
            userId: user.value?.id,
          }),
        });
        if (responseAuth.ok) {
          console.log("Auth response okay...");
          try {
            recipeImportLoading.value = true;

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

            console.log("Retrieved localStorageRecipes:", localStorageRecipes);

            const strapiRecipes = await fetchRecipesFromStrapi();

            const strapiRecipesToUpdate = strapiRecipes.filter((strapiRecipe) =>
              localStorageRecipes.some(
                (localRecipe) =>
                  slugify(localRecipe.recipe_name) ===
                  strapiRecipe.attributes.uid
              )
            );

            await Promise.all(
              strapiRecipesToUpdate.map((recipe) =>
                updateRecipeInStrapi(recipe.id, user.value?.id)
              )
            );
            localStorage.removeItem("recipes");
            recipeImportLoading.value = false;

            router.push("/login?emailConfirmed=true");
          } catch (error) {
            console.error(error);
          }

          router.push("/");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      router.push("/");
    }
  } catch (error) {
    console.error("Login error:", error);
    let errorMessage = "Login failed. Please try again.";

    // Check for error message in the expected structure
    if (error && error.error && error.error.message) {
      errorMessage = error.error.message;
    }

    Toast.fire({
      icon: "error",
      title: "Login Error",
      text: errorMessage,
    });
  }
};

useHead({
  meta: [{ name: "robots", content: "noindex" }],
});

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

// handle form submit
/*
const loginUser = async (e) => {
  e.preventDefault();
  if (name && email && password) {
    // GraphQL Sign in Query
    let signInQuery = {
      query: `mutation( $email: String!, $password: String!) {
        login(input: { identifier: $email, password: $password }) {
          jwt,
          user{
            id
            username
            email
          }
        }
      }`,
      variables: { email: email.value, password: password.value },
    };
    try {
      isLoading.value = true;
      const { login, errors } = await sendReq(graphqlURL, { body: JSON.stringify(signInQuery), headers: { "Content-Type": "application/json" } });
      if (errors) throw Error(errors);
      setSession(login);

      // notify and navigate to the home page

      // Add in full-width alert for successful login and redirect to clients?
      //alert("Sign in successful!");
      navigateTo("/treatment-library");
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }
};
*/
</script>
