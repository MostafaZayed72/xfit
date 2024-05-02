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
               {{ $t("Tamara payment options", "خيارات دفع تمارا") }}
            </h4>
            <CommonXfitLoader
               v-if="
                  tamara_payment_types?.isLoading && !tamara_payment_types?.data
               "
            />
            <div class="mb-5" v-else>
               <div
                  class="bg-[var(--c1)] rounded-xl"
                  v-for="payment_type in tamara_payment_types?.data"
                  :key="payment_type.name"
               >
                  <div
                     class="h-100 shadow-sm bg-light rounded-3 d-block p-4 text-center"
                  >
                     <!-- <h4 class="mb-3 package-name">
              <span v-if="lang == 'ar'">
                {{ payment_type.description_ar }}
              </span>
              <span v-if="lang == 'en'">
                {{ payment_type.description }}
              </span>
            </h4> -->
                     <p class="mb-3 lh-lg package-name">
                        <span class="me-2">{{
                           $t("Divide it into", "قسمها على")
                        }}</span>
                        <span class="me-1">
                           {{
                              payment_type.supported_instalments[0].instalments
                           }}
                        </span>
                        <span class="me-1">
                           {{ $t("monthly payments of", "دفعات شهرية بقيمة") }}
                        </span>
                        <span class="me-1">
                           {{
                              Number(
                                 membership.data.price /
                                    payment_type.supported_instalments[0]
                                       .instalments
                              ).toLocaleString(undefined, {
                                 maximumFractionDigits: 2,
                              })
                           }}
                        </span>
                        <span class="me-1 inline-block"
                           >{{ $t("SAR", "ريال") }}
                        </span>
                        <span> {{ $t("without fees", "بدون رسوم") }}</span>
                     </p>

                     <div class="text-end">
                        <ButtonsPrimary
                           class="w-24 bg-cyan-500 choose"
                           @click="startTamaraPayment(payment_type.name)"
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
</style>
