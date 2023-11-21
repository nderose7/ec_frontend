<template>
  <div class="container mx-auto px-4">
    <div class="text-center mt-10 mb-8">
      <h1>Create More Recipes.</h1>
      <div v-if="showPayment">
        <p class="mt-3">
          You will be charged {{ selectedPrice }}/month until you pause or
          cancel your membership.
        </p>
        <div class="text-center text-slate-500 mt-5 font-semibold">
          <Icon name="bx:lock" class="icon-style" /> Guaranteed Safe & Secure
          Checkout
        </div>
      </div>
    </div>

    <div v-if="!showPayment" class="flex flex-wrap -mx-4">
      <!-- Pricing Box 1 -->
      <div class="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
        <div class="card">
          <button @click="handleSubscription('basic')" class="link mb-2">
            <h2 class="text-3xl">Lite</h2>
          </button>
          <h3 class="mb-2 text-slate-700 dark:text-slate-400">
            50 Recipes / Month
          </h3>
          <p>
            Get 50 recipe credits for creating any kind of recipe you can think
            of.
          </p>
          <h3 class="my-4 dark:text-slate-200">$4.99 / month</h3>
          <button
            @click="handleSubscription('basic')"
            class="btn-primary px-4 py-2 inline-block font-bold"
          >
            Choose Plan <Icon name="mdi:arrow-right" class="icon-style" />
          </button>
        </div>
      </div>

      <!-- Pricing Box 2 -->
      <div class="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
        <div class="card">
          <button @click="handleSubscription('pro')" class="link mb-2">
            <h2 class="text-3xl">Standard</h2>
          </button>
          <h3 class="mb-2 text-slate-700 dark:text-slate-400">
            120 Recipes / Month
          </h3>
          <p>
            Get 120 recipe credits for creating any kind of recipe you can think
            of + no ads.
          </p>
          <h3 class="my-4 dark:text-slate-200">$9.99 / month</h3>
          <button
            @click="handleSubscription('pro')"
            class="btn-primary px-4 py-2 inline-block font-bold"
          >
            Choose Plan <Icon name="mdi:arrow-right" class="icon-style" />
          </button>
        </div>
      </div>

      <!-- Pricing Box 3 -->
      <div class="w-full lg:w-1/3 px-4">
        <div class="card">
          <button @click="handleSubscription('premium')" class="link mb-2">
            <h2 class="text-3xl">Unlimited</h2>
          </button>
          <h3 class="mb-2 text-slate-700 dark:text-slate-400">
            Unlimited Recipes
          </h3>
          <p>
            Create as many recipes as your heart desires with our Unlimited plan
            + no ads.
          </p>
          <h3 class="my-4 dark:text-slate-200">$16.99 / month</h3>
          <button
            @click="handleSubscription('premium')"
            class="btn-primary px-4 py-2 inline-block font-bold"
          >
            Choose Plan <Icon name="mdi:arrow-right" class="icon-style" />
          </button>
        </div>
      </div>
    </div>
    <div class="xl:w-1/2 mx-auto">
      <div v-if="showPayment">
        <span class="text-base text-slate-500 my-2 font-bold mb-4 inline-block"
          >PAYMENT DETAILS</span
        >
      </div>

      <form
        id="payment-form"
        class="bg-slate-100 rounded-lg"
        :class="showPayment ? 'p-4' : ''"
      >
        <div class="px-1">
          <div v-if="showPayment" class="mb-4">
            <label class="font-normal text-base text-slate-700"
              >Full name</label
            >
            <input
              type="text"
              v-model="customerName"
              class="rounded-md bg-white border w-full px-4 py-2"
            />
          </div>
          <div id="payment-element" :class="isDarkMode ? 'dark-mode' : ''">
            <!-- The Stripe Payment Element will be inserted here -->
          </div>
          <div
            v-if="showPayment"
            class="mt-8 md:flex items-center justify-between"
          >
            <button
              type="submit"
              class="btn-primary px-6 py-2 inline-block font-bold mb-6 md:mb-0"
            >
              <span v-if="loadingSubmit"
                ><Icon
                  name="svg-spinners:pulse-3"
                  class="icon-style mr-1"
                />Subscribing...</span
              >
              <span v-else>Subscribe for {{ selectedPrice }}/month</span>
            </button>
            <div
              class="md:border md:px-4 md:rounded-lg md:w-fit stripe text-base"
            >
              Powered by
              <Icon
                name="fa6-brands:stripe"
                class="icon-style stripe mr-1"
                size="3rem"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.stripe {
  color: #635bff;
}
.stripe-border {
  border-color: #635bff;
}
.dark-mode label {
  color: white !important;
}
</style>

