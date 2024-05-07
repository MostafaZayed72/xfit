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

         <section>
            <hr class="my-4" />
            <h4 class="mb-5">
               {{ $t("Tabby payment options", "خيارات دفع تابي") }}
            </h4>
            <ButtonsPrimary class="w-24 bg-cyan-500 choose"
                     @click="startTabbyPayment(payment_type.web_url)">
                        {{ $t("Confirm", "تأكيد") }}
                     </ButtonsPrimary>

            <div>
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

<script setup>
console.log("hello")
// استرجاع البيانات من الباك اند
import * as tabbyPromo from "@/utils/tabbySnippet";
import * as tabbyCard from "@/utils/tabbyCard";

import { membershipTerms } from "@/utils/membershipTerms";
import { useGetMembership } from "@/composables/memberships/useGetMembership";
import { useStartTabbySession } from "@/composables/tabby/useStartTabbySession";
import { notify } from "@/composables/common/useNotifications";

const { $t } = useNuxtApp();
const membership = ref();
const tabbyStatus = ref();
const rejected = ref(false);
const rejectedMsg = $t("Sorry, Tabby is unable to approve this purchase. Please use an alternative payment method for your order.", "نأسف، تابي غير قادرة على الموافقة على هذه العملية. الرجاء استخدام طريقة دفع أخرى.");

onBeforeMount(() => {
   getMembership();
   startTabbySession();
   //console.log(membership.value);
   //console.log();
});




const getMembership = () => {
   membership.value = useGetMembership();
   
};

const tabbyPaymentOptions = ref();
const startTabbySession = () => {
   tabbyPaymentOptions.value = useStartTabbySession();
   
};

const startTabbyPayment = (tabbyURL) => {
   console.log(tabbyUrl,":scream")
   
};

watch(
   () => tabbyPaymentOptions.value?.isFinished,
   () => {
      
      const tabbyUrl = tabbyPaymentOptions.value?.data?.available_products?.[0].web_url
      if (!tabbyUrl)
      {
         return;
      }
      tabbyStatus.value = tabbyPaymentOptions.value?.data?.status
      const price = membership.value?.data?.price
      const lang = $t("en", "ar") 
      console.log(tabbyUrl)
   
      notify(
      "success",
     [ $t(
         "Page will be redirected to Tabby platform now.",
         "سيتم إعادة توجيه الصفحة الآن إلى منصة تابي"
      )]
       );
      location.replace(tabbyUrl);
 
     // if(tabbyStatus.value === 'created' && price){
         // tabbyCard.tabbyCard('SAR',price,lang)
         // tabbyPromo.tabbysnippet('SAR',price,lang)
      //}
      if(tabbyStatus.value === 'rejected'){
         rejected.value = true;
      }
      
   }
)

// watch(
//    () => membership.value?.isFinished,
//    () => {
//       if (membership.value.isFinished && !membership.value.error)
//       console.log(membership.value.data)
      
//    }
// );

// watch(
//    () => membership.value?.isFinished,
//    () => {
//       if (membership.value.isFinished && !membership.value.error)
//          getTamaraPaymentTypes();
//    }
// );

// watch(
//    () => startTamaraPaymentRequest.value?.isFinished,
//    () => {
//       if (
//          startTamaraPaymentRequest.value.isFinished &&
//          !startTamaraPaymentRequest.value.error
//       ) {
//          notify("success", ["You will be redirect to Tamara"]);
//          setTimeout(function () {
//             window.location.replace(
//                startTamaraPaymentRequest.value.data.checkout_url
//             );
//          }, 1000);
//       }
//    }
// );
</script>

<style scoped>
iframe {
   min-height: 170px;
}
</style>
