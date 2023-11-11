<template>
   <main>
      <p class="mb-12">
         <NuxtLink to="/">{{ $t("Home", "الرئيسية") }}</NuxtLink>
         <span class="mx-2">/</span>
         <span>{{ $t("Membership packages", "باقات الاشتراك") }}</span>
      </p>

      <CommonXfitLoader v-if="packages?.isLoading" />

      <div class="grid sm:grid-cols-3 gap-6">
         <PackagesSingle v-for="thePackage in packages?.data" :thePackage="thePackage" />
      </div>
   </main>
</template>

<script setup>
import { useGetPackages } from "@/composables/packages/useGetPackages";

onBeforeMount(() => getPackages());
const packages = ref();
const getPackages = () => {
   packages.value = useGetPackages();
};
</script>
