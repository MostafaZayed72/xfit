<template>
   <main>
      <div class="text-center mship md:mb-16">
         <p class=" leading-10">
            <NuxtLink class="text-sm md:text-5xl" to="/">{{ $t("Home", "الرئيسية") }}</NuxtLink>
            <span class="mx-2 text-sm md:text-5xl">/</span>
            <NuxtLink class="text-sm md:text-5xl" to="/member/memberships">
               {{ $t("My memberships", "اشتراكاتي") }}
            </NuxtLink>
            <span class="mx-2  text-sm md:text-5xl">/</span>
            <span class="text-sm md:text-5xl">{{ $t("Membership information", "معلومات اشتراك") }}</span>
         </p>
      </div>
      <hr class="my-5" />
      <CommonXfitLoader v-if="membership?.isLoading && !membership?.data" />

      <div class="bg-[var(--c3)] rounded-xl mb-4 shadow-lg p-5 main-card" v-else>
         <MembershipInformation :membership="membership?.data" />
         <section v-if="
            !membership?.data?.membershipTapPayments &&
            !membership?.data?.membershipTamaraPayments
         ">
            <!--START PROMO CODE -->
            <div class="flex flex-col md:flex-row items-center gap-4 mb-4">
               <h1>Promo Code</h1><input type="text" v-model="promo" placeholder="If You Have Promo Code"
                  class="rounded w-[100%] md:w-[45%]" style="border: 1px solid;">
               <ButtonsPrimary class="w-24 bg-cyan-500 choose" @click="sendDataToBackend()">
                  {{ $t("Confirm", "تأكيد") }}
               </ButtonsPrimary>
               <ButtonsPrimary class="w-24 bg-cyan-500 choose" @click="removePromoCode()">
                  {{ $t("Remove Promo Code", "حذف البروموكود") }}
               </ButtonsPrimary>
            </div>
            <h1 v-if="promo">{{ $t('Price after adding promo code : ', 'السعر بعج إضافة البرمو كود') }}</h1>
            <!--END PROMO CODE -->
            <hr class="my-4" />
            <h4 class="mb-4 text-center">
               {{ $t("Payment options", "طرق الدفع") }}
            </h4>
            <div v-if="membership?.data?.package_status">
               <div id="CreditCard" class=" flex justify-center items-center ">
                  <input class="w-8" type="radio" v-model="PayMehtod" value="creditCard" />
                  <label class="flex-1 pt-3"> {{ $t("Credit cards", "البطاقة الائتمانية") }}</label>
               </div>
               <div  id="tamara" class=" flex justify-center items-center ">
                  <input class="w-8" type="radio" v-model="PayMehtod" value="tamara" />
                  <label class="flex-1 pt-3" for="tamara"> {{ $t("Pay with Tamara", "ادفعي مع تمارا") }} </label>
               </div>
               <div  id="apple" class=" flex justify-center items-center ">
                  <input class="w-8" type="radio" v-model="PayMehtod" value="apple" />
                  <label class="flex-1 pt-3" for="tamara"> {{ $t("Pay with Apple", "ادفعي مع آبل") }} </label>
               </div>
               <div  id="tabby" class=" flex justify-center items-center ">
                  <input class="w-8" type="radio" v-model="PayMehtod" value="tabby" />
                  <label class="flex-1 pt-3" for="tabby"> {{ $t("Pay with Tabby", "ادفعي مع تابي") }} </label>
               </div>
               <div v-show="PayMehtod === 'tabby'" class=" bg-white p-5 rounded-lg mx-5 my-3" id="tabbyCard"></div>

               <div class="py-3">
                  <ButtonsPrimary class="w-24 bg-cyan-500 choose" @click="confimPayMethod">{{ $t("Confirm", "تأكيد") }}
                  </ButtonsPrimary>
               </div>

            </div>
            <div class="alert alert-danger text-center" v-else>
               <p>
                  {{
                     $t(
                        "The package isn't available now.",
                        "الباقة غير متاحة الآن"
                     )
                  }}
               </p>
               <p class="m-0">
                  {{
                     $t(
                        "Please, choose another package.",
                        "يرجي اختيار باقة اخري"
                     )
                  }}
               </p>
            </div>
         </section>
         <section v-else>
            <hr class="my-4" />
            <h4 class="mb-4">
               {{ $t("Payment information", "معلومات الدفع") }}
            </h4>
            <div v-if="membership.data.membershipTapPayments">
               <div class="row mb-3">
                  <div class="col-sm-3">
                     {{ $t("Payment method", "طريقة الدفع") }}
                  </div>
                  <div class="col-sm-9">
                     {{ membership.data.membershipTapPayments.payment_method }}
                  </div>
               </div>
               <div class="row mb-3">
                  <div class="col-sm-3">{{ $t("Card", "بطاقة") }}</div>
                  <div class="col-sm-9">
                     <span dir="ltr">
                        **** **** ****
                        {{
                           membership.data.membershipTapPayments
                              .card_last_four_digits
                        }}
                     </span>
                  </div>
               </div>
            </div>
            <div v-if="membership.data.membershipTamaraPayments">
               <div class="row mb-3">
                  <div class="col-sm-3">
                     {{ $t("Payment method", "طريقة الدفع") }}
                  </div>
                  <div class="col-sm-9">
                     {{ $t("Tamara", "تمارا") }}
                  </div>
               </div>
               <div class="row mb-3">
                  <div class="col-sm-3">{{ $t("Order ID", "رقم الطلب") }}</div>
                  <div class="col-sm-9">
                     {{ membership.data.membershipTamaraPayments.order_id }}
                  </div>
               </div>
               <div class="row mb-3">
                  <div class="col-sm-3">
                     {{ $t("Payment status", "حالة الدفع") }}
                  </div>
                  <div class="col-sm-9">
                     {{
                        membership.data.membershipTamaraPayments.payment_status
                     }}
                  </div>
               </div>
            </div>
         </section>
      </div>

      <!-- <section class="text-start mt-3">
         <nuxt-link class="btn btn-secondary" to="/member/memberships">
            {{ $t("Back") }}
         </nuxt-link>
      </section> -->
   </main>
