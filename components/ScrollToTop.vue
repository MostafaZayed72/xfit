<template>
   <button id="scrollToTopBtn" class="bg-cyan-500" title="Go to top" @click="scrollToTop">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 ">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
   </button>
</template>

<script setup>
const scrollToTop = () => {
   window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<style scoped>
#scrollToTopBtn {
   position: fixed;
   bottom: 20px;
   right: 30px;
   z-index: 99;
   border: none;
   outline: none;
  
   color: white;
   cursor: pointer;
   padding: 15px;
   border-radius: 50%;
}
</style>