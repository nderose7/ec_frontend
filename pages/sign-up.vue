<template>
  <div id="landing-managed" class="min-h-screen lg:mx-auto">
    <div class="lg:flex">
      <div class="h-full py-4 lg:px-8 lg:pt-4 lg:pb-0 w-full">
        <div class="px-5 lg:px-0">
          <Logo />
        </div>
        <div class="pt-3 sm:px-24 md:px-36 lg:px-0 lg:pt-20">
          <FreeSignUp />
        </div>
      </div>
      <div class="min-[1600px]:px-40 md:pb-20 lg:p-12 p-5 items-center w-full">
        <div class="sm:px-24 md:px-36 lg:px-0 lg:pt-20">
          <div class="grid grid-cols-2 gap-5">
            <img
              src="https://eatclassy.nyc3.cdn.digitaloceanspaces.com/tuscan-sun-kale-salad.jpg"
              alt="tuscan sun kale salad"
              class="rounded-lg mb-6 lg:mb-0"
            />
            <img
              src="https://eatclassy.nyc3.digitaloceanspaces.com/ultimate_bacon_bomb_burger_50d016a0ce.jpg"
              alt="ultimate bomb burger"
              class="rounded-lg mb-6 lg:mb-0 mt-6"
            />
            <img
              src="https://eatclassy.nyc3.cdn.digitaloceanspaces.com/smoky-chipotle-pineapple-pulled-pork-tacos.jpg"
              alt="pulled pork tacos"
              class="rounded-lg mb-6 lg:mb-0"
            />
            <img
              src="https://eatclassy.nyc3.cdn.digitaloceanspaces.com/decadent-chocolate-explosion.jpg"
              alt="decadent chocolate explosion dessert"
              class="rounded-lg mb-6 lg:mb-0 mt-6"
            />
            <img
              src="https://eatclassy.nyc3.digitaloceanspaces.com/moroccan_citrus_chicken_tagine_9c8e508cde.jpg"
              alt="chicken tagine"
              class="rounded-lg mb-6 lg:mb-0"
            />
            <img
              src="https://eatclassy.nyc3.digitaloceanspaces.com/dance_of_the_chimichurri_chicken_07def9e6e1.jpg"
              class="rounded-lg mb-6 lg:mb-0 mt-6"
            />
          </div>
          <p class="lead text-center mt-8 lg:px-20 font-semibold pb-16">
            Create recipes using our AI-powered recipe engine for any ingredient
            or dietary need, and save your favorite recipes!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "blank",
  middleware: ["loggedin"],
});

useHead({
  title: "Free Account",
});
</script>
