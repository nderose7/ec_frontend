<template>
  <div
    class="xl:w-full mx-auto px-5 xl:px-10 bg-slate-100 dark:bg-midnight-900 sticky top-0 z-50"
  >
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-10 font-bold">
        <div class="flex items-end lg:mr-16">
          <Logo />
          <NuxtLink to="https://www.drinkclassy.com" class="link">
            &nbsp;/&nbsp; DrinkClassy</NuxtLink
          >
        </div>
        <div class="flex items-center main-nav gap-10">
          <NuxtLink to="/">Create Recipes</NuxtLink>
          <NuxtLink to="/recipes">Browse Recipes</NuxtLink>
          <NuxtLink to="/recipes/favorites" v-if="userValue"
            >Your Favorites</NuxtLink
          >
        </div>
      </div>
      <div v-if="user" class="relative">
        <LoggedInUserNav />
      </div>
      <div
        v-else
        class="text-right lg:flex items-center gap-3"
        :class="route.path === '/sign-up' ? 'hidden lg:hidden' : ''"
      >
        <span class="block text-sm md:text-base pr-3"><CreditsAnon /></span>
        <NuxtLink
          to="/sign-up"
          class="btn-primary btn-responsive font-bold inline-block mt-1 mb-1"
          >Sign Up</NuxtLink
        >
        <NuxtLink
          to="/login"
          class="btn-primary btn-responsive font-bold inline-block mt-1 mb-1"
          >Login</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const user = useStrapiUser();

const { logout } = useStrapiAuth();
const router = useRouter();
const onLogout = () => {
  logout();
  router.push("/");
};

const userValue = user.value;
</script>

<style scoped>
.main-nav a {
  @apply py-6 border-b-2 border-transparent;
}
.main-nav .router-link-active {
  @apply text-brand-500 border-b-2 border-brand-500;
}
</style>
