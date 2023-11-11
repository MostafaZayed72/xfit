<template>
   <button type="submit"
      class="py-1 px-2 h-9 w-16 rounded bg-[var(--c4)] hover:bg-[var(--c5)] text-[var(--c3)] shadow-lg print:hidden overflow-hidden"
      :form="form" :disabled="isLoading">
      <slot v-if="!isLoading" />
      <CommonSpinner v-else />
   </button>
</template>
<script setup>
defineProps(['form', 'isLoading'])
</script>
<style scoped>
:disabled {
   cursor: not-allowed;
}
</style>