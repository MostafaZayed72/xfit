<template>
   <nav
      class="fixed z-10 h-24 top-0 right-0 w-full print:hidden border border-b bg-[var(--c1)]"
   >
      <div
         class="container mx-auto px-4 sm:px-8 flex justify-between items-center h-full"
      >
         <div class="flex items-center gap-2">
            <NuxtLink to="/">
               <img src="/imgs/logo.png" class="w-28" alt="Xfit" />
            </NuxtLink>
         </div>
         <div>
            <h4 class="text-sm mb-2">{{ $t("Hi") }} , {{ username }}</h4>
            <span
               class="flex gap-4 items-center justify-center"
               v-if="currentLanguage == 'ar'"
            >
               <a
                  class="text-xs"
                  href="javascript:;"
                  @click="changeLanguage('en')"
               >
                  <span class="text-sm">English</span>
                  <span class="ms-1">
                     <IconsGlobe class="w-4" />
                  </span>
               </a>
               <a href="javascript:;" class="text-sm" @click="logout">
                  <IconsLogoutLeft class="w-4" />
               </a>
            </span>
            <span class="flex gap-4 items-center justify-center" v-else>
               <a href="javascript:;" @click="changeLanguage('ar')">
                  <span class="text-sm">العربية</span>
                  <span class="ms-1">
                     <IconsGlobe class="w-4" />
                  </span>
               </a>
               <a href="javascript:;" class="text-sm" @click="logout">
                  <IconsLogoutRight class="w-4" />
               </a>
            </span>
         </div>
      </div>
   </nav>
</template>

<script setup>
import { logout } from "@/composables/user/useUser";
const username = useCookie("username");
const currentLanguage = useCookie("lang");
const changeLanguage = (newLanguage) => {
   currentLanguage.value = newLanguage;
};
</script>
