<template>
   <section class="parent">
      <CommonXfitLoader v-if="loading" />
      <!-- Success case -->
      <div v-else-if="
         success ||
         successTamara == 'authorised' ||
         successTabby == 'AUTHORIZED'
      ">
         <h3 class="display-6 mb-5 text-2xl">
            {{ $t("Thank you", "شكرا لك") }}
         </h3>
         <p class="text-gray-400">
            {{ $t("Payment completed successfully", "تمت عملية الدفع بنجاح") }}
         </p>
         <p class="text-gray-400">
            {{
               $t(
                  "Enjoy achieving your goal with Xfit",
                  "استمتع بتحقيق هدفك مع إكس فيت"
               )
            }}
         </p>
         <!-- <h1>hello {{ membershipId }}</h1> -->
         <div v-for="membership in memberships?.data" :key="membership.id">
            <ButtonsPrimary v-if="
               membership.id === membershipId ||
               membership.id == tamaraId ||
               membership.id == tabbyId
            " @click="viewMembership(membership.id)" class="bg-cyan-500 choose cursor-pointer w-fit mt-6">
               {{ $t("Membership Preview", "معاينة الإشتراك") }}
            </ButtonsPrimary>
         </div>
      </div>
      <!-- Failed case -->
      <div v-else>
         <h3 class="display-6 mb-5 text-2xl">
            {{ $t("Sorry To You, Payment Failed or cancelled", "نأسف لك, فشللت عملية الدفع أو تم إلغائها") }}
         </h3>
         <p class="text-gray-400">
            {{
              failureReason
            }}
         </p>
         <!-- <h1>hello {{ membershipId }}</h1> -->
         <ButtonsPrimary class="bg-cyan-500 choose cursor-pointer w-fit mt-6"
            @click="navigateTo('/member/memberships')">
            {{ $t("Return to packages page", "العودة لصفحة الباقات") }}
         </ButtonsPrimary>
      </div>
   </section>
</template>

<script setup>
import { viewMembership } from "@/utils/view/viewMembership";
import { useGetMemberships } from "@/composables/memberships/useGetMemberships";
import { useGetTabbySession } from "@/composables/tabby/useGetTabbySession";

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
const route = useRoute();
const loading = ref(false);

const order_id = router.currentRoute.value.query.orderId;
const payment_status = router.currentRoute.value.query.paymentStatus;
const charge_id = router.currentRoute.value.query.tap_id;
const payment_id = route.query.payment_id
const success = ref();
const failureReason = ref();
const successTamara = ref();
const successTabby = ref();
const membershipId = ref();
const tamaraId = ref();
const tabbyId = ref();
const record = ref(null);
const membershipID = useState("membershipID");


async function viewTapCharge() {
   try {
      loading.value = true;
      const res = await useCustomAxios("memberships/view-tap-charge", {
         params: { id: charge_id },
      });
      if (res.data.value.errors) {
         throw res.data.value.errors;
      }
      success.value = res.data.value.success;
      membershipId.value = res.data.value.membership_id;
   } catch (error) {
      console.log(error.response.data.message)
      failureReason.value = error?.response?.data?.data?.response?.message || $t(
         "Try again later or use another payment method",
         "حاول مرة أخرى لاحقًا أو استخدم طريقة دفع أخرى"
      );
   } finally {
      loading.value = false;
   }
}

if (charge_id) {
   viewTapCharge();
}

async function viewTamaraSession() {
   try {
      loading.value = true;
      const res = await useCustomAxios("memberships/view-tamara-session", {
         params: { order_id: order_id, payment_status: payment_status },
      });
      successTamara.value = res.data.value.payment_status;
      console.log(res.data.value.membership_id);
      tamaraId.value = res.data.value.membership_id;
   } catch (err) {
      console.log(err);
      failureReason.value = err?.response?.data?.message || $t(
         "Try again later or use another payment method",
         "حاول مرة أخرى لاحقًا أو استخدم طريقة دفع أخرى"
      );

   } finally {
      loading.value = false;
   }
}

if (order_id) {
   viewTamaraSession();
}

async function viewTabbySession() {
   try {
   loading.value = true;
   if (route.query.payment_id) {
      record.value = await useGetTabbySession(
         route.query.payment_id,
         "AUTHORIZED"
      );


      if (record.value) {
         console.log('Tabby session:', record.value.response.data);
         successTabby.value = record.value.response.data.payment_status;
         tabbyId.value = record.value.response.data.membership_id;

      } else {
         console.error('Failed to fetch Tabby session');
      }
   } else {
      console.error('Payment ID is missing in the route query');
   }
   } catch (err) {
   console.log(err);
   } finally {
   loading.value = false;
   }
}

if (payment_id) {
   viewTabbySession();
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
