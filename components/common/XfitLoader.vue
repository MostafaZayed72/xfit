<template>
   <div class="grid place-items-center">
      <img class="loader w-48" src="/imgs/logo.png" alt="Xfit" />
   </div>
</template>
<style scoped>
.loader {
   animation: flashing 2s ease 0s infinite normal forwards;
}

@keyframes flashing {
   0%,
   50%,
   100% {
      opacity: 0.3;
   }

   25%,
   75% {
      opacity: 0;
   }
}
</style>
