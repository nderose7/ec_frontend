<template>
  <div class="h-screen px-4 text-center">
    <div class="h-screen flex justify-center pt-32">
      <div class="xl:w-1/3 lg:w-1/2 min-w-[320px]">
        <p v-if="loading">Processing payment result...</p>
        <div v-if="paymentStatus === 'success'">
          <Icon
            name="line-md:circle-to-confirm-circle-transition"
            class="text-brand-500"
            size="6rem"
          />
          <h1 class="mb-2 mt-4">Your membership is active!</h1>
          <p>
            To manage your membership, check out the
            <NuxtLink to="/settings/billing" class="link">Billing</NuxtLink>
            page.
          </p>
          <NuxtLink
            to="/"
            class="btn-primary px-5 py-2 inline-block mt-4 font-bold"
            >Create A Recipe</NuxtLink
          >
        </div>

        <p v-if="paymentStatus === 'failure'">
          Payment failed. Please try again or contact support.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const {
  public: { strapiURL },
} = useRuntimeConfig();

const route = useRoute();
const loading = ref(true);
const paymentStatus = ref("");

provide("paymentStatus", paymentStatus);

onMounted(async () => {
  const subscriptionId = route.query.subscriptionId;
  console.log(subscriptionId);
  const token = useStrapiToken();
  // Call your Strapi endpoint to verify the subscription
  const response = await fetch(`${strapiURL}/api/verify-subscription`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify({ subscriptionId: subscriptionId }),
  });

  const result = await response.json();

  paymentStatus.value = result.status;
  loading.value = false;
});
</script>
