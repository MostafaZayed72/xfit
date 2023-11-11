<template>
   <div>
      <h3 class="text-2xl text-center mb-8">
         {{ $t("New account", "حساب جديد") }}
      </h3>

      <form action="javascript:;" @submit.prevent="registerClicked">
         <div class="mb-2">
            <input
               type="text"
               class="w-full h-12"
               :placeholder="$t('First name', 'الاسم الاول')"
               v-model.trim="newUser.first_name"
               autofocus
            />
         </div>
         <div class="mb-2">
            <input
               type="text"
               class="w-full h-12"
               :placeholder="$t('Last name', 'الاسم الاخير')"
               v-model.trim="newUser.last_name"
            />
         </div>
         <div class="mb-2">
            <input
               type="text"
               class="w-full h-12"
               :placeholder="$t('Mobile phone', 'رقم الجوال')"
               v-model.trim="newUser.mobile_phone"
            />
         </div>
         <div class="mb-2">
            <input
               type="password"
               class="w-full h-12"
               :placeholder="$t('Password', 'كلمة المرور')"
               v-model="newUser.password"
            />
         </div>
         <div class="mb-4">
            <Button
               class="!w-full block min-h-[3rem] h-auto"
               :isLoading="registerRequest?.isLoading || loginRequest?.isLoading"
            >
               {{ $t("Register", "تسجيل") }}
            </Button>
         </div>
         <div class="text-center">
            <nuxt-link to="/auth/login" class="text-sm">
               {{ $t("Back to login", "الرجوع إلى تسجيل الدخول") }}
            </nuxt-link>
         </div>
      </form>
   </div>
</template>

<script setup>
import { useRegister } from "~/composables/user/useRegister";
import { login, saveLoginData } from "~/composables/user/useUser";

definePageMeta({ layout: "auth" });

const newUser = ref({
   first_name: "",
   last_name: "",
   mobile_phone: "",
   password: "",
});

const registerRequest = ref();
const registerClicked = () => {
   registerRequest.value = useRegister(newUser.value);
};

const loginRequest = ref();
watch(
   computed(() => registerRequest.value?.isFinished),
   () => {
      if (registerRequest.value.isFinished && !registerRequest.value.error) {
         loginRequest.value = login({
            emailOrMobilePhone: newUser.value.mobile_phone,
            password: newUser.value.password,
         });
      }
   }
);

watch(
   computed(() => loginRequest.value?.isFinished),
   () => {
      if (loginRequest.value.isFinished && !loginRequest.value.error) {
         saveLoginData(loginRequest.value.data);
      }
   }
);
</script>
