<template>
   <h3 class="text-5xl text-center text-grey-darken-1 mb-16">
      {{ $t('Buy a package', 'شراء باقة') }}
   </h3>
   <hr class="my-5" />
   <div class="mt-12 mx-auto text-center">
      <h1 >{{ props.name }}</h1>
      <h1>{{ props.price }}</h1>
   </div>
</template>

<script setup>
const props = defineProps({
   name: String,
   price: String
})
</script>
