<template>
   <main>
      <div class="text-center mship md:mb-16">
         <p class="leading-10">
            <NuxtLink class="text-sm md:text-5xl" to="/">{{
               $t("Home", "الرئيسية")
            }}</NuxtLink>
            <span class="mx-2 text-sm md:text-5xl">/</span>
            <NuxtLink class="text-sm md:text-5xl" to="/member/memberships">
               {{ $t("My memberships", "اشتراكاتي") }}
            </NuxtLink>
            <span class="mx-2 text-sm md:text-5xl">/</span>
            <span class="text-sm md:text-5xl">{{
               $t("Membership information", "معلومات اشتراك")
            }}</span>
         </p>
      </div>
      <hr class="my-5" />
      <CommonXfitLoader v-if="membership?.isLoading && !membership?.data" />

      <div
         class="bg-[var(--c3)] rounded-xl mb-4 shadow-lg p-5 main-card"
         v-else
      >
         <MembershipInformation :membership="membership?.data" />
         <section
            v-if="
               !membership?.data?.membershipTapPayments &&
               !membership?.data?.membershipTamaraPayments &&
               !membership?.data?.membershipTabbyPayments
            "
         >
            <!--START PROMO CODE -->
            <div
               v-if="membership.data.promo_code == null "
               class="flex flex-col md:flex-row items-center gap-4 mb-4"
            >
               <h1>Promo Code</h1>
               <input
                  type="text"
                  v-model="promo"
                  @input="trimInput"
                  placeholder="If You Have Promo Code"
                  class="rounded w-[100%] md:w-[45%]"
                  style="border: 1px solid"
               />
               <ButtonsPrimary
                  class="w-24 bg-cyan-500 choose"
                  @click="applyPromoCode"
               >
                  {{ $t("Confirm", "تأكيد") }}
               </ButtonsPrimary>
            </div>
            <div
               v-if="membership.data.promo_code != null"
               class="flex flex-col md:flex-row items-center gap-4"
            >
               <h1>
                  {{
                     $t(
                        "You already have promo code applied,  ",
                        " لديك بالفعل بروموكود مطبق, "
                     )
                  }}
                  "{{ membership.data.promo_code }}"
                  {{ $t("price after discount : ", "السعر بعد الخصم : ") }}
                  {{ membership.data.price }} {{ $t("SAR", "ريال") }}
               </h1>
               <ButtonsPrimary
                  class="w-fit bg-cyan-500 choose"
                  @click="removePromoCode"
               >
                  {{ $t("Remove", "حذف") }}
               </ButtonsPrimary>
            </div>
            <!--END PROMO CODE -->
            <hr class="my-4" />
            <h4 v-if="!requiredData" class="mb-4 text-center">
               {{ $t("Payment options", "طرق الدفع") }}
            </h4>
            <div v-if="membership?.data?.package_status && !requiredData">
               <div id="CreditCard" class="flex justify-center items-center">
                  <input
                     class="w-8"
                     type="radio"
                     v-model="PayMehtod"
                     value="creditCard"
                  />
                  <label class="flex-1 pt-3">
                     {{ $t("Credit cards", "البطاقة الائتمانية") }}</label
                  >
               </div>
               <div id="tamara" class="flex justify-center items-center">
                  <input
                     class="w-8"
                     type="radio"
                     v-model="PayMehtod"
                     value="tamara"
                  />
                  <label class="flex-1 pt-3" for="tamara">
                     {{ $t("Pay with Tamara", "ادفعي مع تمارا") }}
                  </label>
               </div>
               <div id="apple" class="flex justify-center items-center">
                  <input
                     class="w-8"
                     type="radio"
                     v-model="PayMehtod"
                     value="apple"
                  />
                  <label class="flex-1 pt-3" for="tamara">
                     {{ $t("Pay with Apple", "ادفعي مع آبل") }}
                  </label>
               </div>
               <div id="tabby" class="flex justify-center items-center">
                  <input
                     class="w-8"
                     type="radio"
                     v-model="PayMehtod"
                     value="tabby"
                  />
                  <label class="flex-1 pt-3" for="tabby">
                     {{ $t("Pay with Tabby", "ادفعي مع تابي") }}
                  </label>
               </div>
               <div
                  v-show="PayMehtod === 'tabby'"
                  class="bg-white p-5 rounded-lg mx-5 my-3"
                  id="tabbyCard"
               ></div>

               <div class="py-3">
                  <ButtonsPrimary
                     class="w-24 bg-cyan-500 choose"
                     @click="confimPayMethod"
                     >{{ $t("Confirm", "تأكيد") }}
                  </ButtonsPrimary>
               </div>
            </div>
            <!-- <div v-if="requiredData">
               <h1 class="bg-red-darken-1 py-2 px-2 rounded mb-4">
                  Please, complete your personal information. Go to your
                  profile, and make sure you entered your phone number, email
                  and national ID.
                  <NuxtLink class="text-grey-lighten-1" to="/member/profile"
                     >From here</NuxtLink
                  >
               </h1>
               <h1 class="bg-red-darken-1 py-2 px-2 rounded">
                  يرجى استكمال بياناتك الشخصية . اذهب إلى ملفك الشخصي ، وتأكد من
                  ادخال رقم الجوال والبريد الالكتروني ورقم الهوية .
                  <NuxtLink class="text-grey-lighten-1" to="/member/profile"
                     >من هنا</NuxtLink
                  >
               </h1>
            </div> -->
            <div
               class="alert alert-danger text-center"
               v-if="!membership?.data?.package_status"
            >
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
            <div v-if="membership.data.membershipTabbyPayments">
               <div class="row mb-3">
                  <div class="col-sm-3">
                     {{ $t("Payment method", "طريقة الدفع") }}
                  </div>
                  <div class="col-sm-9">
                     {{ membership.data.membershipTabbyPayments.payment_status }}
                  </div>
               </div>
               <div class="row mb-3">
                  <div class="col-sm-3">{{ $t("Card", "بطاقة") }}</div>
                  <div class="col-sm-9">
                     <span dir="ltr">
                        **** **** ****
                        {{
                           membership.data.membershipTabbyPayments
                              .card_last_four_digits
                        }}
                     </span>
                  </div>
               </div>
            </div>
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
import { useCustomAxios } from "~/composables/common/useCustomAxios";
import { notify } from "~/composables/common/useNotifications";

