<template>
  <div
    id="landing-managed"
    class="h-full px-4 text-center dark:bg-midnight-900 bg-slate-100"
  >
    <div class="h-screen flex lg:pt-32 justify-center">
      <div class="xl:w-1/3 lg:w-1/3 min-w-[320px]">
        <Icon name="bx:envelope" size="8rem" class="mb-4 text-brand-500" />
        <h1 class="mb-5">Please confirm your email address.</h1>
        <p>
          Click the link in the email we just sent you to confirm your email
          address.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  meta: [{ name: "robots", content: "noindex" }],
});
</script>
