<template>
  <div class="inline font-medium">
    <span class=""
      ><b>{{ realCredits }}</b></span
    >
    free {{ realCredits === 1 ? "credit" : "credits" }} left
  </div>
</template>

<script setup>
import {
  realCredits,
  updateCreditsOnMounted,
} from "~/composables/useCredits.js";
updateCreditsOnMounted();
</script>
