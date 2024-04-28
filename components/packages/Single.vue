<template>
   <div v-for="thePackage in packages" :key="thePackage.id" class="bg-[var(--c3)] rounded-xl mb-4 shadow-lg text-center p-5">
      <p class="mb-5">{{ thePackage.name }}</p>
      <h3>
         <!-- <span class="font-bold text-4xl me-2">
            {{ thePackage.price.toLocaleString() }}
         </span> -->
         <span> {{ $t("SAR", "ريال") }} </span>
      </h3>
      <hr class="my-4" />
      <p class="text-start mb-3">
         {{ $t("Branches", "الفروع") }}
      </p>
      <!-- <div class="flex flex-wrap gap-3 mb-8">
         <span
            class="text-[var(--c2)] bg-[var(--c1)] py-1 px-2 rounded-xl"
            v-for="branch in thePackage.branches"
            :key="branch.name"
         >
            {{ branch.name }}
         </span>
      </div> -->
      <div class="text-end">
         <ButtonsSecondary @click="viewPackage(thePackage.id)">
            {{ $t("Buy", "شراء") }}
         </ButtonsSecondary>
      </div>
   </div>
</template>

<script setup>
// import { viewPackage } from "@/utils/view/viewPackage";
const packages=[{
   id:1,
   name:'test 1'
}]
defineProps(["thePackage"]);
</script>
