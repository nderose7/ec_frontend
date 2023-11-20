<template>
  <div class="form-control mb-4">
    <input
      type="text"
      class="rounded-lg"
      v-model="searchQuery"
      @input="searchRecipes"
      placeholder="Search recipes..."
    />
    <ul v-if="recipes.length" class="px-2">
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
</template>

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
</script>
