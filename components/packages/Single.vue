<template>
    <main>
     
      <div class="row flex gap-5 flex-wrap justify-center ">
         <div
            class="col-sm-6 col-md-4 mb-4  rounded  sm:w-100 lg:w-1/3 main-card"
            v-for="the_package in packages?.data"
            :key="the_package.id"
         >
            <div
               class="h-100 shadow-sm bg-light rounded-3 d-block p-4 text-center"
            >
               <h4 class="mb-3 h-32 package-name text-2xl my-auto items-center">{{ the_package.name }}</h4>
               <h3 class="font-bold  flex gap-1 justify-center">
                  <span class="text-2xl"> {{ the_package.price.toLocaleString() }} </span>
                  <span class="text-2xl"> {{ $t('SAR','ريال') }} </span>
               </h3>
               <h1 class="w-100 my-6" style="border-bottom: 1px solid grey;"></h1>
               <p class="text-2xl">{{ $t('Branches') }}</p>
               <div class="mb-3 flex gap-1 justify-center flex-wrap text-center">
                  <h1
                     class="badge bg-cyan-500 choose text-center px-1  rounded-lg"
                     v-for="branch in the_package.branches"
                     :key="branch.name"
                  >
                     {{branch.name}}
               </h1>
               </div>
               <div class="bg-cyan-400 rounded">
                  <button
                     class="btn btn-primary text-2xl choose "
                     @click="viewPackage(the_package.id)"
                  >
                     {{ $t('Choose the package', 'اختيار الباقة') }}
                  </button>
               </div>
            </div>
         </div>
      </div>
   </main>
</template>

<script setup>
import { viewPackage } from "@/utils/view/viewPackage";
defineProps(["thePackage"]);
import { useGetPackages } from "@/composables/packages/useGetPackages";

onBeforeMount(() => getPackages());
const packages = ref();
const getPackages = () => {
   packages.value = useGetPackages();
};
</script>

