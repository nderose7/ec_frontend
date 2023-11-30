<template>
  <div class="container mx-auto px-4 pb-48">
    <div class="text-center mt-10 mb-8">
      <h1 class="mb-4">Upgrade / Downgrade</h1>
      <p class="xl:w-1/2 mx-auto md:px-32 xl:px-0">
        Easily upgrade or downgrade your membership here. You will be charged a
        prorated amount when switching. Select a plan to see details.
      </p>
    </div>
    <div class="flex flex-wrap -mx-4">
      <!-- Pricing Box 1 -->
      <div class="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
        <div class="card">
          <div class="font-bold text-base mb-2 text-slate-500">
            {{ currentPlan === "basic" ? "CURRENT PLAN" : "" }}
          </div>
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
            :disabled="currentPlan === 'basic'"
            class="px-4 py-2 inline-block font-bold"
            :class="
              shownProratedPlan === 'basic'
                ? 'border rounded-lg border-brand-500 text-brand-500'
                : 'btn-primary '
            "
          >
            See Details
            <Icon
              v-if="shownProratedPlan === 'basic'"
              name="mdi:arrow-down"
              class="icon-style"
            />
            <Icon v-else name="mdi:arrow-right" class="icon-style" />
          </button>
          <div v-if="loadingDetails && shownProratedPlan === 'basic'">
            <Icon name="svg-spinners:3-dots-bounce" size="1rem" class="mt-2" />
          </div>
          <div
            v-if="shownProratedPlan === 'basic' && !loadingDetails"
            class="mt-10"
          >
            <p class="mb-2 dark:text-white">
              <b>Prorated Credit:</b>
              {{
                formatStripeAmount(
                  proratedData.upcomingInvoice.lines.data[0].amount
                )
              }}
            </p>
            <p>
              You will be charged {{ currency === "USD" ? "$" : ""
              }}{{ immediateCharge }} {{ currency }} today for the remainder of
              your current plan ({{ remainingTime.daysLeft }} days). Your next
              billing date will be {{ nextBillingDate }}.
            </p>
            <button
              class="btn-primary inline-block my-2 px-5 py-3 font-bold mt-5"
              @click="handlePaymentConfirmation('basic')"
            >
              <span v-if="paymentLoading">
                <Icon name="svg-spinners:pulse-3" class="icon-style mr-1" />
                Switching to Lite...
              </span>
              <span v-else>
                Confirm & Pay {{ currency === "USD" ? "$" : ""
                }}{{ immediateCharge }}
                {{ currency === "USD" ? "" : currency }}</span
              >
            </button>
          </div>
        </div>
      </div>

      <!-- Pricing Box 2 -->
      <div class="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
        <div class="card">
          <div class="font-bold text-base mb-2 text-slate-500">
            {{ currentPlan === "pro" ? "CURRENT PLAN" : "" }}
          </div>
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
            :disabled="currentPlan === 'pro'"
            class="px-4 py-2 inline-block font-bold"
            :class="
              shownProratedPlan === 'pro'
                ? 'border rounded-lg border-brand-500 text-brand-500'
                : 'btn-primary '
            "
          >
            See Details
            <Icon
              v-if="shownProratedPlan === 'pro'"
              name="mdi:arrow-down"
              class="icon-style"
            />
            <Icon v-else name="mdi:arrow-right" class="icon-style" />
          </button>
          <div v-if="loadingDetails && shownProratedPlan === 'pro'">
            <Icon name="svg-spinners:3-dots-bounce" size="1rem" class="mt-2" />
          </div>
          <div
            v-if="shownProratedPlan === 'pro' && !loadingDetails"
            class="mt-10"
          >
            <p class="mb-2 dark:text-white">
              <b>Prorated Credit:</b>
              {{
                formatStripeAmount(
                  proratedData.upcomingInvoice.lines.data[0].amount
                )
              }}
            </p>
            <p>
              You will be charged {{ currency === "USD" ? "$" : ""
              }}{{ immediateCharge }} {{ currency }} today for the remainder of
              your current plan ({{ remainingTime.daysLeft }} days). Your next
              billing date will be {{ nextBillingDate }}.
            </p>
            <button
              class="btn-primary inline-block my-2 px-5 py-3 font-bold mt-5"
              @click="handlePaymentConfirmation('pro')"
            >
              <span v-if="paymentLoading">
                <Icon name="svg-spinners:pulse-3" class="icon-style mr-1" />
                Switching to Standard...
              </span>
              <span v-else>
                Confirm & Pay {{ currency === "USD" ? "$" : ""
                }}{{ immediateCharge }}
                {{ currency === "USD" ? "" : currency }}</span
              >
            </button>
          </div>
        </div>
      </div>

      <!-- Pricing Box 3 -->
      <div class="w-full lg:w-1/3 px-4">
        <div class="card">
          <div class="font-bold text-base mb-2 text-slate-500">
            {{ currentPlan === "premium" ? "CURRENT PLAN" : "" }}
          </div>
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
            :disabled="currentPlan === 'premium'"
            class="px-4 py-2 inline-block font-bold"
            :class="
              shownProratedPlan === 'premium'
                ? 'border rounded-lg border-brand-500 text-brand-500'
                : 'btn-primary '
            "
          >
            See Details
            <Icon
              v-if="shownProratedPlan === 'premium'"
              name="mdi:arrow-down"
              class="icon-style"
            />
            <Icon v-else name="mdi:arrow-right" class="icon-style" />
          </button>
          <div v-if="loadingDetails && shownProratedPlan === 'premium'">
            <Icon name="svg-spinners:3-dots-bounce" size="1rem" class="mt-2" />
          </div>
          <div
            v-if="shownProratedPlan === 'premium' && !loadingDetails"
            class="mt-10"
          >
            <p class="mb-2 dark:text-white">
              <b>Prorated Credit:</b>
              {{
                formatStripeAmount(
                  proratedData.upcomingInvoice.lines.data[0].amount
                )
              }}
            </p>
            <p>
              You will be charged {{ currency === "USD" ? "$" : ""
              }}{{ immediateCharge }} {{ currency }} today for the remainder of
              your current plan ({{ remainingTime.daysLeft }} days). Your next
              billing date will be {{ nextBillingDate }}.
            </p>
            <button
              class="btn-primary inline-block my-2 px-5 py-3 font-bold mt-5"
              @click="handlePaymentConfirmation('premium')"
            >
              <span v-if="paymentLoading">
                <Icon name="svg-spinners:pulse-3" class="icon-style mr-1" />
                Switching to Unlimited...
              </span>
              <span v-else>
                Confirm & Pay {{ currency === "USD" ? "$" : ""
                }}{{ immediateCharge }}
                {{ currency === "USD" ? "" : currency }}</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { format, fromUnixTime } from "date-fns";
