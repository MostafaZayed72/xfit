<template>
   <section class="parent">
      <CommonXfitLoader v-if="!success" />
      <div v-if="success">
         <h3 class="display-6 mb-5">
            {{ $t("Thank you", "شكرا لك") }}
         </h3>
         <p>
            {{ $t("Payment completed successfully", "تمت عملية الدفع بنجاح") }}
         </p>
         <p>
            {{
               $t(
                  "Enjoy achieving your goal with Xfit",
                  "استمتع بتحقيق هدفك مع إكس فيت"
               )
            }}
         </p>
         <!-- <h1>hello {{ membershipId }}</h1> -->
         <div v-for="membership in memberships?.data" :key="membership.id">
            <ButtonsPrimary
               v-if="membership.id === membershipId"
               @click="viewMembership(membership.id)"
               class="bg-cyan-500 choose cursor-pointer w-fit mt-6"
            >
               {{ $t("Membership Preview", "معاينة الإشتراك") }}
            </ButtonsPrimary>
         </div>
      </div>
      <div v-if="success == false">
         <h3 class="display-6 mb-5">
            {{ $t("Sorry To You", "نأسف لك") }}
         </h3>
         <p>
            {{
               $t(
                  "Something went wrong, payment not completed",
                  "حدث خطأ ما، ولم يكتمل الدفع"
               )
            }}
         </p>
         <p>
            {{
               $t(
                  "try again later or use another payment method",
                  "حاول مرة أخرى لاحقًا أو استخدم طريقة دفع أخرى"
               )
            }}
         </p>
         <!-- <h1>hello {{ membershipId }}</h1> -->
         <NuxtLink to="/packages">
            <ButtonsPrimary
               class="bg-cyan-500 choose cursor-pointer w-fit mt-6"
            >
               {{ $t("Return to packages page", "العودة لصفحة الباقات") }}
            </ButtonsPrimary></NuxtLink
         >
      </div>
   </section>
</template>

<script setup>
import { viewMembership } from "@/utils/view/viewMembership";
import { useGetMemberships } from "@/composables/memberships/useGetMemberships";
onBeforeMount(() => getMemberships());
const memberships = ref();

const getMemberships = () => {
   memberships.value = useGetMemberships();
};

import { useCustomAxios } from "~/composables/common/useCustomAxios";
import { useGetMembership } from "@/composables/memberships/useGetMembership";
const membership = ref();
const getMembership = () => {
   membership.value = useGetMembership();
   if (!membership.value) {
      return;
   }
};

const router = useRouter();

const order_id = router.currentRoute.value.query.orderId;
const payment_status = router.currentRoute.value.query.paymentStatus;
const charge_id = router.currentRoute.value.query.tap_id;
const success = ref();

const membershipId = ref();
async function viewTapCharge() {
   try {
      const res = await useCustomAxios("memberships/view-tap-charge", {
         params: { id: charge_id },
      });
      if (res.data.value.errors) {
         throw res.data.value.errors;
      }
      success.value = res.data.value.success;
      membershipId.value = res.data.value.membership_id;
   } catch (error) {
      console.log(error?.response?.data?.message);
      notify("danger", [
         "Cant apply promo code.",
         error?.response?.data?.message,
      ]);
   }
}


   if (charge_id) {
   viewTapCharge();
}

</script>

<style scoped>
.parent {
   display: grid;
   place-items: center;
   height: calc(100vh - 118px);
   text-align: center;
}
</style>
