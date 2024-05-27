<template>
   <div>
      <h3 class="text-2xl text-center mb-4">
         {{ $t("Log in", 'تسجيل الدخول') }}
      </h3>

      <form @submit.prevent="loginClicked">
         <div class="form-group mb-2">
            <input
               style="border: 1px solid #b5bac3"
               type="text"
               class="w-full h-12"
               :placeholder="$t('Email or mobile phone', 'البريد الالكتروني او الجوال')"
               v-model="user.emailOrMobilePhone"
               autofocus
            />
         </div>
         <div class="form-group mb-2">
            <input
               style="border: 1px solid #b5bac3"
               type="password"
               class="w-full h-12"
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
         <div class="text-center">
            <nuxt-link to="/auth/forget-password" class="text-sm">
               {{ $t("Forgot Password", 'نسيت كلمة المرور ؟ ') }}
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

const removeLeadingZero = (input) => {
   const str = input.toString();
   if (str.startsWith('0')) {
      return str.slice(1);
   }
   return str;
};

const loginClicked = () => {
   user.value.emailOrMobilePhone = removeLeadingZero(user.value.emailOrMobilePhone);

   // طباعة قيمة الحقل للتحقق من وجود الأصفار في البداية
   console.log('Email or Mobile Phone:', user.value.emailOrMobilePhone);
   
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
