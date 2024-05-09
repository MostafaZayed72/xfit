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
               {{ $t("payment", "الدفع") }}
            </h4>


            <div class="my-10 flex flex-col justify-center">
               <div class="flex items-center gap-2">
                  <Icon class="text-4xl" name="material-symbols:credit-card-outline-sharp" />
                  <input style="border-bottom: 1px solid;" type="text" placeholder="Card Number">
               </div>
               <div class="flex items-center gap-2 mt-6">
                  <Icon class="text-4xl" name="fa6-brands:cc-visa" />
                  <div class="flex items-center w-100 gap-4"><input style="border-bottom: 1px solid;" type="text" placeholder="MM/YY">
                     <input style="border-bottom: 1px solid;" type="text" placeholder="CVV">
                  </div>
               </div>
               <div class="flex items-center gap-2 mt-6">
                  <Icon class="text-4xl" name="logos:mastercard" />
                  <input style="border-bottom: 1px solid;" type="text" placeholder="Card Holder Name">
               </div>

            </div>


            <div class="flex flex-col-reverse md:flex-row justify-center gap-4 items-center">
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
               <div class="flex justify-center gap-4 items-center">
                  <h1>{{ $t('Package price:', 'سعر الباقة:') }} {{ membership.data?.price }} {{ $t('SAR', 'ريال') }}
                  </h1>
                  <ButtonsPrimary :isLoading="loading" class="w-24 bg-cyan-500 choose" @click="charge">
                     {{ $t("Confirm", "تأكيد") }}
                  </ButtonsPrimary>
               </div>
            </div>
         </section>
      </div>
      <!-- Terms and conditions modal -->
      <CommonModal :title="$t('Terms and conditions', 'الاحكام والشروط')" modalID="terms-and-conditions-modal">
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
const { init, createToken } = useTap();
const tabInit = ref();
const generatedToken = ref();

onMounted(() => {
   tabInit.value = init();
})

async function generateToken() {
   if (submitDisabled.value) return
   generatedToken.value = await createToken(
      tabInit.tab,
      tabInit.card
   );
   submitDisabled.value = true;
}

const loading = ref();
async function charge() {
   try {
      loading.value = true;
      const res = await useMembershipTapChargeApplePay(
         {
            membership_id: membership.value.data.id,
            token_id: 'src_apple_pay',
         }
      )
      const url = res.data?.value?.url;
      if (!url) {
         throw res.error;
      }
      location.replace(url);
   } catch (err) {
      console.log(err.response.data.errors.email[0]);
      notify('danger', [err.response.data.errors.email[0]]);
   } finally {
      loading.value = false;
   }
}

// const apple= ()=>{
//    navigateTo('https://checkout.beta.tap.company/?mode=page&themeMode=&language=en&token=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY2MzdkZjMxN2RjM2Q5MDgxNDg4YTZkNiJ9.T9xnbQR86Nnb4-iwS3XN4hkaDUcCx0hND_PrHMM6IjE', { external: true })
// }
</script>
<style scoped>
iframe {
   min-height: 170px;
}

input:focus::placeholder {
   opacity: 0;
}
</style>