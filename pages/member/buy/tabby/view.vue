<template>
   <main class="charge-container text-center" v-if="record?.data">
      <div v-if="record.data.payment_status == 'AUTHORIZED'">
         <h2 class="fs-1 fw-bolder mb-5">
            {{ $t("Payment process completed.") }}
         </h2>
         <h4 class="fs-4">
            <a href="javascript:;" @click="viewMembership(record.data.id)">
               {{ $t("Click here to check you membership details.") }}
            </a>
         </h4>
      </div>
      <div v-else>
         <h2 class="fs-1 fw-bolder mb-5">
            {{ $t("Something went wrong.") }}
         </h2>
         <h4 class="fs-4">
            {{ $t("Please, contact us.") }}
         </h4>
      </div>
   </main>
</template>

<script setup>
import { viewMembership } from "@/utils/view/viewMembership";
import { useGetTabbySession } from "@/composables/tabby/useGetTabbySession";
// import { useGetMembership } from "@/composables/memberships/useGetMembership";

const route = useRoute();
const record = ref();
// const membership = ref();

onBeforeMount(() => {
   // getMembership();
   viewTabbySession();
});


// const getMembership = () => {
//    membership.value = useGetMembership();
   
// };

const viewTabbySession = () => {
   record.value = useGetTabbySession(
      route.query.payment_id, 'AUTHORIZED'
      //route.query.paymentStatus 
   );
   console.log(record.value);
};
</script>

<style scoped>
.charge-container {
   display: grid;
   place-items: center;
   min-height: calc(100vh - 118px);
}
</style>