</template>

<script setup>
import { useGetMembership } from "@/composables/memberships/useGetMembership";
import * as tabbyCard from "@/utils/tabbyCard";
import axios from 'axios';

const promo = ref('')

async function sendDataToBackend() {
   try {
      const data = {
         membership_id: membership.value.data.id,
         promo_code: promo.value,
      };

      const response = await axios.post('/gym/promo-codes/validate-promo-code', data);
      console.log('Response from backend:', response.data);
   } catch (error) {
      console.error('Error sending data to backend:', error);
   }
}
async function removePromoCode() {
   try {
      const data = {
         membership_id: membership.value.data.id,
         promo_code: promo.value,
         remove: true
      };

      const response = await axios.post('/gym/promo-codes/validate-promo-code', data);
      console.log('Response from backend:', response.data);
   } catch (error) {
      console.error('Error sending data to backend:', error);
   }

   promo.value=('')
}


onBeforeMount(() => {
   getMembership()


});
const PayMehtod = ref('creditCard')
const membership = ref();
const currentLanguage = useCookie("lang");


const getMembership = () => {
   membership.value = useGetMembership();
};
const confimPayMethod = () => {
   console.log(PayMehtod);
   if (PayMehtod.value === 'creditCard') {
      navigateTo("/member/buy/tap");
   }
   if (PayMehtod.value === 'tabby') {
      navigateTo("/member/buy/tabby");
   }

   if (PayMehtod.value === 'tamara') {
      navigateTo("/member/buy/tamara");
   }

   if (PayMehtod.value === 'apple') {
      navigateTo("/member/buy/apple");
   }
}

watch(() => membership.value, () => {
   // console.log(membership.value);
   const { data } = membership.value
   tabbyCard.tabbyCard('SAR', data?.price, currentLanguage.value)


});
watch(() => currentLanguage.value, () => {
   // console.log(membership.value);
   const { data } = membership.value
   console.log('change language');
   tabbyCard.tabbyCard('SAR', data?.price, currentLanguage.value)


});

watch(() => PayMehtod.value, () => {
   if (PayMehtod.value === 'tabby') {
      const { data } = membership.value
      tabbyCard.tabbyCard('SAR', data?.price, currentLanguage.value)
   }
})

</script>

<style scoped>
input:focus::placeholder {
   opacity: 0;
}
</style>