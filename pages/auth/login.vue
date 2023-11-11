<template>
   <div >
      <h3 class="text-2xl text-center mb-4">
         {{ $t("Log in", 'تسجيل الدخول') }}
      </h3>

      <form @submit.prevent="loginClicked">
         <div class="form-group mb-2">
            <input
               type="text"
               class="w-full h-12 bg-[var(--c3)]"
               :placeholder="$t('Email or mobile phone', 'البريد الالكتروني او الجوال')"
               v-model="user.emailOrMobilePhone"
               autofocus
            />
         </div>
         <div class="form-group mb-2">
            <input
               type="password"
               class="w-full h-12 bg-[var(--c3)]"
               :placeholder="$t('Password', 'كلمة المرور')"
               v-model="user.password"
            />
         </div>
         <div class="mb-4">
            <ButtonsPrimary
               class="w-full min-h-[3rem] h-auto"
               :isLoading="loginRequest?.isLoading"
               >
               {{ $t("Log in", 'تسجيل الدخول') }}
            </ButtonsPrimary>
         </div>
         <div class="text-center">
            <nuxt-link to="/auth/register" class="text-sm">
               {{ $t("New account", 'حساب جديد') }}
            </nuxt-link>
         </div>
      </form>
   </div>
</template>

<script setup>
import { login, saveLoginData } from "@/composables/user/useUser";

definePageMeta({ layout: "auth" });

const user = ref({
   emailOrMobilePhone: "",
   password: "",
});

const loginRequest = ref();
const loginClicked = () => {
   loginRequest.value = login(user.value);
};

watch(
   computed(() => loginRequest.value?.isFinished),
   () => {
      if (loginRequest.value.isFinished && !loginRequest.value.error) {
         saveLoginData(loginRequest.value.data);
      }
   }
);
</script>
