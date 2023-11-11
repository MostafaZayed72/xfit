<template>
   <section>
      <h4 class="mb-4">{{ $t('Package') }}</h4>
      <div class="row mb-3">
         <div class="col-sm-3">{{ $t('Package') }}</div>
         <div class="col-sm-9">
            {{ membership.name }}
         </div>
      </div>

      <div class="row mb-3">
         <div class="col-sm-3">{{ $t('Price') }}</div>
         <div class="col-sm-9">
            <span>{{ membership.price.toLocaleString() }}</span>
            <span>{{ $t('SAR') }}</span>
         </div>
      </div>

      <div class="row mb-3">
         <div class="col-sm-3">{{ $t('Branch') }}</div>
         <div class="col-sm-9">
            {{ membership.branch_name }}
         </div>
      </div>

      <div class="row mb-3">
         <div class="col-sm-3">{{ $t('Membership start date') }}</div>
         <div class="col-sm-9">
            <span dir="ltr">{{ membership.membership_start_date }}</span>
         </div>
      </div>

      <div class="row mb-3">
         <div class="col-sm-3">{{ $t('Created at') }}</div>
         <div class="col-sm-9">
            <span dir="ltr">{{ membership.created_at }}</span>
         </div>
      </div>
   </section>
</template>

<script>
export default {
   props: ['membership'],
}
</script>

<style></style>
