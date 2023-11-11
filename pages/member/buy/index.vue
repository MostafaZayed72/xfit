<template>
   <main>
      <p class="mb-12">
         <NuxtLink to="/">{{ $t("Home", "الرئيسية") }}</NuxtLink>
         <span class="mx-2">/</span>
         <NuxtLink to="/packages">
            {{ $t("Membership packages", "باقات الاشتراك") }}
         </NuxtLink>
         <span class="mx-2">/</span>
         <span>{{ $t("Buy a package", "شراء باقة") }}</span>
      </p>

      <CommonXfitLoader
         v-if="
            (thePackage?.isLoading || memberInformationIsRequired?.isLoading) &&
            (!thePackage?.isFinished ||
               !memberInformationIsRequired?.isFinished)
         "
      />

      <div
         class="bg-[var(--c9)] mb-5 p-5 shadow-lg rounded-xl"
         v-if="
            memberInformationIsRequired?.isFinished &&
            memberInformationIsRequired?.data
         "
      >
         <p class="mb-3 text-[var(--c1)]">
            {{
               $t(
                  "Please, complete your personal information.",
                  "يرجي استكمال بياناتك الشخصية."
               )
            }}
         </p>
         <p class="mb-5 text-[var(--c1)]">
            {{
               $t(
                  "Go to your profile, and make sure you entered your phone number, email and national ID.",
                  "يرجى الذهاب إلى ملفك الشخصي والتأكد من ادخال رقم الهوية ورقم الجوال والبريد الالكتروني."
               )
            }}
         </p>
         <p class="text-end">
            <ButtonsSecondary
               class="w-56 bg-[var(--c7)]"
               @click="navigateTo('/member/profile')"
            >
               {{ $t("Go to your profile", "الذهاب إلى ملفك الشخصي") }}
            </ButtonsSecondary>
         </p>
      </div>

      <div
         v-if="thePackage?.data"
         class="bg-[var(--c3)] rounded-xl shadow-lg p-5"
      >
         <p class="mb-5">{{ thePackage.data.name }}</p>
         <h3 class="mb-4">
            <span class="font-bold text-4xl me-2">
               {{ thePackage.data?.price.toLocaleString() }}
            </span>
            <span>{{ $t("SAR", "ريال") }}</span>
         </h3>
         <div class="text-end">
            <a
               href="javascript:;"
               class="w-36 underline text-sm"
               @click="navigateTo('/packages')"
            >
               {{ $t("Choose another package", "اختاري باقة اخري") }}
            </a>
         </div>

         <hr class="my-5" />

         <div v-if="!selectedBranch">
            <p class="text-start mb-3">
               {{ $t("Choose a branch", "اختاري الفرع") }}
            </p>
            <div class="flex flex-wrap gap-3 mb-8">
               <a
                  href="javascript:;"
                  class="text-[var(--c2)] bg-[var(--c1)] py-1 px-2 rounded-xl"
                  v-for="branch in thePackage.data.branches"
                  :key="branch.name"
                  @click="selectBranch(branch)"
               >
                  {{ branch.name }}
               </a>
            </div>
         </div>

         <div v-else class="mb-3">
            <span class="inline-block me-2">{{ $t("Branch", "الفرع") }}</span>
            <span
               class="inline-block text-[var(--c2)] bg-[var(--c1)] py-1 px-2 me-2 rounded-xl"
            >
               {{ selectedBranch.name }}
            </span>
            <a
               href="javascript:;"
               class="inline-block underline text-sm"
               @click="selectedBranch = null"
            >
               {{ $t("Change", "تغيير") }}
            </a>
         </div>

         <hr class="my-5" />

         <div class="mb-5">
            <label class="block mb-2">
               {{ $t("Membership start date", "تاريخ بداية الاشتراك") }}
            </label>
            <input
               type="date"
               class="w-full bg-[var(--c1)]"
               :min="thePackage.data.min_membership_start_date"
               :max="thePackage.data.max_membership_start_date"
               v-model="newMembership.membership_start_date"
            />
         </div>

         <div class="text-end">
            <ButtonsPrimary
               class="w-20"
               :isLoading="createMembershipRequest?.isLoading"
               :disabled="memberInformationIsRequired?.data"
               @click="createMembership()"
            >
               {{ $t("Confirm", "تأكيد") }}
            </ButtonsPrimary>
         </div>
      </div>
   </main>
</template>

<script setup>
import { useGetPackage } from "@/composables/packages/useGetPackage";
import { useCheckMemberRequiredInformation } from "@/composables/member/useCheckMemberRequiredInformation";
import { useCreateMembership } from "@/composables/memberships/useCreateMembership";
import { viewMembership } from "@/utils/view/viewMembership";

const memberInformationIsRequired = ref({ data: true });
const thePackage = ref();
const selectedBranch = ref();
const newMembership = ref({
   package_id: null,
   branch_id: null,
   membership_start_date: null,
});

onBeforeMount(() => {
   getPackage();
   checkMemberRequiredInformation();
});

const getPackage = () => {
   thePackage.value = useGetPackage();
};

const checkMemberRequiredInformation = () => {
   memberInformationIsRequired.value = useCheckMemberRequiredInformation();
};

const selectBranch = (branch) => {
   selectedBranch.value = branch;
};

const createMembershipRequest = ref();
const createMembership = () => {
   newMembership.value.package_id = thePackage.value?.data.id;
   newMembership.value.branch_id = selectedBranch.value?.branch_id;

   createMembershipRequest.value = useCreateMembership(
      memberInformationIsRequired.value?.data,
      thePackage.value?.data.min_membership_start_date,
      thePackage.value?.data.max_membership_start_date,
      newMembership.value
   );
};

watch(
   () => createMembershipRequest.value?.isFinished,
   () => {
      if (
         createMembershipRequest.value.isFinished &&
         !createMembershipRequest.value.error
      ) {
         viewMembership(createMembershipRequest.value.data.id);
      }
   }
);
</script>
