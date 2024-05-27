<template>
   <div>
      <h3 class="text-2xl text-center mb-8">
         {{ $t("New account", "حساب جديد") }}
      </h3>

      <form action="javascript:;" @submit.prevent="registerClicked">
         <div class="mb-2">
            <input
               style="border: 1px solid #b5bac3"
               type="text"
               class="w-full h-12 py-2 rounded"
               :placeholder="$t('First name', 'الاسم الاول')"
               v-model.trim="newUser.first_name"
               autofocus
            />
         </div>
         <div class="mb-2">
            <input
               style="border: 1px solid #b5bac3"
               type="text"
               class="w-full h-12 py-2 rounded"
               :placeholder="$t('Last name', 'الاسم الاخير')"
               v-model.trim="newUser.last_name"
            />
         </div>
         <div class="mb-2">
            <input
               style="border: 1px solid #b5bac3"
               type="text"
               class="w-full h-12 py-2 rounded"
               :placeholder="$t('Mobile phone', 'رقم الجوال')"
               v-model.trim="newUser.mobile_phone"
            />
         </div>
         <h1
            class="text-red-700 rounded text-center mb-2 flex gap-4 items-center"
            v-if="myErr"
         >
            {{ registerRequest }} <Icon name="bi:exclamation-circle-fill" />
         </h1>
         <div class="mb-2">
            <input
               style="border: 1px solid #b5bac3"
               type="password"
               class="w-full h-12 py-2 rounded"
               :placeholder="$t('Password', 'كلمة المرور')"
               v-model="newUser.password"
            />
         </div>
         <div class="mb-4">
            <Button
               class="!w-full block min-h-[3rem] h-auto"
               :isLoading="
                  registerRequest?.isLoading || loginRequest?.isLoading
               "
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
import { ref, computed, watch } from 'vue';
import { useRegister } from "~/composables/user/useRegister";
import { login, saveLoginData } from "~/composables/user/useUser";

definePageMeta({ layout: "auth" });

const newUser = ref({
   first_name: "",
   last_name: "",
   mobile_phone: "",
   password: "",
});

const myErr = ref();
const registerRequest = ref();

// Function to remove leading zero
function removeLeadingZero(input) {
   const str = input.toString();
   if (str.startsWith('0')) {
      return str.slice(1);
   }
   return str;
}

const registerClicked = async () => {
   // Remove leading zero from mobile phone number
   newUser.value.mobile_phone = removeLeadingZero(newUser.value.mobile_phone);

   try {
      const response = await useRegister(newUser.value);
      registerRequest.value = response;

      // إذا كانت `response` تحتوي على خطأ، يمكنك التعامل معه هنا
      if (response.value) {
         console.log("Error:", response.value);
         myErr.value = true;

         // عرض الخطأ في واجهة العميل حسب الحاجة
      } else {
         console.log("Success:", response);
         // التعامل مع النجاح حسب الحاجة
      }
   } catch (error) {
      console.error("Unexpected Error:", error);
      // التعامل مع الأخطاء غير المتوقعة
   }
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