import { loadStripe } from "@stripe/stripe-js";
const user = useStrapiUser(); // Assuming this fetches the user data
const currentPlan = ref("");
const customerData = ref(null);
const proratedData = ref(null);
const proratedCharge = ref(null);
const currency = ref(null);
const showProratedCharge = ref(false);
const remainingTime = ref(null);
const nextBillingDate = ref(null);
const token = useStrapiToken();
const shownProratedPlan = ref(null);
const immediateCharge = ref(null);
const loadingDetails = ref(false);
const paymentLoading = ref(false);
const router = useRouter();

const {
  public: { strapiURL, stripeKey },
} = useRuntimeConfig();

onMounted(async () => {
  const response = await fetch(`${strapiURL}/api/get-stripe-data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify({ stripeCustomerId: user.value?.stripeCustomerId }), // Replace with actual property
  });
  const data = await response.json();
  customerData.value = data;

  if (data.subscriptions && data.subscriptions.length > 0) {
    // Assuming the first subscription is the current one
    currentPlan.value = data.subscriptions[0].membershipType; // Replace with actual property if different
  }
});

const calculateImmediateCharge = async (newMembershipType) => {
  loadingDetails.value = true;
  const response = await fetch(`${strapiURL}/api/calculate-immediate-charge`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },

    body: JSON.stringify({
      currentSubscriptionId: customerData.value.subscriptions[0].subscriptionId,
      newMembershipType, // Send the membership type
    }),
  });
  const data = await response.json();
  immediateCharge.value = data.immediateCharge.toFixed(2);
  loadingDetails.value = false;
};

const handleSubscription = async (newMembershipType) => {
  const response = await fetch(`${strapiURL}/api/preview-plan-change`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },

    body: JSON.stringify({
      currentSubscriptionId: customerData.value.subscriptions[0].subscriptionId,
      newMembershipType, // Send the membership type
    }),
  });
  const data = await response.json();
  proratedData.value = data;
  proratedCharge.value = data.proratedAmount;
  currency.value = data.currency.toUpperCase();
  remainingTime.value = calculateTimeLeftOnPlan(data);
  nextBillingDate.value = calculateNextBillingDate(data);
  shownProratedPlan.value = newMembershipType;
  calculateImmediateCharge(newMembershipType);
  showProratedCharge.value = true;
};

function calculateTimeLeftOnPlan(subscriptionData) {
  console.log(subscriptionData);
  const currentTime = Math.floor(Date.now() / 1000);
  console.log("Current Time: ", currentTime);
  const periodEnd = subscriptionData.upcomingInvoice.lines.data[0].period.end;
  console.log("Period End: ", periodEnd);

  // Convert periodEnd to a timestamp if it's not already in that format
  const periodEndTime = new Date(periodEnd).getTime() / 1000;
  console.log(periodEndTime);

  if (currentTime > periodEnd) {
    console.log("subscription ended... ");
    // Subscription period has ended
    return { daysLeft: 0, hoursLeft: 0, minutesLeft: 0 };
  }

  const timeLeftInSeconds = periodEnd - currentTime;
  console.log("Time left in seconds: ", timeLeftInSeconds);
  const daysLeft = Math.floor(timeLeftInSeconds / (24 * 3600));
  const hoursLeft = Math.floor((timeLeftInSeconds % (24 * 3600)) / 3600);
  const minutesLeft = Math.floor((timeLeftInSeconds % 3600) / 60);

  return { daysLeft, hoursLeft, minutesLeft };
}

function calculateNextBillingDate(subscriptionData) {
  const nextBillingDateInSeconds =
    subscriptionData.upcomingInvoice.lines.data[0].period.end;

  // Convert Unix timestamp to JavaScript Date object
  const nextBillingDate = fromUnixTime(nextBillingDateInSeconds + 86400);
  const formattedDate = format(nextBillingDate, "EEE, MMM dd, yyyy");

  return formattedDate;
}

const handlePaymentConfirmation = async (newMembershipType) => {
  paymentLoading.value = true;
  // Prepare the data to be sent to the backend
  const payload = {
    currentSubscriptionId: customerData.value.subscriptions[0].subscriptionId,
    newMembershipType,
  };

  // API call to your backend to process the payment and update the subscription
  try {
    const response = await fetch(`${strapiURL}/api/update-subscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to update subscription");
    }

    // Handle successful subscription update
    const responseData = await response.json();
    console.log("Subscription updated successfully:", responseData);
    router.push("/settings/billing");
    // Perform any additional actions like redirecting the user or showing a success message
  } catch (error) {
    paymentLoading.value = false;
    console.error("Error updating subscription:", error);
  }
};

function formatStripeAmount(amount) {
  // Divide by 100 to convert from cents to dollars
  let formattedAmount = amount / 100;

  // Format to 2 decimal places
  formattedAmount = formattedAmount.toFixed(2);

  // Return as a string
  return formattedAmount;
}

useSeoMeta({
  title: "Upgrade / Downgrade",
});
</script>