<script setup>
import { loadStripe } from "@stripe/stripe-js";

const {
  public: { strapiURL, stripeKey },
} = useRuntimeConfig();

useSeoMeta({
  title: "Become A Member",
  description:
    "Sign up for an EatClassy.com membership to create more recipes.",
});

const stripePromise = loadStripe(stripeKey);
const user = useStrapiUser();
const router = useRouter();
const token = useStrapiToken();
const selectedPrice = ref("");
const showPayment = ref(false);
const customerName = ref("");
const loadingSubmit = ref(false);
const isDarkMode = ref(true);
let elements;

onMounted(() => {
  isDarkMode.value = document.documentElement.classList.contains("dark");
});

const handleSubscription = async (membershipType) => {
  console.log("dark mode? ", isDarkMode.value);

  // Fetch clientSecret for SetupIntent
  const response = await fetch(`${strapiURL}/api/create-setup-intent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify({ userId: user.value.id }),
  });

  const data = await response.json();
  if (!response.ok || !data.clientSecret) {
    console.error("Error fetching client secret", data);
    throw new Error("Error fetching client secret");
  }

  // Initialize Stripe Elements with clientSecret
  const stripe = await stripePromise;
  elements = stripe.elements({
    clientSecret: data.clientSecret,
  });

  // Create and mount the PaymentElement
  const paymentElement = elements.create("payment");
  paymentElement.mount("#payment-element");
  showPayment.value = true;

  // Set the selected price based on the membership type
  switch (membershipType) {
    case "basic":
      selectedPrice.value = "$4.99";
      break;
    case "pro":
      selectedPrice.value = "$9.99";
      break;
    case "premium":
      selectedPrice.value = "$16.99";
      break;
    default:
      selectedPrice.value = "";
  }

  // Add an event listener to the payment form submission
  const paymentForm = document.getElementById("payment-form");
  paymentForm.onsubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    loadingSubmit.value = true;
    // Confirm the setup intent
    const result = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/payment-status",
      },
      redirect: "if_required",
    });

    if (result.error) {
      loadingSubmit.value = false;
      console.error("Error confirming setup:", result.error);
      return;
    }

    // Extract the payment method ID from the result
    const paymentMethodId = result.setupIntent.payment_method;

    // Call createSubscription with the new payment method ID
    await createSubscription(membershipType, paymentMethodId);
  };
};

const createSubscription = async (membershipType, paymentMethodId) => {
  // Call backend to attach the payment method to the customer and create subscription
  const response = await fetch(`${strapiURL}/api/create-subscription`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify({
      userId: user.value.id,
      paymentMethodId,
      membershipType,
      customerName: customerName.value,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error(
      "Error subscribing:",
      errorData.message || "Error subscribing to plan"
    );
    return;
  }

  const responseData = await response.json();

  // Extract the subscription ID from the response
  const subscriptionId = responseData.subscriptionId;

  loadingSubmit.value = false;
  // Handle successful subscription
  router.push(`/payment-status?subscriptionId=${subscriptionId}`);
};

const darkStyleOptions = {
  base: {
    color: "#ffffff", // Text color
    backgroundColor: "#000000", // Background, but may not apply to Payment Element
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSize: "16px",
    "::placeholder": {
      color: "#cccccc",
    },
    // Additional styles...
  },
  invalid: {
    color: "#fa755a", // Text color for invalid input
    iconColor: "#fa755a", // Icon color for invalid input
  },
};
</script>
