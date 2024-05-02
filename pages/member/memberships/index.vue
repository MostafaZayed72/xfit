<template>
   <main>
      <h3 class="text-5xl text-center mship md:mb-16">
         {{ $t("My memberships", "اشتراكاتي") }} </h3>
      <hr class="my-5" />
      <!-- <CommonXfitLoader v-if="memberships?.isLoading" /> -->

      <a href="javascript:;" class="block main-card rounded-xl p-4 mb-5 hover:shadow-lg"
         v-for="membership in memberships?.data" :key="membership.id" @click="viewMembership(membership.id)">
         <div class="text-center">
            <div class="col-12 col-sm-3 my-2">
               <span>{{ membership.name }}</span>
               <span v-if="
                  !membership.membershipTapPayments &&
                  !membership.membershipTamaraPayments
               ">
                  <span class="text-[var(--c1)] bg-[var(--c6)] py-1 px-2 rounded-lg" v-if="!membership.package_status">
                     {{
                        $t(
                           "The package isn't available now.",
                           "الباقة غير متاحة الآن"
                        )
                     }}
                  </span>
               </span>
            </div>
            <div class="col-6 col-sm-3 my-2">
               <span class="me-2">{{ membership.price.toLocaleString() }}</span>
               <span>{{ $t("SAR", "ريال") }}</span>
            </div>
            <div class="col-6 col-sm-3 my-2">
               <span dir="ltr">{{ membership.created_at }}</span>
            </div>
            <div class="col-12 col-sm-3 my-2" v-if="
               !membership.membershipTapPayments &&
               !membership.membershipTamaraPayments
            ">
               <span class="text-[var(--c1)] bg-[var(--c9)] py-1 px-2 rounded-lg">
                  {{ $t("Not paid", "غير مدفوع") }}
               </span>
            </div>
         </div>
      </a>
   </main>
</template>

<script setup>
import { useGetMemberships } from "@/composables/memberships/useGetMemberships";
import { viewMembership } from "@/utils/view/viewMembership";

const memberships = ref();
onBeforeMount(() => getMemberships());

const getMemberships = () => {
   memberships.value = useGetMemberships();
};
</script>

<style></style>
