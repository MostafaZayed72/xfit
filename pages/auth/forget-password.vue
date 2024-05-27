<template>
   <main class="container">
      <div class="row">
         <div class="col-xs-8 offset-xs-2 col-md-4 offset-md-4">
            <p class="text-center">{{ $t("Password reset") }}</p>
            <form action="javascript:;" id="auth" @submit.prevent="submit()">
               <div class="my-3 text-center">
                  <label class="form-label">
                     <!-- {{ $t('Please, enter your email or mobile phone') }} -->
                     {{ $t("Enter your email") }}
                  </label>
                  <input
                     style="border: 1px solid"
                     type="text"
                     class="form-control rounded"
                     v-model="value"
                     required
                     autofocus
                  />
               </div>
            </form>
            <div class="flex gap-2 justify-center">
               <button
                  @click="submit"
                  type="submit"
                  class="w-24 bg-cyan-500 choose"
                  form="auth"
               >
                  {{ $t("Confirm") }}
               </button>
               <nuxt-link class="btn btn-secondary" to="/auth/login">
                  {{ $t("Back") }}
               </nuxt-link>
            </div>
         </div>
      </div>
   </main>
</template>

<script setup>
definePageMeta({ layout: "auth" });
const value = ref("");
const router = useRouter();
import { notify } from "@/composables/common/useNotifications";
import { useCustomAxios } from "@/composables/common/useCustomAxios";

// onMounted(() => {
//    if (loggedIn.value) router.push("/");
// });

const submit = async () => {

   try {
      await useCustomAxios('members/reset-password?v=' + value.value, {
         method: "POST",
         v: value.value
      });
      router.push("/auth/login");
      notify("success", ["A new password has been sent to your email"]);
   } catch (error) {
      notify("danger", [error.response.data.message]);
   }
};
</script>

<style scoped>
.logo {
   width: 65%;
   display: block;
   margin: auto;
}
</style>
