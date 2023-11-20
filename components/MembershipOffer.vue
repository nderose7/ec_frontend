<template>
  <div class="offer mt-16 mb-10 sm:text-center">
    <div v-if="user && user.freeAccount">
      <h2 class="lg:text-3xl mb-1">
        <NuxtLink to="/sign-up" class="link">Sign up for a membership</NuxtLink>
      </h2>
      <p class="pt-1 mb-2 min-[1600px]:w-1/2 xl:w-1/2 mx-auto">
        Create and save up to 50 recipes per month for only $4.99.
      </p>
      <NuxtLink
        to="/membership"
        class="btn-primary inline-block my-2 btn-lg font-bold"
        >Upgrade Now</NuxtLink
      >
    </div>
    <div v-else-if="user && user.paidMembershipTierOne">
      <h2 class="lg:text-3xl mb-1">
        <NuxtLink to="/sign-up" class="link">Upgrade For More Recipes</NuxtLink>
      </h2>
      <p class="pt-1 mb-2 min-[1600px]:w-1/2 xl:w-1/2 mx-auto">
        Upgrade to get 120 credits per month for only $9.99.
      </p>
      <NuxtLink
        to="/membership"
        class="btn-primary inline-block my-2 btn-lg font-bold"
        >Upgrade Now</NuxtLink
      >
    </div>
    <div v-else-if="user && user.paidMembershipTierTwo">
      <h2 class="lg:text-3xl mb-1">
        <NuxtLink to="/sign-up" class="link">Upgrade For More</NuxtLink>
      </h2>
      <p class="pt-1 mb-2 min-[1600px]:w-1/2 xl:w-1/2 mx-auto">
        Upgrade to get unlimited credits for only $16.99/month.
      </p>
      <NuxtLink
        to="/membership"
        class="btn-primary inline-block my-2 btn-lg font-bold"
        >Upgrade Now</NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
const user = useStrapiUser();
</script>
