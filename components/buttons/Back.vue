<template>
   <div class="text-end">
      <ButtonsPrimary @click="navigateTo(path)">
         رجوع
      </ButtonsPrimary>
   </div>
</template>
<script setup>
defineProps(['path'])
</script>