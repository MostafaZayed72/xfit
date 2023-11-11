<template>
   <main class="charge-container text-center" v-if="record">
      <div v-if="record.payment_status == 'CAPTURED'">
         <h2 class="fs-1 fw-bolder mb-5">
            {{ $t('Payment process completed.') }}
         </h2>
         <h4 class="fs-4">
            <a href="javascript:;" @click="viewMembership()">
               {{ $t('Click here to check you membership details.') }}
            </a>
         </h4>
      </div>
      <div v-else>
         <h2 class="fs-1 fw-bolder mb-5">
            {{ $t('Something went wrong.') }}
         </h2>
         <h4 class="fs-4">
            {{ $t('Please, contact us.') }}
         </h4>
      </div>
   </main>
</template>

<script>
export default {
   computed: {
      charge_id: function () {
         return this.$route.query.tap_id
      },
   },
   data() {
      return {
         record: null,
      }
   },
   created() {
      if (this.charge_id) this.viewTapCharge()
      // else this.$router.push('404')
   },
   methods: {
      viewTapCharge() {
         this.$store
            .dispatch('viewTapCharge', {
               params: { id: this.charge_id },
            })
            .then((response) => {
               this.record = response.data
            })
      },
      viewMembership() {
         this.$store.dispatch('updateContainer', {
            state_name: 'membership_id',
            state_value: this.record.membership_id,
         })
         this.$router.push('/memberships/view')
      },
   },
}
</script>

<style scoped>
.charge-container {
   display: grid;
   place-items: center;
   min-height: calc(100vh - 118px);
}
</style>
