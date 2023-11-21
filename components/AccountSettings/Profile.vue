<template>
  <div class="w-full pb-20 px-5">
    <Form class="vue-form form-control rounded-lg text-left" @submit="onSubmit">
      <div class="">
        <div class="mb-5 w-full text-lg">
          <label for="fullName" class="block font-bold">Full Name</label>
          <Field
            name="fullName"
            type="text"
            class="rounded-lg"
            id="fullName"
            v-model="fullName"
          />
        </div>
      </div>
      <label for="email" class="block pt-0 font-bold">Your Email</label>
      <div
        class="mb-5 rounded-xl bg-slate-200 px-8 pt-8 pb-6 dark:bg-midnight-600"
      >
        <div class="mb-2 text-lg">
          <div class="relative">
            <input
              type="email"
              class="rounded-lg font-semibold text-slate-500"
              v-model="userEmail"
              :disabled="user.provider == 'google'"
              :class="user.provider == 'google' ? 'cursor-not-allowed' : ''"
            />
            <Icon
              v-if="user.provider == 'google'"
              name="bx:lock"
              class="absolute right-5 top-3"
            />
          </div>

          <span
            v-if="user.provider == 'google'"
            class="mt-2 mr-3 inline-block font-bold"
          >
            <Icon name="logos:google-icon" class="icon-style mr-1" />
            Google Linked Account
          </span>

          <span
            v-if="user.confirmed"
            class="mx-1 mt-2 inline-block font-bold text-green-600"
          >
            <Icon name="bx:envelope" class="icon-style" />
            Confirmed
          </span>
        </div>

        <NuxtLink
          v-if="!user.provider"
          to="/reset-password"
          class="mt-5 mb-4 block rounded-lg bg-slate-300 p-2 text-center text-lg font-bold dark:bg-midnight-200 dark:text-indigo-400"
          >Reset Password</NuxtLink
        >
      </div>
      <div class="relative mt-10 my-6 text-lg">
        <label for="username" class="block font-bold">Your Username</label>
        <div class="relative">
          <input
            type="text"
            v-model="username"
            class="rounded-lg font-semibold text-slate-500"
            maxLength="48"
          />
        </div>
      </div>

      <label for="fullName" class="block font-bold">Avatar</label>
      <div
        class="mb-5 rounded-xl bg-slate-200 px-8 pt-8 pb-2 dark:bg-midnight-600"
      >
        <div class="gap-5 md:flex">
          <div
            class="mb-5 w-full text-lg"
            :class="`${
              userData?.data[0]?.attributes?.avatar?.data ? 'lg:flex' : ''
            }`"
          >
            <label
              for="files"
              class="pt-1 md:w-[100px]"
              v-if="userData?.data[0]?.attributes?.avatar?.data"
            >
              <img
                v-if="userData.data[0].attributes.avatar.data"
                :src="`${userData?.data[0]?.attributes?.avatar?.data?.attributes?.url}`"
                alt="avatar"
                class="h-[60px] w-[60px] cursor-pointer rounded-full"
              />
            </label>
            <div class="w-full">
              <h3 class="font-bold text-2xl lg:text-3xl">Upload new avatar:</h3>
              <p class="pt-0 pb-3 text-base">100x100, 1 MB limit</p>
              <input type="file" name="files" id="files" ref="fileInput" />
              <p v-if="uploading">Uploading...</p>
              <span
                v-if="uploadError"
                class="mt-3 inline-block text-base"
                role="alert"
              >
                {{ uploadError }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <button
          class="btn-primary my-12 py-4 block font-bold w-full text-xl max-w-[200px] mx-auto"
          type="submit"
        >
          Save
        </button>
      </div>
    </Form>
  </div>
</template>

<style scoped>
label {
  font-size: 22px;
  padding-bottom: 0.75rem;
}
input::file-selector-button {
  font-weight: bold;
  color: white;
  padding: 0.1rem 0.75rem;
  margin-right: 0.75rem;
  border-radius: 20px;
  border: thin solid;
  cursor: pointer;
  @apply bg-brand-500 hover:bg-brand-600 border-brand-500;
}
input::file-selector-button:active,
input::file-selector-button:focus {
  @apply border border-brand-500 bg-brand-600;
}
</style>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import swalMixins from "~/mixins/swalMixins";
const { Toast } = swalMixins.data();
const user = useStrapiUser();
const route = useRoute();
const { find, findOne, create, update, delete: remove } = useStrapi();

const { data: userData, refresh } = await useAsyncData("userdata", () =>
  find("userdatas", {
    populate: ["owner", "avatar"],
    filters: {
      owner: user.value?.id,
    },
  })
);

const getUserData = computed(() => {
  if (userData.value.data[0]) {
    return userData.value.data[0];
  }
  return null;
});

const getUserId = computed(() => {
  if (userData.value.data[0]) {
    return userData.value.data[0].id;
  }
  return null;
});

const fullNameValue = computed(() => {
  if (user.value?.fullName) {
    return user.value.fullName;
  }
  return "";
});

const emailValue = computed(() => {
  if (user.value?.email) {
    return user.value.email;
  }
  return "";
});

const usernameValue = computed(() => {
  if (user.value?.username) {
    return user.value.username;
  }
  return "";
});

const fileInput = ref(null);
const fullName = ref(fullNameValue.value);
const userEmail = ref(emailValue.value);
const username = ref(usernameValue.value);

/*
async function onSubmit() {
  //const formData = new FormData();
  //formData.append("files.avatar", this.avatar); // Imagine `avatar` here is inside your `data()` after upload
  try {
    await update("userdatas", userDataID.value, {
      //avatar: formData.value,
      firstName: firstName.value,
      lastName: lastName.value,
      business: business.value,
      url: url.value,
      phone: phone.value,
      //agencyName: agencyName.value,
    });
    Toast.fire({
      icon: "success",
      title: "Saved!",
    });
  } catch (error) {
    console.log(error);
    Toast.fire({
      icon: "error",
      title: "Error!",
      text: error,
    });
  }
}*/

const {
  public: { strapiURL },
} = useRuntimeConfig();

const client = useStrapiClient();
const uploading = ref(false);
const uploadError = ref(null);
const token = useStrapiToken();

// Upload avatar up api uploads and link to userdata avatar field
async function onSubmit() {
  try {
    let userDataId;
    userDataId = getUserId.value;

    console.log(user.value.id);

    const response = await fetch(`${strapiURL}/api/user/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({
        fullName: fullName.value,
        email: userEmail.value,
        username: username.value,
      }),
    });

    const maxSize = 1 * 1024 * 1024; // 1 MB
    if (fileInput.value.files.length) {
      const file = fileInput.value.files[0];
      if (file.size > maxSize) {
        uploadError.value = `Error: File size should not exceed ${
          maxSize / (1024 * 1024)
        } MB.`;
        return;
      }

      const formData = new FormData();
      formData.append("files", fileInput.value.files[0]);
      formData.append("ref", "api::userdata.userdata");
      formData.append("refId", userDataId);
      formData.append("field", "avatar");

      await client("/upload", {
        method: "POST",
        body: formData,
      });
    }
    refresh();
    Toast.fire({
      icon: "success",
      title: "Profile Saved!",
    });
  } catch (e) {
    Toast.fire({
      icon: "error",
      title: "Error:" + e,
    });
  }
}

/* Work on users/me route, keep until solved

const token = useStrapiToken();

async function onSubmitTest() {
  try {
    const token = useStrapiToken();
    await fetch("http://localhost:1343/user/me", {
      method: "PUT",
      body: JSON.stringify({
        firstName: firstName.value,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    Toast.fire({
      icon: "success",
      title: "Saved!",
    });
  } catch (error) {
    console.log(error);
    Toast.fire({
      icon: "error",
      title: "Error!",
      text: error,
    });
  }
}
*/
</script>
