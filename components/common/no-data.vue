<template>
   <div class="my-3 text-center text-secondary" v-if="show">
      <hr />
      <p>
         {{ $t('There is no data') }}
      </p>
      <hr />
   </div>
</template>
<script>
export default {
   computed: {
      show: function () {
         if (
            !this.$store.state.data_list.length &&
            !this.$store.state.loading_list
         )
            return true
      },
   },
}
</script>
