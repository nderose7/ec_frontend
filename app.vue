<template>
  <NuxtLayout>
    <SeoKit />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// Create a reactive object to store user data
const userData = reactive({
  freeCreditsLeft: 0, // Initialize with a default value
});

// Provide this object to any component in the application
provide("userData", userData);
</script>

<style>
body {
  font-family: "Urbanist", sans-serif;
  @apply bg-white text-slate-700 text-lg h-full;
}
.dark body {
  @apply bg-midnight-800 text-slate-400;
}

.card {
  @apply drop-shadow rounded-lg p-6 pt-5 my-4 bg-slate-100 border-transparent dark:bg-midnight-700 border dark:border-midnight-400;
}
.search-style {
  @apply border-b dark:border-midnight-200 my-5 mt-5 pb-6 relative px-5;
}
.btn-primary {
  @apply dark:text-white text-white dark:bg-brand-500 bg-brand-500 hover:bg-brand-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75;
}
.btn-outline {
  @apply border px-3 py-1 text-brand-500 dark:border-brand-500 border-brand-500 hover:bg-brand-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 hover:text-white;
}
.btn-outline-filled {
  @apply border px-3 py-1  bg-brand-500 text-white dark:border-brand-500 border-brand-500 hover:bg-brand-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75;
}
.btn-white {
  @apply rounded-lg dark:text-slate-400 bg-white border border-slate-300 dark:border-midnight-100 px-6 pt-[5px] pb-2 text-center text-lg font-bold  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-midnight-400 dark:hover:bg-midnight-200 dark:focus:ring-gray-800 hover:dark:text-white;
}
.btn-gray {
  @apply rounded-lg dark:text-slate-400 bg-slate-100 border border-slate-300 dark:border-midnight-100 px-6 pt-[5px] pb-2 text-center text-lg font-bold  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-midnight-400 dark:hover:bg-midnight-200 dark:focus:ring-gray-800 hover:dark:text-white;
}
.btn-danger {
  @apply bg-red-600 dark:bg-red-800 text-white px-6 py-3 rounded-lg font-bold;
}
button:disabled {
  @apply opacity-40;
}
.btn-sm {
  @apply px-3 pt-[2px] pb-[4px] text-base rounded-lg;
}
.btn-md {
  @apply px-4 pt-[3px] pb-[6px] text-lg rounded-lg;
}
.btn-lg {
  @apply px-6 pt-[6px] pb-[9px] text-lg rounded-lg;
}
.btn-responsive {
  @apply px-3 pt-[2px] pb-[4px] text-base lg:pt-[6px] lg:pb-[8px] lg:text-lg;
}
form label {
  @apply block font-bold mb-1;
}
form .checkbox label {
  @apply cursor-pointer;
}
.form-control input[type="text"],
.form-control input[type="email"],
.form-control input[type="password"],
.form-control input[type="phone"],
.form-control input[type="date"],
.form-control textarea,
.form-control select,
.form-control input[type="number"] {
  @apply dark:bg-midnight-900 bg-white border border-neutral-300 dark:border-midnight-200 w-full dark:text-gray-200 mb-1 pl-3 pr-2 py-3 active:border-brand-500 focus-visible:outline-none focus-visible:border-brand-500;
}
.form-control select {
  @apply pr-14 py-2  pl-4;
  background-image: url("~/assets/icons/caret.svg");
  appearance: none;
  background-repeat: no-repeat;
  background-position: calc(100% - 12px);
  background-size: 16px;
}
.form-control input.showoff,
.form-control textarea.showoff {
  @apply border-brand-500;
}
h1 {
  @apply text-4xl font-bold;
}
h2 {
  @apply text-2xl font-bold;
}
h3 {
  @apply text-xl font-bold;
}
h4 {
  @apply text-lg font-bold;
}
h5 {
  @apply text-base font-bold;
}
ul li {
  @apply my-1;
}
ul.extra-space li {
  @apply my-2;
}
ul.no-space li {
  @apply my-0;
}
img {
  max-width: 100%;
}
p.lead {
  @apply text-xl;
}

.icon-style {
  @apply relative top-[-2px];
}
input[type="radio"] {
  @apply mr-1;
}
input[type="checkbox"] {
  @apply w-4 h-4;
}
button.link,
.link {
  @apply text-brand-500 dark:text-brand-500 font-bold;
}
.router-link-active.link-active-underline {
  @apply border-b dark:border-slate-600 pb-1 dark:text-slate-200;
}
.logo {
  @apply text-4xl;
}
.page-style h1,
.page-style h2,
.page-style h3,
.page-style h4,
.page-style h5 {
  @apply mb-3;
}
.page-style ul {
  @apply mb-6;
}
.h-screen-minus-header {
  /*height: 100vh; /* Default height */
  @screen lg {
    /* Tailwind's way to apply media queries */
    height: calc(100vh - 190px); /* Adjusted height for large screens */
  }
}
.dark .toast-style {
  @apply text-white;
  background: #161a20 !important;
  font-size: 16px;
}

h2.swal2-title {
  font-size: 20px !important;
  margin-bottom: 4px !important;
  margin-left: 16px !important;
  margin-top: 0 !important;
}

.dark .swal2-icon.swal2-success [class^="swal2-success-line"] {
  background-color: #a5fca9 !important;
}

.dark .swal2-icon.swal2-success .swal2-success-ring {
  border-color: rgba(114, 246, 104, 0.3) !important;
}

::placeholder {
  @apply italic;
}
</style>
