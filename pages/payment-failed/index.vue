<template>
   <section class="parent">
      <CommonXfitLoader v-if="loading" />
      <div v-else>
         <h3 class="display-6 mb-5 text-2xl">
            {{ $t("Sorry To You. Your payment was failed or cancelled", 'نأسف لك. تم فشل عملية الدفع او الغاءه' )}}
         </h3>
         <p class="text-gray-400">
            {{
               $t(
                  "Payment not completed. Please try again later or use another payment method",
                  "لم تتم عملية الدفع. حاول مرة أخرى لاحقًا أو استخدم طريقة دفع أخرى"
               )
            }}
         </p>
         <!-- <h1>hello {{ membershipId }}</h1> -->
         <NuxtLink to="/packages">
            <ButtonsPrimary class="bg-cyan-500 choose cursor-pointer w-fit mt-6">
               {{ $t("Return to packages page", "العودة لصفحة الباقات") }}
            </ButtonsPrimary>
         </NuxtLink>
      </div>
   </section>
</template>

<script setup>
import { useCustomAxios } from "~/composables/common/useCustomAxios";
import { useGetTabbySession } from "@/composables/tabby/useGetTabbySession";

const loading =ref(false);
const route = useRoute();
const order_id = route.query.orderId;
const payment_status = route.query.paymentStatus;
const charge_id = route.query.tap_id;
const payment_id = route.query.payment_id;

async function viewTapCharge() {
   try {
      loading.value = true;
      const res = await useCustomAxios("memberships/view-tap-charge", {
         params: { id: charge_id },
      });
   } catch (error) {
      console.log(error.response.data.message)

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
   } catch (err) {
      console.log(err);
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
      await useGetTabbySession(
         route.query.payment_id,
         "Failed"
      );
     
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
