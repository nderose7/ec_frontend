<template>
  <div class="container mx-auto px-4">
    <div class="text-center my-10">
      <h1>Create More Recipes.</h1>
    </div>
    <div v-if="!showPayment" class="flex flex-wrap -mx-4">
      <!-- Pricing Box 1 -->
      <div class="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
        <div class="rounded-lg border border-gray-200 p-6">
          <button @click="redirectToCheckout('basic')" class="link">
            <h2 class="mb-2">50 Credits / Month</h2>
          </button>
          <p>
            Get 50 credits for creating any kind of recipe you can think of.
          </p>
          <h3 class="my-4">$4.99 / month</h3>
          <button
            @click="redirectToCheckout('basic')"
            class="btn-primary px-4 py-2 inline-block font-bold"
          >
            Choose Plan <Icon name="mdi:arrow-right" class="icon-style" />
          </button>
        </div>
      </div>

      <!-- Pricing Box 2 -->
      <div class="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
        <div class="rounded-lg border border-gray-200 p-6">
          <button @click="redirectToCheckout('pro')" class="link">
            <h2 class="mb-2">120 Credits / Month</h2>
          </button>
          <p>
            Get 120 credits for creating any kind of recipe you can think of +
            no ads.
          </p>
          <h3 class="my-4">$9.99 / month</h3>
          <button
            @click="redirectToCheckout('pro')"
            class="btn-primary px-4 py-2 inline-block font-bold"
          >
            Choose Plan <Icon name="mdi:arrow-right" class="icon-style" />
          </button>
        </div>
      </div>

      <!-- Pricing Box 3 -->
      <div class="w-full lg:w-1/3 px-4">
        <div class="rounded-lg border border-gray-200 p-6">
          <button @click="redirectToCheckout('premium')" class="link">
            <h2 class="mb-2">Unlimited Credits</h2>
          </button>
          <p>
            Create as many recipes as your heart desires with our Unlimited plan
            + no ads.
          </p>
          <h3 class="my-4">$16.99 / month</h3>
          <button
            @click="redirectToCheckout('premium')"
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
      <form id="payment-form">
        <div id="payment-element">
          <!-- The Stripe Payment Element will be inserted here -->
        </div>
        <button
          v-if="showPayment"
          type="submit"
          class="btn-primary px-6 py-2 inline-block mt-6"
        >
          Pay Now
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { loadStripe } from "@stripe/stripe-js";

const user = useStrapiUser();
const router = useRouter();

const showPayment = ref(false);

const {
  public: { strapiURL, stripeKey },
} = useRuntimeConfig();

const stripePromise = loadStripe(stripeKey);

const redirectToCheckout = async (membershipType) => {
  try {
    const userId = user.value.id;
    const token = useStrapiToken();

    // Fetch the client secret for the payment intent
    const checkoutResponse = await fetch(`${strapiURL}/api/membership-type`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({ membershipType, userId }),
    });

    const checkoutData = await checkoutResponse.json();
    if (!checkoutResponse.ok || !checkoutData.stripeClientSecret) {
      throw new Error("Error fetching payment details");
    }

    // Initialize Stripe
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error("Stripe initialization failed");
    }

    // Create Elements group with the clientSecret
    const elements = stripe.elements({
      clientSecret: checkoutData.stripeClientSecret,
    });

    // Create a PaymentElement and mount it to the DOM
    const paymentElement = elements.create("payment");
    paymentElement.mount("#payment-element");
    showPayment.value = true;

    // Handle form submission
    const form = document.getElementById("payment-form");
    form.addEventListener("submit", async (event) => {
      console.log("Submitting form...");
      event.preventDefault();

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + "/payment-status",
        },
        redirect: "if_required",
      });

      if (error) {
        // Handle payment errors
        console.error("Payment error:", error.message);
      } else {
        if (paymentIntent && paymentIntent.status === "succeeded") {
          router.push(`/payment-status?paymentIntentId=${paymentIntent.id}`);
        }
      }
    });
  } catch (error) {
    console.error("Checkout error:", error.message);
  }
};
</script>
