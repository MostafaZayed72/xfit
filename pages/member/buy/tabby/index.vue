<template>
   <main>
      <p class="mb-12">
         <NuxtLink to="/">{{ $t("Home", "الرئيسية") }}</NuxtLink>
         <span class="mx-2">/</span>
         <NuxtLink to="/member/memberships">
            {{ $t("My memberships", "اشتراكاتي") }}
         </NuxtLink>
         <span class="mx-2">/</span>
         <span>{{ $t("Membership information", "معلومات اشتراك") }}</span>
      </p>

      <CommonXfitLoader v-if="membership?.isLoading && !membership?.data" />

      <div class="bg-[var(--c3)] rounded-xl mb-4 shadow-lg p-5" v-else>
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
            
            <CommonXfitLoader
               v-if="
                  tabbyPaymentOptions?.isLoading && !tabbyPaymentOptions?.data
               "
            />
            <div class="mb-5" v-else>
               <div v-if="rejected" class="text-red-500 border border-red-500 bg-red-100 p-2 my-3">{{ rejectedMsg }}</div>
               <div v-if="!rejected" class="py-2" id="TabbyPromo"></div>
               <div id="tabbyCard" class=" bg-white p-5 rounded-lg my-3"></div>

               <div
                  class="bg-[var(--c1)] rounded-xl"
                  v-for="payment_type in tabbyPaymentOptions?.data
                     .available_products"
                  :key="payment_type.name"
               >
                  <div
                     class="h-100 shadow-sm bg-light rounded-3 d-block p-4 text-center flex flex-col items-start gap-2 "
                  >
                  
                     
                     
                     
                    
                     <!-- <h4 class="mb-3 package-name">
              <span v-if="lang == 'ar'">
                {{ payment_type.description_ar }}
              </span>
              <span v-if="lang == 'en'">
                {{ payment_type.description }}
              </span>
            </h4> -->
                     <!-- <p class="mb-3 lh-lg package-name">
                        <span class="me-1">
                           {{ $t("Pay", "ادفعي") }}
                        </span>
                        <span class="me-1">
                           {{
                              Number(payment_type.downpayment).toLocaleString(
                                 undefined,
                                 { maximumFractionDigits: 2 }
                              )
                           }}
                        </span>
                        <span class="me-1 inline-block">
                           {{ $t("SAR,", "ريال") }}
                        </span>
                        <span class="me-1 inline-block">
                           {{ $t("as a downpayment,", "كدفعة مقدمة ،") }}
                        </span>
                        <span class="me-1">
                           {{
                              $t("and the rest is divided on", "والباقي على ")
                           }}
                        </span>
                        <span class="me-1">
                           {{ payment_type.installments_count }}
                        </span>
                        <span class="me-1">
                           {{ $t("pays", "دفعات بقيمة") }}
                        </span>
                        <span class="me-1">
                           {{
                              Number(
                                 payment_type.amount_to_pay /
                                    payment_type.installments_count
                              ).toLocaleString(undefined, {
                                 maximumFractionDigits: 2,
                              })
                           }}
                        </span>
                        <span class="me-1 inline-block"
                           >{{ $t("SAR", "ريال") }}
                        </span>
                        <span> {{ $t("monthly", "شهريا") }}</span>
                     </p> -->

                     <div class="text-end">
                        
                        <ButtonsPrimary
                           v-if="tabbyStatus === 'created'"
                           class="w-24"
                           @click="startTabbyPayment(payment_type.web_url)"
                        >
                           {{ $t("Confirm", "تأكيد") }}
                        </ButtonsPrimary> 
                     </div>
                  </div>
               </div>
            </div>

            <div>
               <p class="text-center text-[var(--c8)]">
                  <span class="text-sm inline-block me-1">
                     {{
                        $t(
                           "Clicking the Pay button means agreeing to all the terms and conditions.",
                           "الضغط على زر التأكيد ، يعني الموافقة على جميع الشروط والاحكام"
                        )
                     }}
                  </span>
                  <a
                     class="text-sm"
                     href="#"
                     data-toggle="modal"
                     data-target="terms-and-conditions-modal"
                  >
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
      <CommonModal
         :title="$t('Terms and conditions', 'الاحكام والشروط')"
         modalID="terms-and-conditions-modal"
      >
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
   // notify(
   //    "success",
   //    $t(
   //       "Page will be redirected to Tabby platform now.",
   //       "سيتم إعادة توجيه الصفحة الآن إلى منصة تابي"
   //    ),
   //    2
   // );
   setTimeout(() => {
      window.location.href = tabbyURL;
   }, 1000);
};

watch(
   () => tabbyPaymentOptions.value?.isFinished,
   () => {
      tabbyStatus.value = tabbyPaymentOptions.value?.data?.status
      const price = membership.value?.data?.price
      const lang = $t("en", "ar") 
     // if(tabbyStatus.value === 'created' && price){
         tabbyCard.tabbyCard('SAR',price,lang)
         tabbyPromo.tabbysnippet('SAR',price,lang)
      //}
      if(tabbyStatus.value === 'rejected' && price){
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
