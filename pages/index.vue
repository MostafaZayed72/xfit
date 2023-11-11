<template>
   <div class="grid place-items-center">
      <div class="container sm:w-3/4">
         <h1 class="text-center text-2xl sm:text-6xl mb-16">
            {{ $t("Hi", "مرحبا") }}, {{ username }}
         </h1>
         <!-- <hr class="my-5" /> -->
         <div class="grid sm:grid-cols-3 px-12 sm:px-0 gap-8">
            <nuxt-link
               class="h-24 text-xl text-[var(--c1)] bg-[var(--c6)] hover:bg-[var(--c7)] rounded-xl grid place-items-center shadow-lg"
               to="/packages"
            >
               {{ $t("Packages", "الباقات") }}
            </nuxt-link>
            <nuxt-link
               class="h-24 text-xl text-[var(--c1)] bg-[var(--c6)] hover:bg-[var(--c7)] rounded-xl grid place-items-center shadow-lg"
               to="/member/memberships"
            >
               {{ $t("My memberships", "اشتراكاتي") }}
            </nuxt-link>
            <nuxt-link
               class="h-24 text-xl text-[var(--c1)] bg-[var(--c6)] hover:bg-[var(--c7)] rounded-xl grid place-items-center shadow-lg"
               to="/member/profile"
            >
               {{ $t("My profile", "الملف الشخصي") }}
            </nuxt-link>
         </div>
      </div>
   </div>
</template>
<script setup>
const username = useCookie("username");
</script>
