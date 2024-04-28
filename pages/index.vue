<template>
   <div class="grid place-items-center py-16 rounded" style="background-color: rgb(248,249,250)
;">
      <div class="container " >
         <h1 class="text-center md:text-5xl sm:text-6xl mb-16 font-bold" style="color: #7b7c7c;">
            {{ $t("Hello", "مرحبا") }}, Mostafa Zayed {{ username }}
         </h1>
         <div class="mb-2 w-[90%] mx-auto" style="border-bottom: 1px solid ; border-color:rgb(217,218,218);"></div>
         <!-- <hr class="my-5" /> -->
         <div class="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-40 mt-12">
            <nuxt-link
               class=" h-16 w-[80%] lg:w-fit px-4 text-xl text-[var(--c1)] bg-cyan-500 rounded grid place-items-center shadow-lg"
               to="/packages">
               {{ $t("Packages", "الباقات") }}
            </nuxt-link>
            <nuxt-link
               class=" h-16 w-[80%] lg:w-fit px-4 text-xl text-[var(--c1)] bg-cyan-500 rounded grid place-items-center shadow-lg"
               to="/member/memberships">
               {{ $t("My memberships", "اشتراكاتي") }}
            </nuxt-link>
            <nuxt-link
               class=" h-16 w-[80%] lg:w-fit px-4 text-xl text-[var(--c1)] bg-cyan-500 rounded grid place-items-center shadow-lg"
               to="/member/profile">
               {{ $t("My profile", "الملف الشخصي") }}
            </nuxt-link>
         </div>
      </div>
   </div>
</template>
<script setup>
const username = useCookie("username");

</script>
