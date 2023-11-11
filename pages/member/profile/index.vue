<template>
   <main>
      <p class="mb-12">
         <NuxtLink to="/">{{ $t("Home", "الرئيسية") }}</NuxtLink>
         <span class="mx-2">/</span>
         <span>{{ $t("Profile", "الملف الشخصي") }}</span>
      </p>

      <CommonXfitLoader v-if="profile?.isLoading && !profile?.data" />

      <section class="bg-[var(--c3)] rounded-xl mb-4 shadow-lg p-5" v-else>
         <div class="mb-5">
            <label class="text-sm mb-1">
               {{ $t("First name", "الاسم الاول") }}
            </label>
            <p>{{ profile?.data?.first_name }}</p>
         </div>

         <div class="mb-5">
            <label class="text-sm mb-1">{{
               $t("Last name", "الاسم الاخير")
            }}</label>
            <p>{{ profile?.data?.last_name }}</p>
         </div>

         <div class="mb-5">
            <label class="text-sm mb-1">
               {{ $t("Mobile phone", "رقم الجوال") }}
            </label>
            <p v-if="!inputs.mobile_phone">
               <span class="me-2">{{ profile?.data?.mobile_phone }} </span>
               <span>
                  <a href="javascript:;" @click="updateClicked('mobile_phone')">
                     <IconsEdit />
                  </a>
               </span>
            </p>
            <div v-else>
               <form
                  class="d-flex w-100"
                  action="javascript:;"
                  @submit.prevent="updateRecord('mobile_phone')"
               >
                  <div class="mb-2">
                     <input
                        type="text"
                        class="form-control form-control-sm"
                        :placeholder="$t('Mobile phone', 'رقم الجوال')"
                        aria-label="Example text with two button addons"
                        ref="mobile_phone"
                        v-model="newValues.mobile_phone"
                     />
                  </div>
                  <ButtonsPrimary class="me-1" type="submit">
                     {{ $t("Save", "حفظ") }}
                  </ButtonsPrimary>
                  <ButtonsSecondary
                     class="btn btn-secondary btn-sm"
                     @click="updateClicked('mobile_phone')"
                  >
                     {{ $t("Cancel", "إلغاء") }}
                  </ButtonsSecondary>
               </form>
            </div>
         </div>

         <div class="mb-5">
            <label class="text-sm mb-1">
               {{ $t("Email", "البريد الالكتروني") }}
            </label>
            <p v-if="!inputs.email">
               <span class="me-2">{{ profile?.data?.email }} </span>
               <span>
                  <a href="javascript:;" @click="updateClicked('email')">
                     <IconsEdit />
                  </a>
               </span>
            </p>
            <div v-else>
               <form
                  class="d-flex w-100"
                  action="javascript:;"
                  @submit.prevent="updateRecord('email')"
               >
                  <div class="mb-2">
                     <input
                        type="text"
                        id="email_input"
                        class="form-control form-control-sm"
                        :placeholder="$t('Email', 'البريد الالكتروني')"
                        ref="email"
                        v-model="newValues.email"
                     />
                  </div>
                  <ButtonsPrimary class="me-1" type="submit">
                     {{ $t("Save", "حفظ") }}
                  </ButtonsPrimary>
                  <ButtonsSecondary
                     class="btn btn-secondary btn-sm"
                     @click="updateClicked('email')"
                  >
                     {{ $t("Cancel", "إلغاء") }}
                  </ButtonsSecondary>
               </form>
            </div>
         </div>

         <div class="mb-5">
            <label class="text-sm mb-1">
               {{ $t("National ID", "رقم الهوية") }}
            </label>
            <div v-if="!inputs.national_id">
               <span class="me-2">{{ profile?.data?.national_id }} </span>
               <span>
                  <a href="javascript:;" @click="updateClicked('national_id')">
                     <IconsEdit />
                  </a>
               </span>
            </div>
            <div v-else>
               <form
                  class="d-flex w-100"
                  action="javascript:;"
                  @submit.prevent="updateRecord('national_id')"
               >
                  <div class="mb-2">
                     <input
                        type="number"
                        class="form-control form-control-sm"
                        min="1000000000"
                        :placeholder="$t('National ID', 'رقم الهوية')"
                        aria-label="Example text with two button addons"
                        ref="national_id"
                        v-model="newValues.national_id"
                     />
                  </div>
                  <ButtonsPrimary class="me-1" type="submit">
                     {{ $t("Save", "حفظ") }}
                  </ButtonsPrimary>
                  <ButtonsSecondary
                     class="btn btn-secondary btn-sm"
                     @click="updateClicked('national_id')"
                  >
                     {{ $t("Cancel", "إلغاء") }}
                  </ButtonsSecondary>
               </form>
            </div>
         </div>

         <div class="mb-5">
            <label class="text-sm mb-1">
               {{ $t("Password", "كلمة المرور") }}
            </label>
            <div v-if="!inputs.password">
               <span class="me-2">******</span>
               <span>
                  <a href="javascript:;" @click="updateClicked('password')">
                     <IconsEdit />
                  </a>
               </span>
            </div>
            <div v-else>
               <form action="javascript:;" @submit="updatePassword()">
                  <div class="mb-2">
                     <label for="oldPassword" class="col-form-label">
                        {{ $t("Current password", 'كلمة المرور الحالية') }}
                     </label>
                     <input
                        type="password"
                        id="oldPassword"
                        class="form-control form-control-sm"
                        v-model="passwords.current"
                        required
                     />
                  </div>
                  <div class="mb-2">
                     <label for="newPassword" class="col-form-label">
                        {{ $t("New password", 'كلمة المرور الجديدة') }}
                     </label>
                     <input
                        type="password"
                        id="newPassword"
                        class="form-control form-control-sm"
                        v-model="passwords.new"
                        required
                     />
                  </div>
                  <div class="mb-2">
                     <label for="repeatedPassword" class="col-form-label">
                        {{ $t("Repeat password", 'إعادة كلمة المرور') }}
                     </label>
                     <input
                        type="password"
                        id="repeatedPassword"
                        class="form-control form-control-sm"
                        v-model="passwords.repeated"
                        required
                     />
                  </div>
                  <div>
                     <ButtonsPrimary
                        class="me-1"
                        :isLoading="updatePasswordRequest?.isLoading"
                     >
                        {{ $t("Save", "حفظ") }}
                     </ButtonsPrimary>
                     <ButtonsSecondary
                        class="btn btn-secondary btn-sm"
                        @click="updateClicked('password')"
                     >
                        {{ $t("Cancel", "إلغاء") }}
                     </ButtonsSecondary>
                  </div>
               </form>
            </div>
         </div>

         <div>
            <label class="text-sm mb-1">
               {{ $t("Account creation date", "تاريخ انشاء الحساب") }}
            </label>
            <p>
               <span dir="ltr">{{ profile?.data?.created_at }}</span>
            </p>
         </div>
      </section>
   </main>
