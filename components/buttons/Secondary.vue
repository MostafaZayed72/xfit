<template>
   <button type="button"
      class="py-1 px-2 h-9 w-16 rounded text-[var(--c1)] bg-[var(--c6)] hover:bg-[var(--c7)] print:hidden shadow-lg overflow-hidden"
      :form="form" :disabled="disabled">
      <slot />
   </button>
</template>
<script setup>
defineProps(['form', 'disabled'])
</script>