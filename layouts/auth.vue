<template>
   <div :dir="currentLanguage == 'ar' ? 'rtl' : 'ltr'">
      <div class="grid place-items-center h-screen">
         <div class="container p-8 sm:w-1/2">
            <div class="flex justify-center mb-10">
               <img class="w-3/4" src="/imgs/logo.png" alt="Xfit" />
            </div>
            <slot />
            <div class="text-center mt-6">
               <IconsGlobe class="me-1 w-4" />
               <a
                  href="javascript:;"
                  v-if="currentLanguage == 'ar'"
                  @click="changeLanguage('en')"
               >
                  <span class="text-sm">English</span>
               </a>
               <a href="javascript:;" v-else @click="changeLanguage('ar')">
                  <span class="text-sm">العربية</span>
               </a>
            </div>
         </div>
      </div>
      <CommonNotifications />
   </div>
</template>
<script setup>
const currentLanguage = useCookie("lang");
const changeLanguage = (newLanguage) => {
   currentLanguage.value = newLanguage;
};
</script>