</template>

<script setup>
import { useGetProfile } from "@/composables/member/useGetProfile";
import { useUpdateProfileField } from "@/composables/member/useUpdateProfileField";
import { useUpdatePassword } from "@/composables/member/useUpdatePassword";
import { validateEmail } from "@/utils/validateEmail";
import { notify } from "@/composables/common/useNotifications";

const { $t } = useNuxtApp();
const profile = ref();
const newValues = ref();
const inputs = ref({
   mobile_phone: null,
   email: null,
   national_id: null,
   password: null,
});
const passwords = ref({
   current: null,
   new: null,
   repeated: null,
});

onBeforeMount(() => getMemberProfile());

const getMemberProfile = () => {
   profile.value = useGetProfile(profile.value?.data);
};

watch(
   () => profile.value?.isFinished,
   () => {
      if (profile.value?.isFinished && !profile.value?.error)
         newValues.value = { ...profile.value.data };
   }
);

const updateClicked = (field) => {
   inputs.value[field] = !inputs.value[field];
};

const updateFieldRequest = ref();
const updateRecord = (field) => {
   console.log(newValues.value[field]);
   if (newValues.value[field] == profile.value.data[field]) return;
   if (field == "email" && !validateEmail(newValues.value[field])) {
      let email_input = document.querySelector("#email_input");
      email_input.classList.add("is-invalid");
      return notify("danger", [$t("Please, enter a valid email", 'يرجي ادخال بريد الكتروني صالح')]);
   }

   updateFieldRequest.value = useUpdateProfileField({
      [field]: newValues.value[field],
   });
};

watch(
   () => updateFieldRequest.value?.isFinished,
   () => {
      if (
         updateFieldRequest.value.isFinished &&
         !updateFieldRequest.value.error
      ) {
         let updatedField = JSON.parse(
            updateFieldRequest.value.response.config.data
         );
         updateClicked(Object.keys(updatedField)[0]);
         notify("success", [$t("Saved", 'تم الحفظ')]);
         getMemberProfile();
      }
   }
);

const updatePasswordRequest = ref();
const updatePassword = () => {
   updatePasswordRequest.value = useUpdatePassword(passwords.value);
};

watch(
   () => updatePasswordRequest.value?.isFinished,
   () => {
      if (
         updatePasswordRequest.value?.isFinished &&
         !updatePasswordRequest.value?.error
      ) {
         updateClicked("password");
         notify("success", [$t("Saved", "تم الحفظ")]);
         getMemberProfile();
         passwords.value.current = null;
         passwords.value.new = null;
         passwords.value.repeated = null;
      } else if (
         updatePasswordRequest.value?.isFinished &&
         updatePasswordRequest.value?.error
      ) {
         notify("danger", [
            $t(
               "Current password is incorrect",
               "كلمة المرور الحالية غير صحيحة"
            ),
         ]);
      }
   }
);
</script>
