<template>
   <section class="parent">
      <div>
         <h3 class="display-6 mb-5">
            {{ $t('Thank you') }}
         </h3>
         <p>{{ $t('Payment completed successfully') }}</p>
         <p>{{ $t('Enjoy achieving your goal with Xfit') }}</p>
      </div>
   </section>
</template>



<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const order_id = router.currentRoute.value.query.orderId;
const payment_status = router.currentRoute.value.query.paymentStatus;
const charge_id = router.currentRoute.value.query.tap_id;

console.log('this is ' + store)

const viewTamaraSession = async () => {
  await store.dispatch('viewTamaraSession', {
    params: {
      order_id: order_id,
      payment_status: payment_status,
    },
  });
};

const viewTapCharge = async () => {
  await store.dispatch('viewTapCharge', {
    params: { id: charge_id },
  });
};

if (order_id) {
  viewTamaraSession();
} else if (charge_id) {
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
