<template>
  <div class="px-5 xl:w-1/2 mx-auto page-style mt-5 pb-48">
    <button
      type="button"
      @click.prevent="$router.back()"
      class="mb-4 btn-gray btn-sm"
    >
      &larr; Back
    </button>
    <h1>Privacy Agreement</h1>

    <h2>Personal Information Collection and Use</h2>
    EatClassy.com now offers user registration and a subscription service. By
    registering, you agree to provide personal information such as your name,
    email address, and payment information. This information will be used to
    manage your subscription, process payments, and communicate with you about
    your account and services. We also collect non-personally identifiable
    information, like your IP address, browser type, and pages visited, to
    analyze trends and tailor our website's performance.

    <h2>Cookies and Tracking Technologies</h2>
    <p>
      To offer a more personalized experience, we use cookies and similar
      tracking technologies. These tools store information about your
      preferences and past activity on our site to recognize your browser and
      provide a more seamless experience. You may disable cookies, but this may
      limit your use of certain website features.
    </p>

    <h2>Third-Party Advertising, Analytics, and Subscription Management</h2>
    <p>
      We collaborate with third-party services to display ads, perform
      analytics, and manage subscriptions. These partners may use various
      tracking technologies to collect data on your interactions with our
      website and others, to deliver targeted advertising and to help us
      understand our audience better.
    </p>

    <h2>Affiliate Marketing and Subscriber Benefits</h2>
    <p>
      We engage in affiliate marketing and offer exclusive deals to subscribers.
      Purchases made via affiliate links may earn us a commission at no extra
      cost to you. Subscriber data may be used to provide personalized offers
      and promotions.
    </p>

    <h2>Subscription Terms and Privacy Policy Changes</h2>
    <p>
      Subscription terms, including fees, services, and the period of
      subscription, are subject to change. We also reserve the right to amend
      our Privacy Policy as necessary. Your continued use of the site and
      subscription service following any changes indicates your consent to the
      new terms.
    </p>

    <h2>Contact and Feedback</h2>
    <p>
      For questions or feedback regarding our Privacy Policy, subscription
      services, or any other inquiry, please reach out to us at
      hello@eatclassy.com. Your feedback helps us to improve our services and
      support our community.
    </p>
  </div>
</template>

<style scoped>
h2 {
  @apply my-4 mt-8;
}
</style>

<script setup>
const router = useRouter();
</script>
