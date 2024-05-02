<template>
   <main >
      <h3 class="display-6 text-center">
         {{ $t("Membership information") }}
      </h3>

      <hr class="my-5" />

      <membership :membership="membership" />

      <section class="text-start mt-3">
         <nuxt-link class="btn btn-secondary" to="/memberships/view">
            {{ $t("Back") }}
         </nuxt-link>
      </section>

      <section>
         <hr class="my-4" />
         <h4>{{ $t("Payment") }}</h4>
         <form id="form-container" @submit.prevent="generateToken()">
            <div id="element-container"></div>
            <hr class="m-4 m-md-4" />
            <div class="d-flex justify-content-between">
               <div>
                  <p class="text-sm">
                     <small>
                        {{
                           $t(
                              "Clicking the Pay button means agreeing to all the terms and conditions, "
                           )
                        }}
                        <a
                           href="#"
                           data-bs-toggle="modal"
                           data-bs-target="#exampleModal"
                        >
                           {{ $t("and it can be viewed from here.") }}
                        </a>
                     </small>
                  </p>
               </div>
               <div class="mt-2">
                  <span class="text-danger px-3">
                     {{ $t("Package price") }}:
                     {{ membership.price.toLocaleString() }}
                     {{ $t("SAR") }}
                  </span>
                  <button
                     type="submit"
                     class="btn btn-primary"
                     :disabled="submit_disabled"
                  >
                     <span v-if="!submit_disabled">
                        {{ $t("Pay") }}
                     </span>
                     <div
                        v-else
                        class="spinner-border spinner-border-sm mx-2"
                        role="status"
                     >
                        <span class="visually-hidden">Loading...</span>
                     </div>
                  </button>
               </div>
            </div>
         </form>
      </section>

      <!-- Terms and conditions modal -->
      <div
         class="modal fade"
         id="exampleModal"
         tabindex="-1"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
      >
         <div class="modal-dialog modal-lg">
            <div class="modal-content">
               <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                     {{ $t("Terms and conditions") }}
                  </h5>
                  <button
                     type="button"
                     class="btn-close"
                     data-bs-dismiss="modal"
                     aria-label="Close"
                  ></button>
               </div>
               <div class="modal-body">
                  <p v-for="(term, index) in membershipTerms" :key="term">
                     <small>{{ index + 1 + ". " + $t(term) }}</small>
                  </p>
               </div>
               <div class="modal-footer">
                  <button
                     type="button"
                     class="btn btn-secondary"
                     data-bs-dismiss="modal"
                  >
                     {{ $t("Close") }}
                  </button>
               </div>
            </div>
         </div>
      </div>
   </main>
</template>

<!-- <script setup>
import { membershipTerms } from "@/utils/membershipTerms";
import * as tap from "@/utils/tap";
import { useGetMembership } from "@/composables/memberships/useGetMembership";
// import { lang } from "@/composables/user/useUser";

const dir = computed(() => {
   return lang == "ar" ? "rtl" : "ltr";
});

const membership = ref();
const tap_init = ref();
const generated_token = ref();
const submit_disabled = ref();

console.log(tap_init);
const getMembership = () => {
   membership.value = useGetMembership();
};

// onBeforeMount(() => {
//    getMembership();
//    tap_init.value = tap.init();
// });

const generateToken = async () => {
   if (submit_disabled) return;
   generated_token.value = await tap.createToken(
      this.tap_init.tap,
      this.tap_init.card
   );
   submit_disabled.value = true;
};

const chargeRequest = ref();
const charge = () => {
   this.$store
      .dispatch("membershipTapCharge", {
         membership_id: this.membership_id,
         token_id: this.generated_token.id,
      })
      .then((response) => {})
      .catch(() => {
         this.submit_disabled = false;
      });
};

watch(
   () => chargeRequest.value?.isFinished,
   () => {
      if (chargeRequest.value?.isFinished && !chargeRequest.value?.error) {
         submit_disabled.value = false;

         if (chargeRequest.value.data.url)
            return window.location.replace(chargeRequest.value.data.url);
         if (chargeRequest.value.data.payment_status == "CAPTURED")
            navigateTo({
               path: "/buy/tap/view",
               query: { charge_id: chargeRequest.value.data.charge_id },
            });
      }
   }
);
watch(
   () => generated_token.value,
   () => {
      setTimeout(() => {
         console.log(this.generated_token);
         if (this.generated_token.id) this.charge();
         else {
            this.$notify("danger", [this.generated_token.error]);
            this.submit_disabled = false;
         }
      }, 1000);
   }
);
</script> -->

<!-- <style scoped>
iframe {
   min-height: 170px;
}
</style> -->
