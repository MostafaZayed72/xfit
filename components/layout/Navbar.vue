<template>
   <nav class="fixed z-10 h-16 shadow-lg top-0 right-0 w-full print:hidden border border-b bg-[var(--c1)]">
      <div class="container mx-auto px-4 sm:px-8 flex justify-between items-center h-full">
         <div class="flex items-center gap-2 text-cyan-500  hover:text-gray-500">
            <NuxtLink to="/">
               <h1 class="text-xl"><span class="font-bold text-xl">Xfit</span> | Members</h1>
            </NuxtLink>
         </div>
         <div>

            <span class="flex gap-4 items-center justify-center" v-if="currentLanguage == 'ar'">
               <a class="text-xs" href="javascript:;" @click="changeLanguage('en')">
                  <span class="text-sm">English</span>
                  <span class="ms-1">
                     <i class="fas fa-globe " />
                  </span>
               </a>
               <ColorMode />
               <div class="flex items-center gap-1 ">
                  <Icon class="text-3xl" name="material-symbols:person-rounded" /> <span class="hidden md:block">Mostafa Zayed</span>
                  <Icon name="ion:md-arrow-dropdown" />
               </div>
            </span>
            <span class="flex gap-6 items-center justify-center  lg:mr-6" v-else>
               <a href="javascript:;" @click="changeLanguage('ar')">
                  <span class="text-xl ">العربية</span>
                  <span class="ms-1">
                     <i class="fas fa-globe " />
                  </span>
               </a>
               <ColorMode />
               <div class="flex items-center gap-1 ">
                  <Icon class="text-3xl" name="material-symbols:person-rounded" /> <span class="hidden md:block">Mostafa Zayed</span>
                  <Icon name="ion:md-arrow-dropdown" />
               </div>
            </span>
         </div>
      </div>
   </nav>
</template>

<script setup>
const username = useCookie("username");
const currentLanguage = useCookie("lang");
const changeLanguage = (newLanguage) => {
   currentLanguage.value = newLanguage;
};
</script>
