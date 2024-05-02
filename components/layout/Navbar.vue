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
               <div class="flex items-center gap-1 relative cursor-pointer hovered" @click="arabicOptions = !arabicOptions">
                  <Icon class="text-3xl" name="material-symbols:person-rounded" /> <span class="hidden md:block">{{
                     username }}</span>
                  <Icon name="ion:md-arrow-dropdown" />
                  <div v-if="arabicOptions" class="options-container w-40 text-start ">
                     <h1 class="font-bold mb-1 hover:bg-cyan-500 px-1 rounded w-100" @click="refreshPage">
                        <Icon class="text-xl" name="material-symbols:refresh-rounded" /> تحديث النظام
                     </h1>
                     <nuxt-link to="member/profile" class="font-bold hover:bg-cyan-500 px-1 rounded w-100" > 
                        <Icon class="text-xl" name="material-symbols:account-box" /> ملفي الشخصي
                     </nuxt-link>
                     
                     <hr class="my-3" />
                     <nuxt-link to="member/profile" class="font-bold hover:bg-cyan-500 px-1 rounded w-100" > 
                        <Icon class="text-xl" name="ic:sharp-log-out" /> تسجيل الخروج
                     </nuxt-link>
                  </div>
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
               <div class="flex items-center gap-1 relative cursor-pointer hovered" @click="englishOptions = !englishOptions">
                  <Icon class="text-3xl" name="material-symbols:person-rounded" /> <span class="hidden md:block">{{
                     username }}</span>
                  <Icon name="ion:md-arrow-dropdown" />
                  <div v-if="englishOptions" class="options-container w-40 text-start">
                     <h1 class="font-bold mb-1 hover:bg-cyan-500 px-1 rounded w-100" @click="refreshPage">
                        <Icon class="text-xl" name="material-symbols:refresh-rounded" /> Refresh Page
                     </h1>
                     <nuxt-link to="member/profile" class="font-bold hover:bg-cyan-500 px-1 rounded w-100" > 
                       <Icon class="text-xl" name="material-symbols:account-box" />  My Profile
                     </nuxt-link>
                     
                     <hr class="my-3" />
                     <nuxt-link to="member/profile" class="font-bold hover:bg-cyan-500 px-1 rounded w-100" > 
                       <Icon class="text-xl" name="ic:sharp-log-out" />  Log Out
                     </nuxt-link>
                  </div>
               </div>
               <ScrollToTop />
            </span>
         </div>
      </div>
   </nav>
</template>

<script setup>
const arabicOptions = ref('false')
const englishOptions = ref('false')
const refreshPage = () => {
   window.location.reload();
}
const username = useCookie("username");
const currentLanguage = useCookie("lang");
const changeLanguage = (newLanguage) => {
   currentLanguage.value = newLanguage;
};
</script>

<style scoped>
.hovered:hover .options-container {
    display: flex;
    flex-direction: column;
  }
.options-container {
   position: absolute;
   top: 100%;
   left: 0;
   display: none;
   background-color: white;
   padding: 0.5rem;
   border: 1px solid #ccc;
   border-radius: 4px;
}

.options-container div {
   cursor: pointer;
   padding: 0.25rem;
}

.options-container div:hover {
   background-color: #f0f0f0;
}
</style>