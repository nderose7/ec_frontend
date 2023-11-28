<template>
  <div>
    <FreeSignUp />
  </div>
</template>

<script setup>
definePageMeta({
  //layout: "blank",
  middleware: ["loggedin"],
});

useHead({
  title: "Free Account",
});
</script>
