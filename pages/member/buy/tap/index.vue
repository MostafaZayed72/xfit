<template>
   <main v-if="membership">
      <div class="text-center mship md:mb-16">
         <p class="">
            <NuxtLink class="text-sm md:text-5xl" to="/">{{ $t("Home", "الرئيسية") }}</NuxtLink>
            <span class="mx-2 text-sm md:text-5xl">/</span>
            <NuxtLink class="text-sm md:text-5xl" to="/member/memberships">
               {{ $t("My memberships", "اشتراكاتي") }}
            </NuxtLink>
            <span class="mx-2 text-sm md:text-5xl">/</span>
            <span class="text-sm md:text-5xl">{{ $t("Membership information", "معلومات اشتراك") }}</span>
         </p>
      </div>
      <hr class="my-5" />
      <CommonXfitLoader v-if="membership?.isLoading && !membership?.data" />
      <div class="bg-[var(--c3)] rounded-xl mb-4 shadow-lg p-5 main-card" v-else>
         <MembershipInformation :membership="membership?.data" />
         
         <section class="text-end mt-3">
            <nuxt-link class="underline" to="/member/memberships/view">
               {{ $t("Change payment method", "تغيير طريقة الدفع") }}
            </nuxt-link>
         </section>
         <section>
            <hr class="my-4" />
            <h4 class="mb-5">
               {{ $t("Payment", "الدفع") }}
            </h4>
            <!-- payment container that the plugin inject the card container into  -->
            <form id="form-container" method="post" @submit.prevent="generateToken">
               <!-- Tap element will be here -->
               <div id="element-container"></div>
               <div id="error-handler" role="alert"></div>
               <div id="success" style="display: none; position: relative; float: left;">
                  Success! Your token is <span id="token"></span>
               </div>
               <!-- Tap pay button -->
               <button id="tap-btn" class="w-20 py-1 text-center rounded bg-cyan-500 choose mt-6 mx-auto" :disabled="loading">
                  <template v-if="loading">Loading ... </template>
                  <template v-else> {{ $t("Confirm", "تأكيد") }}</template>
               </button>
            </form>
            <div class="flex flex-col-reverse md:flex-row justify-center gap-4 items-center mt-10">
               <p class="text-center text-cyan-500">
                  <span class="text-sm inline-block me-1">
                     {{
                        $t(
                           "Clicking the Pay button means agreeing to all the terms and conditions.",
                           "الضغط على زر التأكيد ، يعني الموافقة على جميع الشروط والاحكام"
                        )
                     }}
                  </span>
                  <a class="text-sm" href="#" data-toggle="modal" data-target="terms-and-conditions-modal">
                     {{
                        $t(
                           "and it can be viewed from here.",
                           "ويمكن الاطلاع عليها من هنا"
                        )
                     }}
                  </a>
               </p>
              

            </div>
         </section>
      </div>
      <!-- Terms and conditions modal -->
      <CommonModal class="main-card" :title="$t('Terms and conditions', 'الاحكام والشروط')" modalID="terms-and-conditions-modal">
         <div>
            <p v-for="term in membershipTerms" :key="term">
               <small>{{ $t(term) }}</small>
            </p>
            <CommonModalHR />
            <div class="text-end">
               <ButtonsCloseModal>{{ $t("Close", "إغلاق") }}</ButtonsCloseModal>
            </div>
         </div>
      </CommonModal>
   </main>
</template>
<script setup lang="ts">
import { useGetMembership } from "@/composables/memberships/useGetMembership";
import { membershipTerms } from '~/assets/data/membershipTerms';
import { useTap } from "~/composables/tap/useTap";
import { useMembershipTapChargeApplePay } from "~/composables/tap/useMembershipTapChargeApplePay"
import { notify } from "@/composables/common/useNotifications";

// get the membership data from the api first
const membership = ref();
const getMembership = () => {
   membership.value = useGetMembership();
   if (!membership.value) {
      navigateTo('/member/memberships');
   }
};
getMembership();
const terms = computed(() => membershipTerms);

const submitDisabled = ref(false);

// tap payment
const { init } = useTap();
const loading = ref(false);
const tabInit = ref<{
   card: any,
   tap: any
}>();
onMounted(async () => {
   await nextTick();
   tabInit.value = init('ltr');
})

watch(() => tabInit.value?.card, () => {
   if (!tabInit.value?.card) return ;
   const card = tabInit.value.card
   card.addEventListener('change', function (event) {
      if (event.loaded) {
         console.log("UI loaded :" + event.loaded);
         console.log("current currency is :" + card.getCurrency())
      }
      const displayError = document.getElementById('error-handler');
      if (!displayError) return ;
      if (event.error) {
         displayError.textContent = event.error.message;
      } else {
         displayError.textContent = '';
      }
   });
})

async function generateToken() {
   try {
      loading.value = true;
      if (!tabInit.value) {
         throw new Error('Failed to initialize Tap');
      }
      console.log(tabInit.value.card);
      const res = await tabInit.value.tap.createToken(tabInit.value.card)
      console.log('generate token response', res);
      if (!res) {
         throw new Error('Failed to generate token');
      }
      if (res.error)
      {
         throw new Error(res.error.message);
      }
      await charge(res.id);
   } catch (err) {
      console.log(err);
      // @ts-expect-error err of type unknown
      notify('danger', [err.message]);
   } finally {
      loading.value = false;
   }
}

async function charge(generatedTokenId: string) {
   try {
      loading.value = true;
      const res = await useMembershipTapChargeApplePay(
         {
            membership_id: membership.value.data.id,
            token_id: generatedTokenId,
         }
      )
      const url = res.data?.value?.url;
      if (!url) {
         throw res.error;
      }
      notify('success',['Please wait while you are redirected to the payment gateway.']);
      location.replace(url);
   } catch (err) {
      // @ts-expect-error err of type unknown
      console.log(err.response.data.errors.email[0]);
      // @ts-expect-error err of type unknown
      notify('danger', [err.response.data.errors.email[0] || 'Failed to charge via tap. please contact the support.']);
   } finally {
      loading.value = false;
   }
}


</script>
<style scoped>
iframe {
   min-height: 170px;
}

input:focus::placeholder {
   opacity: 0;
}
</style>