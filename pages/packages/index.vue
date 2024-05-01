<template>
   <main>
      <h3 class="text-5xl text-center mship md:mb-16">
         {{ $t('Membership packages', 'باقات الإشتراك') }}
      </h3>
      <hr class="my-5" />

      <CommonXfitLoader v-if="packages?.isLoading" />

      
         <PackagesSingle  />
   
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
