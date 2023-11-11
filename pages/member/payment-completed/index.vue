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
<script>
export default {
   computed: {
      order_id: function () {
         return this.$route.query.orderId
      },
      payment_status: function () {
         return this.$route.query.paymentStatus
      },
      charge_id: function () {
         return this.$route.query.tap_id
      },
   },
   created() {
      if (this.order_id) this.viewTamaraSession()
      else if (this.charge_id) this.viewTapCharge()
   },
   methods: {
      viewTamaraSession() {
         this.$store.dispatch('viewTamaraSession', {
            params: {
               order_id: this.order_id,
               payment_status: this.payment_status,
            },
         })
      },
      viewTapCharge() {
         this.$store.dispatch('viewTapCharge', {
            params: { id: this.charge_id },
         })
      },
   },
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
