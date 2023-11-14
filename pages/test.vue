<script setup>
const user = useStrapiUser();

const { find } = useStrapi();

const userData = ref();

const { data: result } = await useAsyncData("userdata", () =>
  find("userdatas", {
    ppopulate: ["owner", "recipes"],
    filters: {
      owner: user?.value?.id,
    },
  })
);
</script>

<template>
  <div>
    Data:
    {{ result }}
  </div>
</template>