const phone = localStorage.getItem("phone");
const email = localStorage.getItem("email");
const national = localStorage.getItem("national");
const requiredData = ref();

const trimInput = (event) => {
   const trimmedValue = event.target.value.trim();
   // تحديث قيمة المرجع التفاعلي بالقيمة المقصوصة
   promo.value = trimmedValue;
   // إذا كان يجب إزالة المسافات الزائدة أيضاً في مكان المؤشر
   event.target.value = trimmedValue;
};

const promo = ref();
const PayMehtod = ref("creditCard");
const confirmed = ref();
const membershipAfterPromo = ref();
const priceBefore = ref();
const membership = ref();

const getMembership = () => {
   membership.value = useGetMembership();
   console.log(membership.value);
};
onBeforeMount(() => {
   getMembership();

   if (phone == "null" || email == "null" || national == "null") {
      requiredData.value = true;
   }
   membershipAfterPromo.value = localStorage.getItem("membershipAfterPromo");
   priceBefore.value = localStorage.getItem("priceBefore");
   confirmed.value = localStorage.getItem("confirmed");
});

async function applyPromoCode() {
   try {
      // membership.value.data.promo_code = promo.value;
      if (!membership.value?.data || !promo.value) {
         return notify("danger", ["Please provide all required data"]);
      }
      const data = {
         membership_id: membership.value?.data?.id,
         promo_code: promo.value,
      };
      const res = await useCustomAxios(
         "memberships/add-promo-code-to-membership",
         {
            method: "POST",
            data,
         }
      );
      if (res.data.value.errors) {
         throw res.data.value.errors;
      }
      membership.value.data.promo_code = promo.value;
      membership.value.data.price = res.data.value.price;
      priceBefore.value = res.data.value.price_before_discount;
      // promo.value = res.data.value.promo_code;
      confirmed.value = true;
      notify("success", ["Promo code applied"]);
   } catch (error) {
      console.log(error?.response?.data?.message);
      notify("danger", [
         "Cant apply promo code.",
         error?.response?.data?.message,
      ]);
   }
}

async function removePromoCode() {
   try {
      const data = {
         membership_id: membership.value?.data?.id,
         promo_code: membership.value.data.promo_code,
         remove: true,
      };
      const res = await useCustomAxios(
         "memberships/add-promo-code-to-membership",
         {
            method: "POST",
            data,
         }
      );
      if (res.data.value.errors) {
         throw res.data.value.errors;
      }

      membership.value = res;
      confirmed.value = false;
      // promo.value = '';
      membershipAfterPromo.value = membership.value.data.price;

      notify("success", ["Promo code canceled"]);
   } catch (error) {
      confirmed.value = false;

      console.log(error?.response?.data?.message);
      notify("danger", [
         "Cant apply promo code.",
         error?.response?.data?.message,
      ]);
   }
}

const currentLanguage = useCookie("lang");

const confimPayMethod = () => {
   console.log(PayMehtod);
   if (PayMehtod.value === "creditCard") {
      navigateTo("/member/buy/tap");
   }
   if (PayMehtod.value === "tabby") {
      navigateTo("/member/buy/tabby");
   }

   if (PayMehtod.value === "tamara") {
      navigateTo("/member/buy/tamara");
   }

   if (PayMehtod.value === "apple") {
      navigateTo("/member/buy/apple");
   }
};

watch(
   () => membership.value,
   () => {
      // console.log(membership.value);
      const { data } = membership.value;
      tabbyCard.tabbyCard("SAR", data?.price, currentLanguage.value);
   }
);
watch(
   () => currentLanguage.value,
   () => {
      // console.log(membership.value);
      const { data } = membership.value;
      console.log("change language");
      tabbyCard.tabbyCard("SAR", data?.price, currentLanguage.value);
   }
);

watch(
   () => PayMehtod.value,
   () => {
      if (PayMehtod.value === "tabby") {
         const { data } = membership.value;
         tabbyCard.tabbyCard("SAR", data?.price, currentLanguage.value);
      }
   }
);
</script>

<style scoped>
input:focus::placeholder {
   opacity: 0;
}
</style>
