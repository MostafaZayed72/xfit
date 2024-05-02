<template>

   <main>
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
         <hr class="my-4" />
         <!-- PAYMENT SECTION -->
         <div>
            <h1 class="text-2xl">{{ $t('Payment', 'الدفع') }}</h1>
            <div class="flex items-center gap-2">
               <Icon class="text-3xl" name="octicon:credit-card" />
               <input style="border-bottom: 1px solid;" type="text" placeholder="Card Number">
            </div>
            <div class="flex items-center gap-2">
               <Icon class="text-6xl" name="fa6-brands:cc-visa" />
               <input style="border-bottom: 1px solid;" type="text" placeholder="MM/YY">
               <input style="border-bottom: 1px solid;" type="text" placeholder="CVV">
            </div>
            <div class="flex items-center gap-2">
               <Icon class="text-3xl" name="logos:mastercard" />
               <input style="border-bottom: 1px solid;" type="text" placeholder="Card Holder Name">
            </div>
            <div class="mt-6 flex items-center justify-between">
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
               <div class="flex items-center gap-4">
                  <h1>{{ $t('Package price:' , 'سعر الباقة:') }} {{ membership.data.price }} {{ $t('SAR', 'ريال') }}</h1>
                  <ButtonsPrimary class="w-24 bg-cyan-500 choose" @click="startTabbyPayment(payment_type.web_url)">
                     {{ $t("Confirm", "تأكيد") }}
                  </ButtonsPrimary>
               </div>
            </div>
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
      </div>

   </main>
</template>

<script setup>
import { membershipTerms } from "@/utils/membershipTerms";
// import { lang } from "@/composables/user/useUser";
import { useGetMembership } from "@/composables/memberships/useGetMembership";
import { useGetTamaraPaymentTypes } from "@/composables/tamara/useGetTamaraPaymentTypes";
import { useStartTamaraPayment } from "@/composables/tamara/useStartTamaraPayment";
import { notify } from "@/composables/common/useNotifications";

const membership = ref();
const tamara_payment_types = ref([]);

onBeforeMount(() => {
   getMembership();
});

const getMembership = () => {
   membership.value = useGetMembership();
};

const getTamaraPaymentTypes = () => {
   tamara_payment_types.value = useGetTamaraPaymentTypes(
      membership.value?.data.price
   );
};

const startTamaraPaymentRequest = ref();
const startTamaraPayment = (payment_type) => {
   startTamaraPaymentRequest.value = useStartTamaraPayment(payment_type);
};

watch(
   () => membership.value?.isFinished,
   () => {
      if (membership.value.isFinished && !membership.value.error)
         getTamaraPaymentTypes();
   }
);

watch(
   () => startTamaraPaymentRequest.value?.isFinished,
   () => {
      if (
         startTamaraPaymentRequest.value.isFinished &&
         !startTamaraPaymentRequest.value.error
      ) {
         notify("success", ["You will be redirect to Tamara"]);
         setTimeout(function () {
            window.location.replace(
               startTamaraPaymentRequest.value.data.checkout_url
            );
         }, 1000);
      }
   }
);
</script>

<style scoped>
iframe {
   min-height: 170px;
}

input:focus::placeholder {
   opacity: 0;
   /* أو يمكنك استخدام visibility: hidden; */
}
</style>
