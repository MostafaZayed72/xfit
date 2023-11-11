<template>
   <ButtonsPrimary class="ms-2" @click="closeModal">
      <slot />
   </ButtonsPrimary>
</template>
<script setup>
const closeModal = () => {
   window.closeModal()
}
</script>