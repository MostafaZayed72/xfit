<template>
   <main>
      <h3 class="text-5xl text-center text-grey-darken-1 mb-16">
         {{ $t('Membership packages') }}
      </h3>
      <hr class="my-5" />
      <div class="row flex gap-5 flex-wrap justify-center">
         <div
            class="col-sm-6 col-md-4 mb-4 bg-grey-lighten-3 rounded text-grey-darken-1 sm:w-100 lg:w-1/3"
            v-for="the_package in packages"
            :key="the_package.id"
         >
            <div
               class="h-100 shadow-sm bg-light rounded-3 d-block p-4 text-center"
            >
               <h4 class="mb-3 h-32 package-name text-2xl my-auto items-center">{{ the_package.name }}</h4>
               <h3 class="font-bold  flex gap-1 justify-center">
                  <span class="text-2xl"> {{ the_package.price.toLocaleString() }} </span>
                  <span class="text-2xl"> {{ $t('SAR') }} </span>
               </h3>
               <h1 class="w-100 my-6" style="border-bottom: 1px solid grey;"></h1>
               <p class="text-2xl">{{ $t('Branches') }}</p>
               <div class="text-end mb-3">
                  <span
                     class="badge bg-secondary mx-1"
                     v-for="branch in the_package.branches"
                     :key="branch.name"
                  >
                     {{ branch.name }}
                  </span>
               </div>
               <div class="bg-cyan-400 rounded">
                  <button
                     class="btn btn-primary text-2xl text-black "
                     @click="viewPackage(the_package.id)"
                  >
                     {{ $t('Choose the package') }}
                  </button>
               </div>
            </div>
         </div>
      </div>
   </main>
</template>

<script setup>
const packages= [
   {
      id:1,
      name:'باقة شهر + جلسة تدريب شخصي مجانية',
      price:'790',
   },
   {
      id:2,
      name:'باقة 3 اشهر + 15 يوم و جلستين تدريب شخصي مجانية',
      price:'1,790',
   },
   {
      id:3,
      name:'باقة 6 اشهر + 30 يوم و 4 جلسات تدريب شخصي مجانية',
      price:'2,790',
   },
   {
      id:4,
      name:'باقة سنة + 60 يوم و 6 جلسات تدريب شخصي مجانية',
      price:'4,590',
   }
]
// import { ref, onMounted } from 'vue';
// import { useStore } from 'vuex';
// import { useRouter } from 'vue-router';

// const store = useStore();
// const router = useRouter();

// const packages = ref([]);

// onMounted(() => {
//   getPackages();
// });

// async function getPackages() {
//   const response = await store.dispatch('getPackages');
//   packages.value = response.data;
// }

// function viewPackage(id) {
//   store.dispatch('updateContainer', {
//     state_name: 'package_id',
//     state_value: id,
//   });
//   router.push('/packages/view');
// }
</script>


<style scoped>
.package-name {
   min-height: 5rem;
}
</style>
