<template>
   <div :dir="currentLanguage == 'en' ? '' : 'rtl'">
      <LayoutNavbar />
      <SideBar class="mt-16"/>

      <div class="mt-16 min-h-[calc(100vh-6rem)] p-6 sm:p-12 sm:container sm:mx-auto">
         
         <slot />
      </div>
      <CommonNotifications />
   </div>
</template>

<script setup>
const currentLanguage = useCookie("lang");
</script>