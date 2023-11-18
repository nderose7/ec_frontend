<template>
  <div class="h-screen px-4 text-center dark:bg-midnight-900 bg-slate-100">
    <div class="h-screen flex justify-center pt-32">
      <div class="xl:w-1/4 lg:w-1/2 min-w-[320px]">
        <p v-if="loading">Processing payment result...</p>
        <div v-if="paymentStatus === 'success'">
          <Icon
            name="line-md:circle-to-confirm-circle-transition"
            class="text-brand-500"
            size="6rem"
          />
          <h1 class="mb-2 mt-4">Payment successful!</h1>
          <p>
            To manage your membership, check out the
            <NuxtLink to="/account-settings/billing" class="link"
              >Billing</NuxtLink
            >
            page.
          </p>
          <NuxtLink
            to="/"
            class="btn-primary px-5 py-2 inline-block mt-4 font-bold"
            >Create A Recipe</NuxtLink
          >
        </div>

        <p v-if="paymentStatus === 'failure'">Payment failed.</p>
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

onMounted(async () => {
  const paymentIntentId = route.query.paymentIntentId;
  console.log(paymentIntentId);
  const token = useStrapiToken();
  // Call your Strapi endpoint to verify the payment
  const response = await fetch(`${strapiURL}/api/payments/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify({ paymentIntentId: paymentIntentId }),
  });

  const result = await response.json();

  paymentStatus.value = result.status;
  loading.value = false;
});
</script>
