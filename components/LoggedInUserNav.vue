<template>
  <div class="logged-in-user-nav">
    <div v-if="userNavLoading">
      <Icon name="svg-spinners:bars-scale" size="1.5rem" class="" />
    </div>
    <div v-if="!userNavLoading" class="flex items-center gap-4">
      <div v-if="freeCreditsLeft !== 0">
        <p class="">
          <b>{{ freeCreditsLeft }} </b> free
          {{ freeCreditsLeft === 1 ? "credit" : "credits" }} left
        </p>
      </div>
      <div>
        <button
          v-if="!hasAvatar"
          @click="openUser = !openUser"
          class="user-button ml-1 inline-block rounded-full"
          :class="{
            ' ': openUser,
          }"
        >
          <Icon
            name="carbon:user-avatar-filled-alt"
            size="2.5rem"
            class="icon-style mx-1 lg:mx-0 text-brand-500 hover:text-slate-500 dark:hover-midnight-200"
          />
        </button>

        <button
          v-if="hasAvatar"
          @click="openUser = !openUser"
          class="user-button mr-0 ml-1 inline-block rounded-full font-bold"
          :class="{
            ' hover:bg-midnight-300  dark:hover:bg-midnight-900': openUser,
          }"
        >
          <img
            :src="userData?.data[0]?.attributes?.avatar?.data?.attributes?.url"
            class="inline-block h-[40px] w-[40px] cursor-pointer rounded-full border border-slate-100 hover:opacity-80 dark:border-midnight-100"
          />
        </button>

        <div
          id="userNav"
          class="absolute right-0 top-[62px] z-30 rounded-lg border border-gray-200 bg-white p-8 text-left text-lg font-semibold drop-shadow dark:border-brand-500 dark:bg-midnight-600 min-w-[320px]"
          v-show="openUser"
        >
          <div class="mb-4 border-b pb-5 dark:border-gray-700">
            <div class="font-bold">
              <Icon name="bx:user" class="icon-style mr-2" />{{
                fullName
                  ? truncateString(fullName, 24)
                  : truncateString(user?.username, 24)
              }}
            </div>
            <div>
              <Icon name="mdi:email-outline" class="icon-style mr-2" />{{
                user?.email ? truncateString(user?.email, 24) : ""
              }}
            </div>
            <NuxtLink
              to="/settings/billing"
              v-if="!user.freeAccount"
              class="mt-3 p-1 px-3 inline-block rounded-full bg-green-100 dark:bg-midnight-900 dark:text-brand-500 w-fit"
            >
              <Icon name="bx:check-circle" class="icon-style" /> Paid Member:
              {{ membershipType }}
            </NuxtLink>
            <div
              v-else
              class="mt-3 p-1 px-4 rounded-full bg-slate-100 dark:bg-midnight-900 w-fit"
            >
              <Icon name="bx:check-circle" class="icon-style" /> Free Account
              &nbsp;
              <NuxtLink
                to="/membership"
                class="link text-base"
                @click="openUser = !openUser"
                >Upgrade</NuxtLink
              >
            </div>
          </div>

          <label class="mr-5"
            ><Icon
              name="codicon:color-mode"
              class="icon-style mr-1"
              size="1rem"
            />
            Color Mode:</label
          >

          <ColorMode />
          <div class="mb-4 border-b pb-4 dark:border-gray-700"></div>
          <NuxtLink
            @click="openUser = !openUser"
            to="/settings/profile"
            class="mt-2 block py-1"
          >
            <Icon name="bx:cog" class="icon-style mr-1 lg:mx-0" /> Account
            Settings
          </NuxtLink>

          <NuxtLink @click="logoutUser()" class="block cursor-pointer py-1">
            <Icon name="mdi:logout" class="icon-style mr-1 lg:mx-0" />
            <span class="ml-1 inline-block"> Logout </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { truncateString } from "~/utils/truncateString.js";
const user = useStrapiUser();
const router = useRouter();

let openUser = ref();
const { logout } = useStrapiAuth();

const userNavLoading = ref(false);

const logoutUser = () => {
  logout();
  //findUserData();
  router.push("/");
};

const { find } = useStrapi();
const userData = ref(null);
const userDataError = ref(null);

const findUserData = async () => {
  userNavLoading.value = true;
  try {
    const result = await find("userdatas", {
      populate: ["avatar"],
      filters: {
        owner: user.value?.id,
      },
    });
    userData.value = result;
  } catch (error) {
    userDataError.value = error;
    console.error("Error fetching userData:", error);
  }
  userNavLoading.value = false;
};

onMounted(async () => {
  findUserData();
});

if (userDataError.value) {
  console.error("Error fetching userData:", userDataError.value);
}

const fullName = computed(() => {
  if (user.value?.fullName) {
    return user.value.fullName;
  }
  return null;
});

const hasAvatar = computed(() => {
  if (userData?.value?.data[0]?.attributes?.avatar?.data) {
    return true;
  }
  return false;
});

const membershipType = computed(() => {
  if (user.value.paidMembershipTierOne) {
    return "50/month";
  } else if (user.value.paidMembershipTierTwo) {
    return "120/month";
  } else if (user.value.paidMembershipTierThree) {
    return "Unlimited";
  }
  return false;
});
</script>
