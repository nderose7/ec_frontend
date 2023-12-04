<template>
  <div class="form-control mb-4">
    <div class="relative">
      <input
        type="text"
        class="rounded-lg"
        v-model="searchQuery"
        @input="searchRecipes"
        placeholder="Search recipes..."
      />
      <div v-if="searchQuery">
        <button
          type="button"
          class="absolute right-2 top-3 text-brand-500"
          @click="clearAllFilters()"
        >
          <Icon
            name="bx:x"
            class="icon-style bg-white dark:bg-midnight-900"
            size="2rem"
          />
        </button>
      </div>
    </div>
    <div v-if="recipes.length" class="border-b pb-5 dark:border-midnight-200">
      <ul class="px-2 h-local overflow-y-scroll">
        <li v-for="recipe in recipes" :key="recipe.id">
          <NuxtLink
            :to="`/recipes/${recipe.attributes.uid}`"
            @click="emitCloseMenu"
            class="link py-1 block"
          >
            {{ recipe.attributes.recipe_name }}</NuxtLink
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.h-local {
  @apply h-[300px];
}
</style>

<script setup>
const searchQuery = ref("");
const recipes = ref([]);

const {
  public: { strapiURL },
} = useRuntimeConfig();

const emit = defineEmits(["closeMenu"]);

const emitCloseMenu = () => {
  emit("closeMenu");
};

const searchRecipes = async () => {
  if (searchQuery.value.trim()) {
    try {
      const response = await fetch(
        `${strapiURL}/api/recipes?_q=${encodeURIComponent(searchQuery.value)}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      recipes.value = data.data;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  } else {
    recipes.value = [];
  }
};

function clearAllFilters() {
  searchQuery.value = "";
  recipes.value = [];
}
</script>
